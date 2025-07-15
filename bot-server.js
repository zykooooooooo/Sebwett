const express = require('express');
const { Client, GatewayIntentBits, Partials, Events } = require('discord.js');

const app = express();
app.use(express.json());

const runningBots = {};

app.get('/ping', (req, res) => {
  res.json({ success: true, message: 'Bot server is running.' });
});

app.post('/start-bot', async (req, res) => {
  console.log('[BOT SERVER] /start-bot endpoint called with body:', req.body);
  const { token, clientId, botName, avatarUrl } = req.body;
  if (!token || !clientId) return res.status(400).json({ success: false, error: 'Missing token or clientId' });
  if (runningBots[token]) return res.json({ success: true, message: 'Bot already running.' });
  try {
    console.log('[BOT SERVER] About to create Discord client');
    const client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
      partials: [Partials.Channel],
    });
    console.log('[BOT SERVER] Discord client created');
    console.log('[BOT SERVER] Attempting to login with token:', token.slice(0, 10) + '...');
    await client.login(token);
    console.log('[BOT SERVER] Login promise resolved');
    client.on('ready', () => {
      console.log(`[BOT SERVER] Bot is ready! Logged in as ${client.user.tag}`);
    });
    client.on('error', (err) => {
      console.error('[BOT SERVER] Discord client error:', err);
    });
    client.on('shardError', (err) => {
      console.error('[BOT SERVER] Discord shard error:', err);
    });
    client.on(Events.GuildCreate, (guild) => {
      console.log('[BOT SERVER] Bot joined guild:', guild.id, guild.name);
      if (runningBots[token]) {
        runningBots[token].guildId = guild.id;
        runningBots[token].guildName = guild.name;
        console.log('Set guild info on guildCreate:', guild.id, guild.name);
      }
    });
    const createdAt = new Date();
    client.once(Events.ClientReady, () => {
      console.log(`User bot ${clientId} logged in as ${client.user?.tag}`);
      if (runningBots[token]) runningBots[token].online = true;
      // Check if the bot is already in any guilds
      const guilds = client.guilds.cache;
      if (guilds.size > 0) {
        const guild = guilds.first();
        if (runningBots[token]) {
          runningBots[token].guildId = guild.id;
          runningBots[token].guildName = guild.name;
          console.log('Set guild info on ready:', guild.id, guild.name);
        }
      }
    });
    client.on(Events.GuildCreate, (guild) => {
      if (runningBots[token]) {
        runningBots[token].guildId = guild.id;
        runningBots[token].guildName = guild.name;
        console.log('Set guild info on guildCreate:', guild.id, guild.name);
      }
    });
    client.on(Events.MessageCreate, async (message) => {
      if (message.author.bot) return;
      if (message.content === '/ping') {
        await message.reply('Pong!');
      }
    });
    client.on(Events.ShardDisconnect, () => {
      if (runningBots[token]) runningBots[token].online = false;
    });
    runningBots[token] = {
      client,
      token,
      clientId,
      online: true,
      createdAt,
    };
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message || 'Failed to login bot.' });
  }
});

app.post('/stop-bot', (req, res) => {
  const { token } = req.body;
  const bot = runningBots[token];
  if (bot) {
    bot.client.destroy();
    delete runningBots[token];
    return res.json({ success: true });
  }
  res.status(404).json({ success: false, error: 'Bot not found.' });
});

app.get('/bot-info', (req, res) => {
  const { token } = req.query;
  const bot = runningBots[token];
  if (!bot) return res.status(404).json({ success: false, error: 'Bot not running.' });
  res.json({
    success: true,
    bot: {
      botName: bot.client.user?.username,
      online: bot.online,
      createdAt: bot.createdAt,
      guildId: bot.guildId,
      guildName: bot.guildName,
      clientId: bot.clientId,
    },
  });
});

const PORT = process.env.BOT_SERVER_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Discord Bot Server running on port ${PORT}`);
}); 