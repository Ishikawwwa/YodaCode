# YACOR - Yet Another COde Reviewer

YACOR is an AI-powered code reviewer for Python, JavaScript, TypeScript, Java, C#, and C++. It provides best practice suggestions, code quality improvements, and helps you write better code using GigaChat models.

## Features
- Multi-language support: Python, JavaScript, TypeScript, Java, C#, C++
- AI-powered code review and suggestions
- Cross-file and single-file analysis
- Model selection for GigaChat
- Easy API key setup

## Getting Started
1. Install the extension from the VSIX package.
2. Open the Command Palette (`Ctrl+Shift+P`) and search for `YACOR` commands.
3. Configure your GigaChat API key in the settings.
4. Open a code file and run `YACOR: Analyze File` to get instant feedback.

## Configuration
- `yacor.gigachat.apiKey`: Your GigaChat API key
- `yacor.gigachat.model`: Select the GigaChat model
- `yacor.gigachat.ignoreSSLErrors`: Ignore SSL certificate errors (if needed)
- `yacor.crossFileAnalysis`: Enable cross-file analysis

## Commands
- `YACOR: Analyze File`
- `YACOR: Analyze Project`
- `YACOR: Configure API Key`
- `YACOR: Select Model`
- `YACOR: Refresh Models`
- `YACOR: Show Current Model`

## License
MIT 