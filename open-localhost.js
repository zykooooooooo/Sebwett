setTimeout(async () => {
  const open = (await import('open')).default;
  open('http://localhost:3000');
}, 2000);