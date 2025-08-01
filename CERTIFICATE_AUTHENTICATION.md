# Certificate Authentication Guide

Yoda Code Mentor now supports **certificate-based authentication** as an alternative to API key authentication, making it perfect for enterprise environments with custom GigaChat deployments.

## 🔐 Authentication Methods

### 1. API Key Authentication (Default)
- **Use case**: Standard GigaChat usage with public APIs
- **Setup**: Provide your GigaChat Client Secret Key in Base64 format
- **Configuration**: `yoda.gigachat.authMethod = "apiKey"`

### 2. Certificate Authentication (New!)
- **Use case**: Enterprise environments with custom SSL certificates
- **Setup**: Provide client certificate and private key files
- **Configuration**: `yoda.gigachat.authMethod = "certificate"`

## 🌐 Custom Base URL Support

You can now specify a custom GigaChat API base URL:

```json
{
  "yoda.gigachat.baseUrl": "https://gigachat.devices.sberbank.ru/api/v1"
}
```

Leave empty for default GigaChat endpoints.

## 📋 Configuration Properties

### New Settings in v1.1.0

| Setting | Type | Description |
|---------|------|-------------|
| `yoda.gigachat.baseUrl` | string | Custom GigaChat API base URL |
| `yoda.gigachat.authMethod` | enum | Authentication method: `"apiKey"` or `"certificate"` |
| `yoda.gigachat.certificatePath` | string | Path to client certificate file (.crt, .pem) |
| `yoda.gigachat.privateKeyPath` | string | Path to private key file (.key, .pem) |
| `yoda.gigachat.certificatePassphrase` | string | Private key passphrase (optional) |

## 🚀 Quick Setup

### Option 1: Command Palette
1. **Ctrl+Shift+P** → `Yoda: Configure Certificate Authentication`
2. Select your certificate file (`.crt`, `.pem`)
3. Select your private key file (`.key`, `.pem`)
4. Enter passphrase (if required)
5. Enter custom base URL (optional)

### Option 2: VS Code Settings
1. **Ctrl+,** → Search "yoda"
2. Set **Auth Method** to `certificate`
3. Configure certificate paths and URLs
4. Test connection: **Ctrl+Shift+P** → `Yoda: Test GigaChat Connection`

## 🧪 Testing Your Configuration

Use the new **Test Connection** command to verify your setup:

```
Ctrl+Shift+P → Yoda: Test GigaChat Connection
```

This will:
- ✅ Test authentication with your configured method
- 🌐 Verify base URL connectivity
- 🤖 Check model access
- 📊 Display connection details

## 🔍 Troubleshooting

### Certificate Issues
- **File not found**: Ensure certificate and key files exist and are readable
- **Invalid format**: Certificate files should contain `BEGIN CERTIFICATE`, key files should contain `BEGIN PRIVATE KEY`
- **Passphrase required**: If your private key is encrypted, provide the passphrase

### Connection Issues
- **SSL errors**: Enable `yoda.gigachat.ignoreSSLErrors` for self-signed certificates
- **Base URL**: Ensure the custom URL is correct and accessible
- **Firewall**: Check that your network allows access to the GigaChat endpoint

## 📚 Example Enterprise Setup

```json
{
  "yoda.gigachat.authMethod": "certificate",
  "yoda.gigachat.baseUrl": "https://internal-gigachat.company.com/api/v1",
  "yoda.gigachat.certificatePath": "/path/to/client.crt",
  "yoda.gigachat.privateKeyPath": "/path/to/client.key",
  "yoda.gigachat.certificatePassphrase": "your-passphrase",
  "yoda.gigachat.ignoreSSLErrors": true
}
```

## 🆕 What's New in v1.1.0

- ✨ **Certificate Authentication**: Full support for client certificate authentication
- 🌐 **Custom Base URLs**: Connect to custom GigaChat deployments
- 🧪 **Connection Testing**: New command to test your configuration
- 🔧 **Enhanced Setup Wizard**: Guided certificate setup process
- 📊 **Better Error Handling**: Improved error messages and troubleshooting

---

**Need help?** Use `Ctrl+Shift+P → Yoda: Setup Wizard` for guided configuration!