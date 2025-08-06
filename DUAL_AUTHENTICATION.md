# 🔐 Dual Authentication Support

## Overview

YACOR now supports **two authentication methods** for connecting to GigaChat models:

1. **🔑 API Key Authentication** - For public GigaChat API
2. **🔐 Certificate Authentication** - For company-hosted models

## Authentication Methods

### 🔑 API Key Authentication (Public GigaChat)

**Use this for:** Public GigaChat API access
**Requirements:** GigaChat API key from Sber Developer Portal

**Configuration:**
```json
{
  "yacor.gigachat.authMethod": "apiKey",
  "yacor.gigachat.apiKey": "your-base64-client-secret-key",
  "yacor.gigachat.baseUrl": "" // Optional custom URL
}
```

**Features:**
- ✅ Automatic token refresh
- ✅ Works with public GigaChat API
- ✅ No certificate files needed
- ✅ Easy setup via Setup Wizard

### 🔐 Certificate Authentication (Company Server)

**Use this for:** Company-hosted GigaChat models
**Requirements:** Client certificate and private key files

**Configuration:**
```json
{
  "yacor.gigachat.authMethod": "certificate",
  "yacor.gigachat.certificatePath": "/path/to/certificate.crt",
  "yacor.gigachat.privateKeyPath": "/path/to/private.key",
  "yacor.gigachat.certificatePassphrase": "optional-passphrase",
  "yacor.gigachat.baseUrl": "https://your-company-server.com/api/v1"
}
```

**Features:**
- ✅ Secure client certificate authentication
- ✅ Works with company-hosted models
- ✅ Custom server URL support
- ✅ Optional private key passphrase
- ✅ No API key required

## Setup Options

### Method 1: Setup Wizard
1. Run `YACOR: Setup Wizard` from Command Palette
2. Choose authentication method:
   - **API Key (Public GigaChat)** - For public API access
   - **Certificate (Company Server)** - For company-hosted models
3. Follow the guided setup process

### Method 2: Manual Configuration
1. Open VS Code Settings (`Ctrl+,`)
2. Search for "YACOR"
3. Configure your preferred authentication method

### Method 3: Command Palette
- **API Key Setup:** `YACOR: Setup GigaChat API Key`
- **Certificate Setup:** `YACOR: Configure Certificate Authentication`

## Configuration Settings

### API Key Settings
- `yacor.gigachat.authMethod`: `"apiKey"`
- `yacor.gigachat.apiKey`: Your Base64 encoded Client Secret Key
- `yacor.gigachat.baseUrl`: Optional custom API URL

### Certificate Settings
- `yacor.gigachat.authMethod`: `"certificate"`
- `yacor.gigachat.certificatePath`: Path to certificate file (.crt, .pem, .cert)
- `yacor.gigachat.privateKeyPath`: Path to private key file (.key, .pem)
- `yacor.gigachat.certificatePassphrase`: Optional passphrase for private key
- `yacor.gigachat.baseUrl`: Company server URL (required)

### Common Settings
- `yacor.gigachat.ignoreSSLErrors`: Ignore SSL certificate errors (default: true)
- `yacor.gigachat.model`: Selected GigaChat model

## Switching Between Methods

### From API Key to Certificate
1. Run `YACOR: Configure Certificate Authentication`
2. Select certificate and private key files
3. Enter company server URL
4. YACOR will automatically switch authentication methods

### From Certificate to API Key
1. Run `YACOR: Setup GigaChat API Key`
2. Enter your API key
3. YACOR will automatically switch authentication methods

## Error Handling

### API Key Errors
- **Invalid API Key:** Check Base64 encoding
- **Network Issues:** Verify internet connection
- **SSL Errors:** Automatically handled by YACOR

### Certificate Errors
- **File Not Found:** Verify certificate and key file paths
- **Invalid Format:** Check file extensions (.crt, .pem, .key)
- **Permission Issues:** Ensure files are readable
- **Passphrase Error:** Verify private key passphrase

## Testing Connection

Use `YACOR: Test GigaChat Connection` to verify your authentication setup:

**For API Key:**
```
✅ GigaChat connection successful!
🔐 Authentication: API Key
🤖 Model: GigaChat:latest
🌐 Base URL: Default
```

**For Certificate:**
```
✅ GigaChat connection successful!
🔐 Authentication: Certificate
🤖 Model: GigaChat:latest
🌐 Base URL: https://your-company-server.com/api/v1
```

## Security Notes

### API Key Security
- Store API keys securely
- Use environment variables when possible
- Rotate keys regularly

### Certificate Security
- Keep private keys secure
- Use strong passphrases
- Store certificates in secure locations
- Follow company security policies

## Troubleshooting

### Common Issues

**"Authentication failed"**
- Verify API key is correct and Base64 encoded
- Check certificate files exist and are readable
- Ensure company server URL is correct

**"SSL Certificate Error"**
- Enable `yacor.gigachat.ignoreSSLErrors` in settings
- Check company server certificate validity

**"Connection timeout"**
- Verify network connectivity
- Check company server availability
- Ensure firewall allows connections

### Getting Help

1. **Check Settings:** Verify all configuration values
2. **Test Connection:** Use `YACOR: Test GigaChat Connection`
3. **Setup Wizard:** Run `YACOR: Setup Wizard` for guided setup
4. **Switch Methods:** Try alternative authentication method

## Migration Guide

### From Old Yoda Extension
1. Install new YACOR extension
2. Run `YACOR: Setup Wizard`
3. Choose your authentication method
4. Configure settings
5. Test connection

### From Other Extensions
1. Export your API key or certificate files
2. Install YACOR extension
3. Use Setup Wizard to configure authentication
4. Import your existing credentials

---

**🎉 YACOR now supports both public GigaChat API and company-hosted models with secure authentication!** 