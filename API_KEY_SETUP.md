# 🔑 GigaChat API Key Setup Guide

Perfect! I've made the API key configuration much more user-friendly. Here are **3 easy ways** to configure your GigaChat API key:

## 🧙‍♂️ **Method 1: Setup Wizard (Recommended)**

1. **Open Command Palette**: Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. **Type**: `Yoda: Setup Wizard`
3. **Follow the guided setup** - it will walk you through everything!

## 🔑 **Method 2: Direct API Key Setup**

1. **Open Command Palette**: Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. **Type**: `Yoda: Setup GigaChat API Key`
3. **Enter your key** in the secure input field that appears

## ⚙️ **Method 3: VS Code Settings (Traditional)**

1. **Open Settings**: Press `Ctrl+,` (or `Cmd+,` on Mac)
2. **Search for**: `Yoda`
3. **Find**: `Yoda: Gigachat › Api Key`
4. **Paste your Base64 Client Secret Key**

---

## 📋 **Getting Your GigaChat API Key**

### Step 1: Get the API Key
1. Visit: [https://developers.sber.ru/studio](https://developers.sber.ru/studio)
2. **Register/Login** to your account
3. **Create a new project**
4. **Copy the Client Secret Key** (make sure it's the **Base64 encoded** version!)

### Step 2: Configure in Yoda
- Use any of the 3 methods above
- The setup wizard will even **validate** that your key is in proper Base64 format!

---

## ✨ **New Features Added**

### 🔒 **Secure Input**
- API key input is **masked** for security
- **Base64 validation** ensures correct format
- **Error messages** help if something goes wrong

### 🧙‍♂️ **Setup Wizard**
- **Guided step-by-step** setup process
- **Links to Sber Developer Portal**
- **Automatic test file creation** to verify everything works

### 🎯 **Smart Welcome Messages**
- **First-time users** get setup guidance
- **Existing users** get quick action options
- **Context-aware** suggestions

---

## 🚀 **Quick Test**

After setting up your API key:

1. **Open Command Palette**: `Ctrl+Shift+P`
2. **Type**: `Yoda: Setup Wizard`
3. **Choose**: "Create Test File" 
4. **Save the file** to see Yoda analyze it automatically!

---

## 🐛 **Troubleshooting**

### "Invalid Base64 format" error?
- Make sure you copied the **Base64 encoded** version from Sber Portal
- The key should look like: `bXlhcGlrZXk6c2VjcmV0...`

### Extension not working?
1. Try the **Setup Wizard**: `Yoda: Setup Wizard`
2. Check if your key is configured: Look for `✅ Yoda Ready` in status bar
3. Test with: `Yoda: Analyze Current File`

### Need help?
- Run `Yoda: Setup Wizard` for guided troubleshooting
- Check the **Problems panel** for detailed error messages

---

**🧙‍♂️ May the clean Python code be with you!** 