# Yoda - Python Code Mentor

> *"Do or do not, there is no try."* - Master Yoda

An AI-powered VS Code extension that acts as your personal Python code mentor, using GigaChat to analyze your Python code against best practices and provide intelligent feedback. Specializes in PEP 8, type hints, and Pythonic patterns.

## Features

- 🐍 **Python-Focused Analysis**: Specialized in Python best practices, PEP 8, and Pythonic patterns
- 🤖 **AI-Powered Analysis**: Uses GigaChat AI to understand Python code context and provide meaningful feedback
- 📋 **Comprehensive Python Rules**: Built-in rules for type hints, exception handling, f-strings, and more
- 🎯 **PEP 8 Compliance**: Checks naming conventions, line length, import organization
- ⚡ **Real-time Analysis**: Automatically analyzes Python files on save (configurable)
- 🔍 **Smart Diagnostics**: Shows issues directly in VS Code with proper severity levels
- 🧭 **Context Menu Integration**: Right-click to analyze Python files
- 📊 **Workspace Analysis**: Analyze all Python files in workspace (prioritizes .py files)
- 🚀 **Multi-Language Support**: Primary focus on Python, also supports JavaScript, TypeScript, Java, C#, C/C++

## Installation

### Prerequisites

1. **GigaChat API Access**: You need a GigaChat Client Secret Key to use this extension
   - Visit [Sber Developer Portal](https://developers.sber.ru/studio) to register and get your Client Secret Key
   - Make sure to copy the Base64 encoded value of the Client Secret Key
   - The extension uses the `gigachat-node` library for API communication

### Install from Source

1. Clone or download this repository
2. Open the project in VS Code
3. Install dependencies:
   ```bash
   npm install
   ```
4. Compile the extension:
   ```bash
   npm run compile
   ```
5. Press `F5` to launch a new Extension Development Host with the extension loaded

## Configuration

### Required Settings

1. **Open VS Code Settings** (`Ctrl+,` or `Cmd+,`)
2. Search for "Yoda"
3. Configure the following settings:

#### GigaChat Client Secret Key
```json
{
  "yoda.gigachat.apiKey": "your-gigachat-client-secret-key-in-base64-here"
}
```

**Important**: The API key should be your GigaChat Client Secret Key in Base64 format. You can get this key from the [Sber Developer Portal](https://developers.sber.ru/studio). Make sure to copy the Base64 encoded value.

### Optional Settings

#### Auto Analysis
```json
{
  "yoda.autoAnalyze": true  // Analyze files automatically on save
}
```

#### Custom Best Practices
```json
{
  "yoda.bestPractices": {
    "general": [
      "Use meaningful variable and function names",
      "Keep functions small and focused",
      "Add proper error handling"
    ],
    "javascript": [
      "Use const/let instead of var",
      "Prefer arrow functions for callbacks"
    ],
    "typescript": [
      "Define proper types for all variables",
      "Avoid 'any' type unless necessary"
    ]
  }
}
```

#### Default Severity
```json
{
  "yoda.severity": "warning"  // "error", "warning", or "info"
}
```

## Usage

### Commands

The extension provides several commands accessible via the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`):

- **Yoda: Analyze Current File** - Analyzes the currently open file
- **Yoda: Analyze All Files** - Analyzes all supported files in the workspace
- **Yoda: Configure Best Practices** - Opens settings for customizing best practices

### Context Menu

Right-click on any supported file in the Explorer or Editor to access:
- **Yoda: Analyze Current File**

### Automatic Analysis

When `yoda.autoAnalyze` is enabled (default), Yoda automatically analyzes files when you save them.

### Status Bar

The status bar shows Yoda's current state:
- `✓ Yoda Ready` - Extension is ready to analyze code
- `↻ Yoda Analyzing...` - Currently analyzing code
- `✓ Yoda: X issues found` - Analysis complete (shown temporarily)
- `✗ Yoda Error` - Error occurred (check the output panel)

## Supported Languages

**Primary Focus:**
- 🐍 **Python (`.py`)** - Full PEP 8 analysis, type hints, Pythonic patterns

**Also Supported:**
- JavaScript (`.js`)
- TypeScript (`.ts`)
- Java (`.java`)
- C# (`.cs`)
- C++ (`.cpp`, `.c`)

## What Yoda Checks in Python Code

### PEP 8 Compliance
- ✅ Naming conventions (snake_case, PascalCase)
- ✅ Line length (88 characters with Black formatter)
- ✅ Import organization and formatting
- ✅ Whitespace and indentation

### Modern Python Practices
- ✅ Type hints for parameters and return values
- ✅ F-string usage instead of old formatting
- ✅ List/dict comprehensions where appropriate
- ✅ Context managers (`with` statements)
- ✅ Proper exception handling with specific types
- ✅ Dataclasses for data structures

### Code Quality
- ✅ Proper docstrings (Google/NumPy style)
- ✅ Logging instead of print statements
- ✅ Meaningful variable names
- ✅ Function size and complexity
- ✅ Avoiding mutable default arguments

## Best Practices Configuration

Yoda comes with built-in best practices for different languages, but you can customize them to match your company's coding standards:

### Adding Custom Rules

1. Open VS Code Settings
2. Search for "yoda.bestPractices"
3. Edit the JSON object to add your rules:

```json
{
  "yoda.bestPractices": {
    "general": [
      "Your general coding rule here"
    ],
    "javascript": [
      "JavaScript-specific rule here"
    ],
    "python": [
      "Python-specific rule here"
    ]
  }
}
```

### Language-Specific Rules

Each language can have its own set of best practices. The extension will combine general rules with language-specific rules when analyzing code.

## Troubleshooting

### Common Issues

1. **Extension not analyzing code**
   - Check that your GigaChat Client Secret Key is configured correctly and is in Base64 format
   - Ensure the file language is supported
   - Check the VS Code output panel for error messages

2. **"GigaChat API key not configured" warning**
   - Set your Client Secret Key (Base64) in settings: `yoda.gigachat.apiKey`

3. **Analysis takes too long**
   - Large files may take longer to analyze
   - Check your internet connection
   - Verify GigaChat API is accessible

### Output Panel

For detailed logs and error messages, check the Output panel:
1. Open View → Output
2. Select "Yoda Code Mentor" from the dropdown

## Development

### Building from Source

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch for changes during development
npm run watch
```

### Testing the Extension

1. Press `F5` in VS Code to launch Extension Development Host
2. Open a code file in the new window
3. Test the commands and features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and feature requests, please create an issue in the repository.

---

*May the code be with you!* 🚀 