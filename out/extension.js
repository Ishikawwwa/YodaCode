"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const gigachat_node_1 = require("gigachat-node");
class YodaCodeMentor {
    constructor(context) {
        this.gigaChat = null;
        this.context = context;
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection('yoda');
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        this.initializeGigaChat();
        this.setupEventListeners(context);
        this.registerCommands(context);
        context.subscriptions.push(this.diagnosticCollection);
        context.subscriptions.push(this.statusBarItem);
    }
    async initializeGigaChat() {
        const config = vscode.workspace.getConfiguration('yoda');
        const apiKey = config.get('gigachat.apiKey');
        const ignoreSSLErrors = config.get('gigachat.ignoreSSLErrors');
        if (!apiKey) {
            vscode.window.showWarningMessage('Yoda: GigaChat API key not configured. Please set it in settings.', 'Setup Wizard', 'Configure API Key').then(selection => {
                if (selection === 'Setup Wizard') {
                    vscode.commands.executeCommand('yoda.showSetupWizard');
                }
                else if (selection === 'Configure API Key') {
                    vscode.commands.executeCommand('yoda.configureApiKey');
                }
            });
            return;
        }
        try {
            // Handle SSL certificate issues for GigaChat
            if (ignoreSSLErrors) {
                process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
            }
            this.gigaChat = new gigachat_node_1.GigaChat({
                clientSecretKey: apiKey,
                isIgnoreTSL: ignoreSSLErrors || true,
                isPersonal: true,
                autoRefreshToken: true,
                verifySSLCerts: !ignoreSSLErrors
            });
            // Create the access token
            await this.gigaChat.createToken();
            this.statusBarItem.text = "$(check) Yoda Ready";
            this.statusBarItem.tooltip = "Yoda Code Mentor is ready to analyze your code";
            this.statusBarItem.show();
        }
        catch (error) {
            console.error('Failed to initialize GigaChat:', error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            // Handle specific certificate errors
            if (errorMessage.includes('certificate') || errorMessage.includes('SSL') || errorMessage.includes('TLS')) {
                vscode.window.showErrorMessage(`🔒 Yoda: SSL Certificate Error - ${errorMessage}`, 'Fix SSL Issues', 'Open Settings', 'Help').then(async (selection) => {
                    if (selection === 'Fix SSL Issues') {
                        await config.update('gigachat.ignoreSSLErrors', true, vscode.ConfigurationTarget.Global);
                        vscode.window.showInformationMessage('✅ SSL errors are now ignored. Restarting Yoda...');
                        await this.initializeGigaChat();
                    }
                    else if (selection === 'Open Settings') {
                        vscode.commands.executeCommand('workbench.action.openSettings', 'yoda.gigachat');
                    }
                    else if (selection === 'Help') {
                        this.showSSLHelpDialog();
                    }
                });
            }
            else {
                vscode.window.showErrorMessage(`Yoda: Failed to initialize GigaChat: ${errorMessage}`, 'Retry', 'Configure API Key').then(selection => {
                    if (selection === 'Retry') {
                        this.initializeGigaChat();
                    }
                    else if (selection === 'Configure API Key') {
                        vscode.commands.executeCommand('yoda.configureApiKey');
                    }
                });
            }
            this.statusBarItem.text = "$(error) Yoda Error";
            this.statusBarItem.tooltip = `Yoda Code Mentor failed: ${errorMessage}`;
            this.statusBarItem.show();
        }
    }
    setupEventListeners(context) {
        // Auto-analyze on file save
        const onSave = vscode.workspace.onDidSaveTextDocument((document) => {
            const config = vscode.workspace.getConfiguration('yoda');
            if (config.get('autoAnalyze')) {
                this.analyzeDocument(document);
            }
        });
        // Listen for configuration changes
        const onConfigChange = vscode.workspace.onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration('yoda.gigachat')) {
                this.initializeGigaChat();
            }
        });
        context.subscriptions.push(onSave, onConfigChange);
    }
    registerCommands(context) {
        const analyzeFileCommand = vscode.commands.registerCommand('yoda.analyzeFile', () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                this.analyzeDocument(editor.document);
            }
            else {
                vscode.window.showWarningMessage('No active file to analyze');
            }
        });
        const analyzeWorkspaceCommand = vscode.commands.registerCommand('yoda.analyzeWorkspace', async () => {
            await this.analyzeWorkspace();
        });
        const configureBestPracticesCommand = vscode.commands.registerCommand('yoda.configureBestPractices', () => {
            vscode.commands.executeCommand('workbench.action.openSettings', 'yoda.bestPractices');
        });
        const configureApiKeyCommand = vscode.commands.registerCommand('yoda.configureApiKey', async () => {
            await this.showApiKeySetup();
        });
        const showSetupWizardCommand = vscode.commands.registerCommand('yoda.showSetupWizard', async () => {
            await this.showSetupWizard();
        });
        const analyzeCrossFileCommand = vscode.commands.registerCommand('yoda.analyzeCrossFile', async () => {
            await this.performCrossFileAnalysis();
        });
        const selectModelCommand = vscode.commands.registerCommand('yoda.selectModel', async () => {
            await this.selectGigaChatModel();
        });
        const refreshModelsCommand = vscode.commands.registerCommand('yoda.refreshModels', async () => {
            await this.refreshAvailableModels();
        });
        const showCurrentModelCommand = vscode.commands.registerCommand('yoda.showCurrentModel', async () => {
            await this.showCurrentModel();
        });
        context.subscriptions.push(analyzeFileCommand, analyzeWorkspaceCommand, configureBestPracticesCommand, configureApiKeyCommand, showSetupWizardCommand, analyzeCrossFileCommand, selectModelCommand, refreshModelsCommand, showCurrentModelCommand);
    }
    async analyzeDocument(document) {
        if (!this.gigaChat || !this.isSupportedLanguage(document.languageId)) {
            return;
        }
        this.statusBarItem.text = "$(sync~spin) Yoda Analyzing...";
        try {
            const analysis = await this.performCodeAnalysis(document);
            this.updateDiagnostics(document, analysis, document.getText());
            this.statusBarItem.text = `$(check) Yoda: ${analysis.length} issues found`;
            setTimeout(() => {
                this.statusBarItem.text = "$(check) Yoda Ready";
            }, 3000);
        }
        catch (error) {
            console.error('Analysis failed:', error);
            vscode.window.showErrorMessage(`Yoda analysis failed: ${error}`);
            this.statusBarItem.text = "$(error) Yoda Error";
        }
    }
    async performCodeAnalysis(document) {
        const config = vscode.workspace.getConfiguration('yoda');
        const bestPractices = config.get('bestPractices');
        const languageRules = bestPractices?.[document.languageId] || [];
        const generalRules = bestPractices?.general || [];
        const allRules = [...generalRules, ...languageRules];
        const code = document.getText();
        const prompt = this.buildAnalysisPrompt(code, document.languageId, allRules);
        try {
            const response = await this.gigaChat.completion({
                model: this.getSelectedModel(),
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            });
            return this.parseAnalysisResponse(response.choices[0].message.content);
        }
        catch (error) {
            console.error('Yoda: GigaChat API error:', error);
            throw error;
        }
    }
    addLineNumbers(code) {
        const lines = code.split('\n');
        return lines.map((line, index) => `${(index + 1).toString().padStart(3, ' ')}: ${line}`).join('\n');
    }
    validateAndFixLineNumber(issue, document, originalCode) {
        // TEST: Don't subtract 1 - maybe LLM gives correct 0-based positions already
        const reportedLine = Math.max(0, (issue.line || 1));
        const reportedColumn = Math.max(0, (issue.column || 1) - 1);
        console.log(`🔍 Line fix: LLM reported ${issue.line} -> VS Code 0-based ${reportedLine}`);
        // If reported line is within bounds, trust it
        if (reportedLine < document.lineCount) {
            return { line: reportedLine, column: Math.min(reportedColumn, document.lineAt(reportedLine).text.length), confidence: 'high' };
        }
        // If line number is out of bounds, try to find relevant code by searching for keywords from the issue message
        const issueMessage = issue.message?.toLowerCase() || '';
        const codeLines = originalCode.split('\n');
        // Look for specific patterns in the issue message that might help locate the problem
        const searchTerms = this.extractSearchTermsFromIssue(issueMessage);
        for (let i = 0; i < codeLines.length; i++) {
            const line = codeLines[i].toLowerCase();
            if (searchTerms.some(term => line.includes(term))) {
                console.log(`🔍 Fixed line number: ${issue.line} -> ${i + 1} (found "${searchTerms.find(term => line.includes(term))}")`);
                return { line: i, column: Math.min(reportedColumn, codeLines[i].length), confidence: 'medium' };
            }
        }
        // As last resort, use the first line
        console.warn(`⚠️ Could not validate line ${issue.line}, defaulting to line 1`);
        return { line: 0, column: 0, confidence: 'low' };
    }
    extractSearchTermsFromIssue(message) {
        const terms = [];
        // Extract function/method names
        const funcMatch = message.match(/function|method|def\s+(\w+)|class\s+(\w+)/g);
        if (funcMatch)
            terms.push(...funcMatch);
        // Extract variable names in quotes
        const varMatch = message.match(/['"`](\w+)['"`]/g);
        if (varMatch)
            terms.push(...varMatch.map(m => m.replace(/['"`]/g, '')));
        // Extract common keywords
        const keywords = ['import', 'def', 'class', 'function', 'var', 'let', 'const', 'if', 'for', 'while'];
        keywords.forEach(keyword => {
            if (message.includes(keyword))
                terms.push(keyword);
        });
        return terms.filter(term => term.length > 2); // Filter out very short terms
    }
    buildAnalysisPrompt(code, language, rules) {
        const getLanguageGuidance = (lang) => {
            const guidanceMap = {
                'python': `
Special focus for Python code:
- Check PEP 8 compliance (naming, spacing, line length)
- Verify type hints are present and correct
- Ensure proper exception handling with specific exception types
- Look for opportunities to use Pythonic patterns (comprehensions, context managers)
- Check for proper docstring format (Google/NumPy style)
- Verify imports are organized correctly
- Look for f-string usage vs old-style formatting
- Check for proper use of dataclasses or named tuples
- Ensure logging is used instead of print statements
- Verify proper resource management (with statements)`,
                'javascript': `
Special focus for JavaScript code:
- Check for const/let usage instead of var
- Verify proper async/await usage instead of callback hell
- Look for template literal usage instead of string concatenation
- Check for strict equality (===) usage
- Verify proper error handling with try/catch
- Look for modern ES6+ features usage
- Check for proper null/undefined handling
- Verify JSDoc comments for functions
- Look for proper event handling and cleanup`,
                'typescript': `
Special focus for TypeScript code:
- Check for explicit type annotations
- Verify interface usage for object shapes
- Look for proper generic constraints
- Check for avoiding 'any' type
- Verify union types usage instead of any
- Look for proper error handling with typed exceptions
- Check for utility types usage (Partial, Pick, Omit)
- Verify strict compiler options compliance
- Look for proper type guards implementation`,
                'java': `
Special focus for Java code:
- Check naming conventions (camelCase, PascalCase)
- Verify proper access modifiers usage
- Look for specific exception handling
- Check for interface usage and SOLID principles
- Verify proper resource management (try-with-resources)
- Look for generics usage for type safety
- Check for proper equals() and hashCode() implementations
- Verify annotation usage (@Override, @Deprecated)
- Look for StringBuilder usage in loops`,
                'csharp': `
Special focus for C# code:
- Check naming conventions (PascalCase, camelCase)
- Verify proper using statements for resource disposal
- Look for IDisposable implementation when needed
- Check for proper async/await patterns
- Verify nullable reference types usage (C# 8+)
- Look for LINQ usage appropriately
- Check for proper exception handling
- Verify XML documentation for public APIs
- Look for dependency injection patterns`,
                'cpp': `
Special focus for C++ code:
- Check for RAII principle implementation
- Verify smart pointer usage over raw pointers
- Look for const correctness
- Check for proper copy constructors and assignment operators
- Verify override keyword usage
- Look for range-based for loops
- Check for nullptr usage instead of NULL
- Verify proper header guards or #pragma once
- Look for std::string usage over char arrays`,
                'c': `
Special focus for C code:
- Check for proper memory management (malloc/free)
- Verify null pointer checks before dereferencing
- Look for return value checking
- Check for const usage for read-only parameters
- Verify proper variable initialization
- Look for header guards in header files
- Check for buffer overflow prevention
- Verify proper error handling patterns
- Look for standard library function usage`
            };
            return guidanceMap[lang] || '';
        };
        const languageSpecificGuidance = getLanguageGuidance(language);
        const languageName = language.charAt(0).toUpperCase() + language.slice(1);
        return `You are Yoda, a wise code mentor specializing in multi-language development with expertise in ${languageName}. Analyze the following ${language} code against these best practices:

${rules.map(rule => `- ${rule}`).join('\n')}
${languageSpecificGuidance}

Code to analyze (with line numbers for accurate reference):
\`\`\`${language}
${this.addLineNumbers(code)}
\`\`\`

Please provide feedback in the following JSON format for each issue found:
{
  "issues": [
    {
      "line": <line_number_1_based>,
      "column": <column_number_1_based>,
      "message": "Brief description of the issue and suggestion for improvement",
      "severity": "error" | "warning" | "info",
      "rule": "Which best practice rule this violates"
    }
  ]
}

IMPORTANT: Reference the line numbers exactly as shown in the numbered code above (e.g., if you see "5: def my_function():", report line 5)

Focus on:
1. Language-specific best practices and idioms
2. Code quality, maintainability, and readability
3. Potential bugs, security issues, and performance problems
4. Modern language features and proper error handling
5. Consistent coding style and documentation

Be constructive and helpful in your feedback, like a wise mentor would be. Provide specific suggestions for improvement.

IMPORTANT: Your response MUST be valid JSON. Do not include any text before or after the JSON. Start your response with { and end with }.

Example response format:
{
  "issues": [
    {
      "line": 5,
      "column": 4,
      "message": "Use const instead of var for variables that don't change",
      "severity": "warning",
      "rule": "prefer-const"
    }
  ]
}

If no issues are found, return: {"issues": []}`;
    }
    parseAnalysisResponse(response) {
        console.log('🔍 Starting JSON parsing...');
        console.log('Response length:', response.length);
        console.log('Response preview:', response.substring(0, 300));
        try {
            let jsonString = '';
            let method = '';
            // Method 1: Try to extract JSON from markdown code blocks
            const markdownJsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
            if (markdownJsonMatch) {
                jsonString = markdownJsonMatch[1].trim();
                method = 'markdown';
            }
            // Method 2: Try direct JSON extraction if response starts with {
            else if (response.trim().startsWith('{')) {
                jsonString = response.trim();
                method = 'direct';
            }
            // Method 3: Look for JSON with "issues" key specifically - ENHANCED
            else {
                // More aggressive pattern that finds JSON even with surrounding text
                const patterns = [
                    // Pattern for issues array with flexible whitespace
                    /\{\s*["']?issues["']?\s*:\s*\[[\s\S]*?\]\s*\}/,
                    // Pattern for complete JSON objects
                    /\{[\s\S]*?["']issues["'][\s\S]*?\[[\s\S]*?\][\s\S]*?\}/,
                    // Pattern for JSON that might have trailing text
                    /\{[\s\S]*?["']issues["'][\s\S]*?\[[\s\S]*?\][\s\S]*?\}(?=\s*$|[^}]*$)/,
                    // Fallback: any JSON-like structure
                    /\{[\s\S]*?\}/
                ];
                for (const pattern of patterns) {
                    const match = response.match(pattern);
                    if (match) {
                        jsonString = match[0];
                        method = `pattern-match`;
                        console.log(`🎯 Found JSON with pattern, length: ${jsonString.length}`);
                        break;
                    }
                }
                if (!jsonString) {
                    console.log('❌ No JSON structure found with any pattern');
                    console.log('Raw response to analyze:', response);
                    return this.parseTextResponse(response);
                }
            }
            console.log(`✅ Found JSON using method: ${method}`);
            console.log('JSON string length:', jsonString.length);
            console.log('JSON starts with:', jsonString.substring(0, 100));
            console.log('JSON ends with:', jsonString.substring(Math.max(0, jsonString.length - 100)));
            // Clean up JSON more aggressively
            jsonString = jsonString
                .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
                .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
                .replace(/([^\\])\\n/g, '$1\\\\n') // Fix unescaped newlines
                .replace(/([^\\])\\"/g, '$1\\"') // Fix unescaped quotes
                .replace(/\n/g, ' ') // Replace actual newlines with spaces
                .replace(/\r/g, '') // Remove carriage returns
                .trim();
            // Try to find the end of JSON if there's trailing text
            let braceCount = 0;
            let jsonEnd = -1;
            for (let i = 0; i < jsonString.length; i++) {
                if (jsonString[i] === '{')
                    braceCount++;
                if (jsonString[i] === '}') {
                    braceCount--;
                    if (braceCount === 0) {
                        jsonEnd = i + 1;
                        break;
                    }
                }
            }
            if (jsonEnd > 0 && jsonEnd < jsonString.length) {
                jsonString = jsonString.substring(0, jsonEnd);
                console.log('🔧 Trimmed JSON to proper end, new length:', jsonString.length);
            }
            console.log('🧹 Cleaned JSON, attempting parse...');
            console.log('Final JSON to parse:', jsonString.substring(0, 200) + '...');
            const parsed = JSON.parse(jsonString);
            console.log('✅ JSON parsed successfully');
            console.log('Parsed keys:', Object.keys(parsed));
            if (!parsed.issues) {
                console.log('❌ No "issues" property found');
                return [];
            }
            if (!Array.isArray(parsed.issues)) {
                console.log('❌ "issues" is not an array:', typeof parsed.issues);
                return [];
            }
            console.log(`📋 Found ${parsed.issues.length} issues`);
            const issues = parsed.issues.map((issue, index) => {
                const result = {
                    line: Math.max(0, (issue.line || 1) - 1),
                    column: Math.max(0, (issue.column || 1) - 1),
                    message: issue.message || 'Code improvement suggested',
                    severity: this.getSeverity(issue.severity),
                    rule: issue.rule || 'general'
                };
                if (index < 3) { // Log first 3 issues for debugging
                    console.log(`Issue ${index}:`, {
                        originalLine: issue.line,
                        originalColumn: issue.column,
                        convertedLine: result.line,
                        convertedColumn: result.column,
                        message: result.message.substring(0, 50) + '...',
                        severity: issue.severity
                    });
                }
                return result;
            });
            console.log(`✅ Successfully processed ${issues.length} issues`);
            return issues;
        }
        catch (error) {
            console.error('❌ JSON parsing failed:', error);
            if (error instanceof Error) {
                console.error('Error details:', error.message);
                console.error('Stack:', error.stack);
            }
            console.log('Raw response that failed to parse:', response);
            console.log('🔄 Falling back to aggressive text parsing...');
            return this.parseTextResponse(response);
        }
    }
    parseTextResponse(response) {
        console.log('🔄 Fallback text parsing triggered');
        console.log('Response starts with:', response.substring(0, 100));
        // Try one more aggressive JSON extraction
        const jsonPattern = /\{[\s\S]*?"issues"[\s\S]*?\[[\s\S]*?\][\s\S]*?\}/;
        const aggressiveMatch = response.match(jsonPattern);
        if (aggressiveMatch) {
            try {
                console.log('🔍 Found JSON pattern in text response, attempting parse...');
                const cleanJson = aggressiveMatch[0]
                    .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
                    .replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // Remove control characters
                const parsed = JSON.parse(cleanJson);
                if (parsed.issues && Array.isArray(parsed.issues)) {
                    console.log('✅ Successfully parsed JSON from text response!');
                    return parsed.issues.map((issue) => ({
                        line: Math.max(0, (issue.line || 1) - 1),
                        column: Math.max(0, (issue.column || 1) - 1),
                        message: issue.message || 'Code improvement suggested',
                        severity: this.getSeverity(issue.severity),
                        rule: issue.rule || 'general'
                    }));
                }
            }
            catch (error) {
                console.log('❌ Aggressive JSON parsing also failed:', error);
            }
        }
        // If we can't parse JSON, create a general issue
        if (response.toLowerCase().includes('no issues') || response.toLowerCase().includes('looks good') || response.toLowerCase().includes('well written')) {
            return [];
        }
        // Create a general feedback issue
        return [{
                line: 0,
                column: 0,
                message: `Yoda suggests: ${response.substring(0, 200)}${response.length > 200 ? '...' : ''}`,
                severity: this.getSeverity('info'),
                rule: 'general-feedback'
            }];
    }
    getSeverity(severity) {
        switch (severity?.toLowerCase()) {
            case 'error':
                return vscode.DiagnosticSeverity.Error;
            case 'warning':
                return vscode.DiagnosticSeverity.Warning;
            case 'info':
                return vscode.DiagnosticSeverity.Information;
            default:
                const config = vscode.workspace.getConfiguration('yoda');
                const defaultSeverity = config.get('severity');
                return this.getSeverity(defaultSeverity || 'warning');
        }
    }
    updateDiagnostics(document, issues, originalCode) {
        const diagnostics = issues.map((issue, index) => {
            // Validate and potentially fix line/column numbers
            const validated = this.validateAndFixLineNumber(issue, document, originalCode);
            const lineNumber = validated.line;
            const startColumn = validated.column;
            const line = document.lineAt(lineNumber);
            // Log validation confidence for debugging
            if (validated.confidence !== 'high') {
                console.log(`⚠️ Line validation: ${issue.line} -> ${lineNumber + 1} (confidence: ${validated.confidence})`);
            }
            // Calculate a smart end position
            let endColumn = startColumn;
            // Try to find the end of the current word/token
            const lineText = line.text;
            if (startColumn < lineText.length) {
                // Find end of current word (alphanumeric or underscore)
                while (endColumn < lineText.length && /[\w]/.test(lineText[endColumn])) {
                    endColumn++;
                }
                // If no word found, highlight at least 1 character or until end of line
                if (endColumn === startColumn) {
                    endColumn = Math.min(startColumn + 5, lineText.length);
                }
            }
            else {
                // If column is at end of line, highlight the whole line
                endColumn = lineText.length;
            }
            // Create the range
            const range = new vscode.Range(lineNumber, startColumn, lineNumber, endColumn);
            console.log(`Diagnostic ${index}: Line ${lineNumber + 1} (${validated.confidence}), Col ${startColumn}-${endColumn}, Message: ${issue.message.substring(0, 50)}...`);
            const diagnostic = new vscode.Diagnostic(range, `[Yoda] ${issue.message}`, issue.severity);
            diagnostic.source = 'Yoda Code Mentor';
            diagnostic.code = issue.rule;
            return diagnostic;
        });
        this.diagnosticCollection.set(document.uri, diagnostics);
        console.log(`✅ Applied ${diagnostics.length} diagnostics to ${document.fileName}`);
    }
    async analyzeWorkspace() {
        const files = await vscode.workspace.findFiles('**/*.{py,js,ts,java,cs,cpp,c}', '**/node_modules/**');
        if (files.length === 0) {
            vscode.window.showInformationMessage('No supported files found in workspace');
            return;
        }
        // Group files by language for better organization
        files.sort((a, b) => {
            const aExt = a.path.split('.').pop() || '';
            const bExt = b.path.split('.').pop() || '';
            // Sort by extension, then by filename
            if (aExt !== bExt) {
                return aExt.localeCompare(bExt);
            }
            return a.path.localeCompare(b.path);
        });
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: 'Yoda is analyzing your workspace...',
            cancellable: true
        }, async (progress, token) => {
            for (let i = 0; i < files.length; i++) {
                if (token.isCancellationRequested) {
                    break;
                }
                const file = files[i];
                progress.report({
                    increment: (100 / files.length),
                    message: `Analyzing ${file.path.split('/').pop()}`
                });
                try {
                    const document = await vscode.workspace.openTextDocument(file);
                    await this.analyzeDocument(document);
                }
                catch (error) {
                    console.error(`Failed to analyze ${file.path}:`, error);
                }
            }
        });
    }
    isSupportedLanguage(languageId) {
        const supportedLanguages = ['python', 'javascript', 'typescript', 'java', 'csharp', 'cpp', 'c'];
        return supportedLanguages.includes(languageId);
    }
    async showApiKeySetup() {
        const config = vscode.workspace.getConfiguration('yoda');
        const currentKey = config.get('gigachat.apiKey') || '';
        const apiKey = await vscode.window.showInputBox({
            prompt: '🔑 Enter your GigaChat Client Secret Key (Base64 format)',
            placeHolder: 'Paste your Base64 encoded Client Secret Key here...',
            value: currentKey,
            password: true,
            validateInput: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'API key cannot be empty';
                }
                // Basic Base64 validation
                try {
                    atob(value);
                    return null;
                }
                catch {
                    return 'Invalid Base64 format. Please ensure you copied the Base64 encoded key from Sber Developer Portal.';
                }
            }
        });
        if (apiKey !== undefined) {
            await config.update('gigachat.apiKey', apiKey, vscode.ConfigurationTarget.Global);
            await config.update('setup.completed', true, vscode.ConfigurationTarget.Global);
            // Ensure SSL errors are ignored by default (common with GigaChat)
            await config.update('gigachat.ignoreSSLErrors', true, vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage('✅ GigaChat API key configured successfully! Yoda is ready to analyze your multi-language codebase.', 'Test Analysis').then(selection => {
                if (selection === 'Test Analysis') {
                    vscode.commands.executeCommand('yoda.analyzeFile');
                }
            });
            // Reinitialize GigaChat with new key
            await this.initializeGigaChat();
        }
    }
    async showSetupWizard() {
        const config = vscode.workspace.getConfiguration('yoda');
        const isSetupCompleted = config.get('setup.completed');
        if (isSetupCompleted) {
            const action = await vscode.window.showInformationMessage('🧙‍♂️ Yoda is already configured! What would you like to do?', 'Update API Key', 'Configure Best Practices', 'Test Analysis');
            switch (action) {
                case 'Update API Key':
                    await this.showApiKeySetup();
                    break;
                case 'Configure Best Practices':
                    vscode.commands.executeCommand('yoda.configureBestPractices');
                    break;
                case 'Test Analysis':
                    vscode.commands.executeCommand('yoda.analyzeFile');
                    break;
            }
            return;
        }
        // Welcome message
        const startSetup = await vscode.window.showInformationMessage(`🧙‍♂️ Welcome to Yoda - Code Reviewer!

Let's get you set up to analyze your code across multiple languages with AI-powered insights.

You'll need a GigaChat API key from Sber Developer Portal.`, { modal: true }, 'Get Started', 'Later');
        if (startSetup !== 'Get Started') {
            return;
        }
        // Step 1: API Key setup
        const needsKey = await vscode.window.showInformationMessage(`📋 Step 1: Get your GigaChat API Key

1. Visit https://developers.sber.ru/studio
2. Register/login to your account  
3. Create a new project
4. Copy the Client Secret Key (Base64 format)

Ready to enter your API key?`, 'Yes, I have my key', 'Open Sber Portal', 'Skip for now');
        if (needsKey === 'Open Sber Portal') {
            vscode.env.openExternal(vscode.Uri.parse('https://developers.sber.ru/studio'));
            return;
        }
        if (needsKey === 'Yes, I have my key') {
            await this.showApiKeySetup();
            // Step 2: Test analysis
            const testAnalysis = await vscode.window.showInformationMessage('🔍 Setup Complete! Would you like to test Yoda on some Python code?', 'Create Test File', 'Analyze Current File', 'Done');
            if (testAnalysis === 'Create Test File') {
                // Ask user which language to test
                const language = await vscode.window.showQuickPick([
                    { label: '🐍 Python', value: 'python' },
                    { label: '🟨 JavaScript', value: 'javascript' },
                    { label: '🔷 TypeScript', value: 'typescript' },
                    { label: '☕ Java', value: 'java' }
                ], { placeHolder: 'Which language would you like to test?' });
                if (language) {
                    const testCode = {
                        python: `# Test file for Yoda Code Reviewer - Python
def greet(name):
    print("Hello " + name)  # Should use f-strings and logging

greet("World")`,
                        javascript: `// Test file for Yoda Code Reviewer - JavaScript
var userName = "World";  // Should use const/let

function greet(name) {
    return "Hello " + name;  // Should use template literals
}

console.log(greet(userName));`,
                        typescript: `// Test file for Yoda Code Reviewer - TypeScript
function greet(name: any): any {  // Should avoid 'any' type
    return "Hello " + name;
}

const result = greet("World");`,
                        java: `// Test file for Yoda Code Reviewer - Java
public class Test {
    public String name;  // Should be private with getter/setter
    
    public String greet(String name) {
        return "Hello " + name;  // Missing @Override if overriding
    }
}`
                    };
                    const doc = await vscode.workspace.openTextDocument({
                        content: testCode[language.value],
                        language: language.value === 'java' ? 'java' : language.value
                    });
                    await vscode.window.showTextDocument(doc);
                    vscode.window.showInformationMessage(`📝 ${language.label} test file created! Save it to trigger analysis, or run "Yoda: Analyze Current File"`);
                }
            }
            else if (testAnalysis === 'Analyze Current File') {
                vscode.commands.executeCommand('yoda.analyzeFile');
            }
        }
    }
    async performCrossFileAnalysis() {
        if (!this.gigaChat) {
            vscode.window.showErrorMessage('Yoda: GigaChat not initialized. Please configure your API key first.');
            return;
        }
        const config = vscode.workspace.getConfiguration('yoda');
        const crossFileEnabled = config.get('crossFileAnalysis');
        if (!crossFileEnabled) {
            vscode.window.showInformationMessage('Cross-file analysis is disabled. Enable it in settings?', 'Enable', 'Cancel').then(async (selection) => {
                if (selection === 'Enable') {
                    await config.update('crossFileAnalysis', true, vscode.ConfigurationTarget.Workspace);
                    this.performCrossFileAnalysis();
                }
            });
            return;
        }
        // Find all supported files in workspace
        const files = await vscode.workspace.findFiles('**/*.{py,js,ts,java,cs,cpp,c}', '**/node_modules/**');
        if (files.length < 2) {
            vscode.window.showInformationMessage('Cross-file analysis requires at least 2 supported files in the workspace.');
            return;
        }
        this.statusBarItem.text = "$(sync~spin) Yoda Cross-File Analysis...";
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: 'Yoda is performing cross-file analysis...',
            cancellable: true
        }, async (progress, token) => {
            try {
                progress.report({ increment: 0, message: 'Reading files...' });
                // Read all file contents
                const filesContent = [];
                for (let i = 0; i < files.length; i++) {
                    if (token.isCancellationRequested)
                        return;
                    const file = files[i];
                    const document = await vscode.workspace.openTextDocument(file);
                    const relativePath = vscode.workspace.asRelativePath(file);
                    filesContent.push({
                        uri: file,
                        content: document.getText(),
                        relativePath: relativePath
                    });
                    progress.report({
                        increment: (30 / files.length),
                        message: `Reading ${relativePath}...`
                    });
                }
                progress.report({ increment: 30, message: 'Analyzing cross-file dependencies...' });
                // Perform cross-file analysis
                const crossFileIssues = await this.analyzeCrossFileIssues(filesContent);
                progress.report({ increment: 40, message: 'Updating diagnostics...' });
                // Update diagnostics for cross-file issues
                await this.updateCrossFileDiagnostics(crossFileIssues);
                this.statusBarItem.text = `$(check) Yoda: ${crossFileIssues.length} cross-file issues found`;
                setTimeout(() => {
                    this.statusBarItem.text = "$(check) Yoda Ready";
                }, 5000);
                // Show summary
                if (crossFileIssues.length > 0) {
                    vscode.window.showInformationMessage(`🔗 Cross-file analysis complete! Found ${crossFileIssues.length} issues spanning multiple files.`, 'View Problems').then(selection => {
                        if (selection === 'View Problems') {
                            vscode.commands.executeCommand('workbench.panel.markers.view.focus');
                        }
                    });
                }
                else {
                    vscode.window.showInformationMessage('✅ No cross-file issues found! Your file structure looks good.');
                }
            }
            catch (error) {
                console.error('Cross-file analysis failed:', error);
                vscode.window.showErrorMessage(`Cross-file analysis failed: ${error}`);
                this.statusBarItem.text = "$(error) Yoda Error";
            }
        });
    }
    async analyzeCrossFileIssues(filesContent) {
        const issues = [];
        // Build comprehensive file analysis prompt
        const filesInfo = filesContent.map(f => {
            const ext = f.relativePath.split('.').pop()?.toLowerCase() || 'text';
            return `File: ${f.relativePath}\n\`\`\`${ext}\n${this.addLineNumbers(f.content)}\n\`\`\``;
        }).join('\n\n');
        // Determine the primary language(s) being analyzed
        const languageMap = new Map();
        filesContent.forEach(f => {
            const ext = f.relativePath.split('.').pop()?.toLowerCase() || '';
            languageMap.set(ext, (languageMap.get(ext) || 0) + 1);
        });
        const primaryLanguages = Array.from(languageMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 2)
            .map(([lang]) => lang);
        const prompt = `You are Yoda, a wise code mentor specializing in multi-language cross-file analysis. Analyze these files together to find issues that span multiple files. The codebase primarily uses: ${primaryLanguages.join(', ')}.

${filesInfo}

Look for these cross-file issues:

1. **Import Issues**:
   - Functions/classes used but not imported
   - Unused imports
   - Circular import dependencies
   - Import order inconsistencies

2. **Naming Conflicts**:
   - Functions with same name but different implementations
   - Inconsistent variable/function naming across files
   - Class naming conflicts

3. **Interface Inconsistencies**:
   - Functions called with wrong parameter names/order
   - Inconsistent function signatures
   - Type mismatches between files

4. **Architecture Issues**:
   - Code duplication across files
   - Missing abstractions
   - Inconsistent error handling patterns
   - Violation of separation of concerns

5. **Dependency Issues**:
   - Missing dependencies between modules
   - Tight coupling issues
   - Inconsistent data model usage

Please provide feedback in JSON format:
{
  "cross_file_issues": [
    {
      "file": "filename.py",
      "line": <line_number_1_based>,
      "column": <column_number_1_based>, 
      "message": "Description of cross-file issue and suggestion",
      "severity": "error" | "warning" | "info",
      "type": "import" | "naming" | "interface" | "architecture" | "dependency",
      "related_files": ["other_file.py"]
    }
  ]
}

IMPORTANT: Reference the line numbers exactly as shown in the numbered code above for each file

Focus on issues that only become apparent when analyzing multiple files together. Single-file issues will be caught by regular analysis.`;
        try {
            const response = await this.gigaChat.completion({
                model: this.getSelectedModel(),
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            });
            const result = this.parseCrossFileAnalysisResponse(response.choices[0].message.content);
            return result;
        }
        catch (error) {
            console.error('Cross-file analysis API call failed:', error);
            throw error;
        }
    }
    parseCrossFileAnalysisResponse(response) {
        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                return [];
            }
            const parsed = JSON.parse(jsonMatch[0]);
            return (parsed.cross_file_issues || []).map((issue) => ({
                file: issue.file || 'unknown.py',
                line: Math.max(0, (issue.line || 1) - 1),
                column: Math.max(0, (issue.column || 1) - 1),
                message: `[Cross-File] ${issue.message || 'Cross-file issue detected'}${issue.related_files ? ` (Related: ${issue.related_files.join(', ')})` : ''}`,
                severity: this.getSeverity(issue.severity)
            }));
        }
        catch (error) {
            console.error('Failed to parse cross-file analysis response:', error);
            return [];
        }
    }
    async updateCrossFileDiagnostics(issues) {
        // Group issues by file
        const issuesByFile = new Map();
        for (const issue of issues) {
            if (!issuesByFile.has(issue.file)) {
                issuesByFile.set(issue.file, []);
            }
            issuesByFile.get(issue.file).push({
                line: issue.line,
                column: issue.column,
                message: issue.message,
                severity: issue.severity
            });
        }
        // Update diagnostics for each file
        for (const [fileName, fileIssues] of issuesByFile) {
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder)
                continue;
            const fileUri = vscode.Uri.joinPath(workspaceFolder.uri, fileName);
            const diagnostics = await Promise.all(fileIssues.map(async (issue, index) => {
                // Convert from 1-based to 0-based like regular analysis  
                let lineNumber = Math.max(0, (issue.line || 1) - 1);
                let startColumn = Math.max(0, (issue.column || 1) - 1);
                let endColumn = startColumn + 10; // Default highlight length
                // Try to get document for bounds checking
                try {
                    const document = await vscode.workspace.openTextDocument(fileUri);
                    // Apply bounds checking
                    lineNumber = Math.min(lineNumber, document.lineCount - 1);
                    const line = document.lineAt(lineNumber);
                    startColumn = Math.min(startColumn, line.text.length);
                    // Calculate smart end column like regular analysis
                    const lineText = line.text;
                    if (startColumn < lineText.length) {
                        endColumn = startColumn;
                        // Find end of current word/token
                        while (endColumn < lineText.length && /[\w]/.test(lineText[endColumn])) {
                            endColumn++;
                        }
                        // If no word found, highlight at least 5 characters or until end of line
                        if (endColumn === startColumn) {
                            endColumn = Math.min(startColumn + 5, lineText.length);
                        }
                    }
                    else {
                        // If column is at end of line, highlight some characters back
                        endColumn = lineText.length;
                        startColumn = Math.max(0, endColumn - 5);
                    }
                }
                catch (error) {
                    console.warn(`Could not open document for bounds checking: ${fileName}`);
                    // Use defaults if document can't be opened
                }
                const range = new vscode.Range(lineNumber, startColumn, lineNumber, endColumn);
                console.log(`Cross-file diagnostic: ${fileName} Line ${lineNumber + 1} (converted from ${issue.line}), Col ${startColumn}-${endColumn}, Message: ${issue.message.substring(0, 50)}...`);
                const diagnostic = new vscode.Diagnostic(range, `[Cross-File] ${issue.message}`, issue.severity);
                diagnostic.source = 'Yoda Code Mentor';
                diagnostic.code = 'cross-file';
                return diagnostic;
            }));
            // Merge with existing diagnostics
            const existingDiagnostics = this.diagnosticCollection.get(fileUri) || [];
            const nonCrossFileDiagnostics = existingDiagnostics.filter(d => !d.message.includes('[Cross-File]'));
            this.diagnosticCollection.set(fileUri, [...nonCrossFileDiagnostics, ...diagnostics]);
        }
    }
    showSSLHelpDialog() {
        const helpMessage = `🔒 SSL Certificate Issues with GigaChat

This error occurs because GigaChat uses Russian SSL certificates that may not be trusted by your system.

SOLUTIONS:

1. 🔧 AUTOMATIC FIX (Recommended):
   • Click "Fix SSL Issues" to automatically ignore SSL errors
   • This is safe for GigaChat connections

2. ⚙️ MANUAL FIX:
   • Open VS Code Settings (Ctrl+,)
   • Search for "Yoda SSL"
   • Enable "Ignore SSL Errors"

3. 🛡️ ADVANCED (If security is critical):
   • Install Russian SSL certificates manually
   • Contact your system administrator

The automatic fix is recommended and commonly used for GigaChat connections.`;
        vscode.window.showInformationMessage(helpMessage, { modal: true }, 'Fix Automatically', 'Open Settings', 'Close').then(async (selection) => {
            if (selection === 'Fix Automatically') {
                const config = vscode.workspace.getConfiguration('yoda');
                await config.update('gigachat.ignoreSSLErrors', true, vscode.ConfigurationTarget.Global);
                vscode.window.showInformationMessage('✅ SSL errors are now ignored. Restarting Yoda...');
                await this.initializeGigaChat();
            }
            else if (selection === 'Open Settings') {
                vscode.commands.executeCommand('workbench.action.openSettings', 'yoda.gigachat.ignoreSSLErrors');
            }
        });
    }
    getSelectedModel() {
        const config = vscode.workspace.getConfiguration('yoda');
        const model = config.get('gigachat.model');
        console.log('Getting selected model - raw config value:', model);
        console.log('Configuration inspect:', config.inspect('gigachat.model'));
        // Fallback to extension state if config fails
        if (!model || model === 'GigaChat:latest') {
            const savedModel = this.context.globalState.get('yoda.selectedModel');
            if (savedModel) {
                console.log('Using model from extension state:', savedModel);
                return savedModel;
            }
        }
        return model || 'GigaChat:latest';
    }
    async selectGigaChatModel() {
        if (!this.gigaChat) {
            vscode.window.showErrorMessage('🤖 GigaChat not initialized. Please configure your API key first.');
            return;
        }
        try {
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: 'Loading available models...',
                cancellable: false
            }, async (progress) => {
                // First refresh the models list
                await this.refreshAvailableModels(true);
                const config = vscode.workspace.getConfiguration('yoda');
                const availableModels = config.get('gigachat.availableModels') || ['GigaChat:latest'];
                const currentModel = this.getSelectedModel(); // Use the same method to get current model
                console.log('Current model from config:', currentModel);
                console.log('Available models:', availableModels);
                const selectedModel = await vscode.window.showQuickPick(availableModels.map(model => ({
                    label: model === currentModel ? `$(check) ${model}` : model,
                    description: model === currentModel ? 'Currently selected' : '',
                    detail: this.getModelDescription(model),
                    value: model
                })), {
                    placeHolder: `🤖 Select a GigaChat model (current: ${currentModel})`,
                    title: 'GigaChat Model Selection'
                });
                if (selectedModel) {
                    console.log('Updating model to:', selectedModel.value);
                    console.log('Configuration section:', config);
                    console.log('Available configuration keys:', Object.keys(config));
                    let success = false;
                    let scope = '';
                    let lastError = null;
                    // Try different configuration targets until one works
                    const targets = [
                        { target: vscode.ConfigurationTarget.Global, name: 'Global' },
                        { target: vscode.ConfigurationTarget.Workspace, name: 'Workspace' }
                    ];
                    for (const { target, name } of targets) {
                        try {
                            console.log(`Attempting to save to ${name} scope...`);
                            // Get fresh config each time
                            const freshConfig = vscode.workspace.getConfiguration('yoda');
                            await freshConfig.update('gigachat.model', selectedModel.value, target);
                            // Wait longer and then verify the setting was saved
                            await new Promise(resolve => setTimeout(resolve, 500));
                            // Get completely fresh config to check
                            const verifyConfig = vscode.workspace.getConfiguration('yoda');
                            const updatedModel = verifyConfig.get('gigachat.model');
                            console.log(`Tried ${name} scope - model after update:`, updatedModel);
                            console.log(`Expected: ${selectedModel.value}, Got: ${updatedModel}`);
                            if (updatedModel === selectedModel.value) {
                                success = true;
                                scope = name;
                                console.log(`✅ Successfully saved to ${name} scope`);
                                break;
                            }
                            else {
                                console.log(`❌ ${name} scope didn't save correctly`);
                            }
                        }
                        catch (error) {
                            console.error(`Failed to save to ${name} scope:`, error);
                            lastError = error;
                        }
                    }
                    if (success) {
                        // Also save to extension state as backup
                        await this.context.globalState.update('yoda.selectedModel', selectedModel.value);
                        vscode.window.showInformationMessage(`✅ GigaChat model updated to: ${selectedModel.value} (${scope} scope)`);
                    }
                    else {
                        // Try fallback to extension state
                        try {
                            await this.context.globalState.update('yoda.selectedModel', selectedModel.value);
                            vscode.window.showInformationMessage(`✅ GigaChat model saved to extension state: ${selectedModel.value} (backup method)`);
                            success = true;
                        }
                        catch (stateError) {
                            console.error('Failed to save to extension state:', stateError);
                        }
                    }
                    if (!success) {
                        console.error('All configuration targets failed. Last error:', lastError);
                        // Show detailed error with manual instructions
                        const errorMsg = lastError instanceof Error ? lastError.message : String(lastError);
                        const result = await vscode.window.showErrorMessage(`❌ Failed to save model selection automatically.`, { modal: true, detail: `Error: ${errorMsg}\n\nWould you like to open VS Code settings to set it manually?` }, 'Open Settings', 'Copy Setting', 'Try Again');
                        switch (result) {
                            case 'Open Settings':
                                vscode.commands.executeCommand('workbench.action.openSettings', 'yoda.gigachat.model');
                                break;
                            case 'Copy Setting':
                                const settingJson = `"yoda.gigachat.model": "${selectedModel.value}"`;
                                await vscode.env.clipboard.writeText(settingJson);
                                vscode.window.showInformationMessage('Setting copied to clipboard! Paste it in your settings.json');
                                break;
                            case 'Try Again':
                                await this.selectGigaChatModel();
                                break;
                        }
                    }
                }
            });
        }
        catch (error) {
            console.error('Model selection failed:', error);
            vscode.window.showErrorMessage(`❌ Failed to load models: ${error}`);
        }
    }
    async refreshAvailableModels(silent = false) {
        if (!this.gigaChat) {
            if (!silent) {
                vscode.window.showErrorMessage('🤖 GigaChat not initialized. Please configure your API key first.');
            }
            return;
        }
        try {
            if (!silent) {
                vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    title: 'Refreshing available models...',
                    cancellable: false
                }, async (progress) => {
                    await this.fetchAndUpdateModels();
                });
            }
            else {
                await this.fetchAndUpdateModels();
            }
        }
        catch (error) {
            console.error('Failed to refresh models:', error);
            if (!silent) {
                vscode.window.showErrorMessage(`❌ Failed to refresh models: ${error}`);
            }
        }
    }
    async fetchAndUpdateModels() {
        try {
            // Try to get models from GigaChat API
            // Note: The actual API method might be different, adjust as needed
            const response = await this.gigaChat.completion({
                model: 'GigaChat:latest',
                messages: [{
                        role: 'user',
                        content: 'List available models'
                    }]
            });
            // Fallback to default models since GigaChat might not have a models endpoint
            const defaultModels = [
                'GigaChat:latest',
                'GigaChat-Pro',
                'GigaChat-Plus',
                'GigaChat-Max'
            ];
            const config = vscode.workspace.getConfiguration('yoda');
            await config.update('gigachat.availableModels', defaultModels, vscode.ConfigurationTarget.Global);
            console.log('Available models updated:', defaultModels);
        }
        catch (error) {
            console.error('Failed to fetch models from API, using defaults:', error);
            // Fallback to default models
            const defaultModels = [
                'GigaChat:latest',
                'GigaChat-Pro',
                'GigaChat-Plus'
            ];
            const config = vscode.workspace.getConfiguration('yoda');
            await config.update('gigachat.availableModels', defaultModels, vscode.ConfigurationTarget.Global);
        }
    }
    getModelDescription(model) {
        const descriptions = {
            'GigaChat:latest': 'Latest stable version - recommended for most use cases',
            'GigaChat-Pro': 'Enhanced model with improved reasoning capabilities',
            'GigaChat-Plus': 'Advanced model with extended context and better code understanding',
            'GigaChat-Max': 'Most powerful model with maximum capabilities'
        };
        return descriptions[model] || 'GigaChat model for code analysis';
    }
    async showCurrentModel() {
        const config = vscode.workspace.getConfiguration('yoda');
        const currentModel = this.getSelectedModel();
        const availableModels = config.get('gigachat.availableModels') || ['GigaChat:latest'];
        const configInspect = config.inspect('gigachat.model');
        const details = [
            `🤖 **Current Model**: ${currentModel}`,
            ``,
            `📋 **Available Models**: ${availableModels.join(', ')}`,
            ``,
            `🔧 **Configuration Details**:`,
            `- Default: ${configInspect?.defaultValue || 'Not set'}`,
            `- Global: ${configInspect?.globalValue || 'Not set'}`,
            `- Workspace: ${configInspect?.workspaceValue || 'Not set'}`,
            `- Folder: ${configInspect?.workspaceFolderValue || 'Not set'}`,
            ``,
            `💡 **Need to change model?** Use "Yoda: Select GigaChat Model" command.`
        ].join('\n');
        await vscode.window.showInformationMessage(`Current GigaChat Model: ${currentModel}`, { modal: false, detail: 'Click "Show Details" for configuration info' }, 'Show Details', 'Select Different Model', 'Refresh Models').then(async (selection) => {
            switch (selection) {
                case 'Show Details':
                    const doc = await vscode.workspace.openTextDocument({
                        content: details,
                        language: 'markdown'
                    });
                    await vscode.window.showTextDocument(doc);
                    break;
                case 'Select Different Model':
                    await this.selectGigaChatModel();
                    break;
                case 'Refresh Models':
                    await this.refreshAvailableModels();
                    break;
            }
        });
    }
    dispose() {
        this.diagnosticCollection.dispose();
        this.statusBarItem.dispose();
    }
}
function activate(context) {
    console.log('Yoda Code Mentor is now active!');
    const yoda = new YodaCodeMentor(context);
    // Check if this is first time setup
    const config = vscode.workspace.getConfiguration('yoda');
    const isSetupCompleted = config.get('setup.completed');
    const hasApiKey = config.get('gigachat.apiKey');
    if (!isSetupCompleted || !hasApiKey) {
        // First time setup
        vscode.window.showInformationMessage('🧙‍♂️ Welcome to Yoda - Python Code Mentor! Ready to improve your Python code?', 'Setup Wizard', 'Configure API Key', 'Later').then(selection => {
            switch (selection) {
                case 'Setup Wizard':
                    vscode.commands.executeCommand('yoda.showSetupWizard');
                    break;
                case 'Configure API Key':
                    vscode.commands.executeCommand('yoda.configureApiKey');
                    break;
            }
        });
    }
    else {
        // Extension is already configured
        vscode.window.showInformationMessage('🚀 Yoda is ready to analyze your code in multiple languages!', 'Analyze Current File', 'Analyze Workspace', 'Cross-File Analysis').then(selection => {
            switch (selection) {
                case 'Analyze Current File':
                    vscode.commands.executeCommand('yoda.analyzeFile');
                    break;
                case 'Analyze Workspace':
                    vscode.commands.executeCommand('yoda.analyzeWorkspace');
                    break;
                case 'Cross-File Analysis':
                    vscode.commands.executeCommand('yoda.analyzeCrossFile');
                    break;
            }
        });
    }
    context.subscriptions.push(yoda);
}
exports.activate = activate;
function deactivate() {
    console.log('Yoda Code Mentor is now deactivated');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map