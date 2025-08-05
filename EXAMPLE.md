# YACOR Extension - Quick Start Example

This example shows how to quickly get started with the YACOR VS Code extension.

## Step 1: Get GigaChat API Access

1. Go to [Sber Developer Portal](https://developers.sber.ru/studio)
2. Register for an account (if you don't have one)
3. Create a new project and get your **Client Secret Key**
4. Make sure to copy the **Base64 encoded** value

## Step 2: Configure the Extension

1. Open VS Code Settings (`Ctrl+,` or `Cmd+,`)
2. Search for "YACOR"
3. Set the `yacor.gigachat.apiKey` to your Base64 Client Secret Key

Example configuration in `settings.json`:
```json
{
  "yacor.gigachat.apiKey": "your-base64-client-secret-key-here",
  "yacor.autoAnalyze": true,
  "yacor.severity": "warning"
}
```

## Step 3: Use the Extension

1. Open any supported file (`.js`, `.ts`, `.py`, etc.)
2. The extension will automatically analyze the file when you save it
3. Or manually trigger analysis:
   - Open Command Palette (`Ctrl+Shift+P`)
   - Type "YACOR: Analyze Current File"
   - Press Enter

## Example Analysis

When you save a JavaScript file like this:
```javascript
function calculateSum(a, b) {
    var result = a + b;
    return result;
}
```

YACOR might suggest:
- Use `const` or `let` instead of `var`
- Consider more descriptive variable names
- Add type checking or JSDoc comments

## Commands Available

- **YACOR: Analyze Current File** - Analyze the currently open file
- **YACOR: Analyze All Files** - Analyze all supported files in workspace
- **YACOR: Configure Best Practices** - Open settings to customize rules

That's it! YACOR will help guide you to write cleaner, better code following your company's best practices. 