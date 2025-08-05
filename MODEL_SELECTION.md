# 🤖 GigaChat Model Selection

## 🎉 **Choose Your AI Model!**

YACOR now supports **multiple GigaChat models** with different capabilities and performance characteristics. You can select the model that best fits your needs!

---

## 🚀 **Available Models**

### **GigaChat:latest** ⭐ *Recommended*
- **Latest stable version** - recommended for most use cases
- Good balance of speed and accuracy
- Best for general code analysis

### **GigaChat-Pro** 🔥
- **Enhanced model** with improved reasoning capabilities
- Better at understanding complex code patterns
- Ideal for advanced code analysis

### **GigaChat-Plus** ✨
- **Advanced model** with extended context
- Better code understanding and suggestions
- Great for large files and complex projects

### **GigaChat-Max** 🚀
- **Most powerful model** with maximum capabilities
- Highest accuracy but slower response times
- Best for critical code reviews

---

## 🎯 **How to Select a Model**

### **Method 1: Command Palette**
1. Press **`Ctrl+Shift+P`**
2. Type: **`YACOR: Select GigaChat Model`**
3. Choose from available models
4. Your selection is automatically saved!

### **Method 2: VS Code Settings**
1. Open VS Code Settings (`Ctrl+,`)
2. Search for: **`yacor gigachat model`**
3. Select your preferred model from the dropdown

### **Method 3: Settings JSON**
```json
{
  "yacor.gigachat.model": "GigaChat-Pro"
}
```

---

## 🔧 **Model Management Commands**

### **📋 Available Commands:**

| Command | Description | Icon |
|---------|-------------|------|
| `YACOR: Select GigaChat Model` | Choose from available models | 🤖 |
| `YACOR: Show Current Model` | View current model and settings | ℹ️ |
| `YACOR: Refresh Available Models` | Update model list from API | 🔄 |

### **Access via Command Palette:**
- Press **`Ctrl+Shift+P`**
- Type **`YACOR:`** to see all available commands

---

## 🕵️ **Debugging Model Selection**

If you're experiencing issues with model selection, use the **debugging commands**:

### **`YACOR: Show Current Model`**
This command shows:
- ✅ **Current active model**
- 📋 **Available models list**
- 🔧 **Configuration details** (Global, Workspace, Folder scopes)
- 💡 **Quick actions** to change or refresh models

### **Console Debugging**
Open Developer Console (`Ctrl+Shift+P` → "Developer: Toggle Developer Tools") to see:
- Model selection process
- Configuration saving attempts
- Error messages if saving fails

---

## ⚙️ **Configuration Details**

### **Settings Structure:**
```json
{
  "yacor.gigachat.model": "GigaChat:latest",
"yacor.gigachat.availableModels": [
    "GigaChat:latest",
    "GigaChat-Pro", 
    "GigaChat-Plus",
    "GigaChat-Max"
  ]
}
```

### **Configuration Scopes:**
The extension tries to save your model selection in this order:
1. **Global** - Available across all VS Code instances
2. **Workspace** - Specific to current workspace
3. **Workspace Folder** - Specific to current folder

---

## 🚀 **Usage Examples**

### **For Daily Development:**
```
Model: GigaChat:latest
✅ Fast analysis
✅ Good for regular code review
✅ Balanced performance
```

### **For Critical Reviews:**
```
Model: GigaChat-Max
✅ Most thorough analysis
✅ Best error detection
⚠️ Slower response times
```

### **For Large Projects:**
```
Model: GigaChat-Plus
✅ Extended context understanding
✅ Better cross-file analysis
✅ Advanced pattern recognition
```

---

## 🔄 **Automatic Model Refresh**

The extension automatically:
- 🔄 **Updates available models** when you select a model
- 💾 **Saves your selection** across VS Code sessions
- 🚀 **Uses your chosen model** for all analysis tasks

### **Manual Refresh:**
If you want to check for new models:
1. Press **`Ctrl+Shift+P`**
2. Type: **`YACOR: Refresh Available Models`**
3. Available models will be updated from the GigaChat API

---

## 🛠️ **Troubleshooting**

### **Model not saving?**
1. Try **`YACOR: Show Current Model`** to see configuration details
2. Check if you have workspace-specific settings overriding global ones
3. Try selecting the model again - the extension will try different scopes

### **Model not available?**
1. Run **`YACOR: Refresh Available Models`**
2. Make sure your GigaChat API key is valid
3. Check your internet connection

### **Still having issues?**
- Open Developer Console for detailed error messages
- The extension provides fallback mechanisms and detailed logging
- Your selection should persist even if there are temporary API issues

---

## 🎉 **Quick Test**

**Try it right now:**

1. **Open Command Palette**: `Ctrl+Shift+P`
2. **Type**: `YACOR: Select GigaChat Model`
3. **Choose**: A different model (like `GigaChat-Pro`)
4. **Test**: Save any code file to trigger analysis
5. **Verify**: Check `YACOR: Show Current Model` to confirm your selection

Your model selection is now **persistent** and will be used for all future analysis! 🎯

---

**🧙‍♂️ YACOR is now more powerful than ever with customizable AI models!** 