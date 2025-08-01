const fs = require('fs');

// ASCII Art Yoda for the icon
const asciiYoda = [
  "    ░░░▒▒▒▒▒▒▒▒▒▒▒▒░░░",
  "  ░░▒▒▓▓████████▓▓▒▒░░",
  " ░▒▒▓███░░░░░░███▓▒▒░",
  "░▒▓▓██░░░░░░░░░██▓▓▒░",
  "▒▓▓██░░░▒▒▓▓▒▒░░██▓▓▒",
  "▓▓██░░▒▓▓▓▓▓▓▓▒░░██▓▓",
  "▓██░░▒▓▓██████▓▓▒░░██▓",
  "▓██░▒▓██░░░░░░██▓▒░██▓",
  "▓██░▓██░▓█░█▓░██▓░██▓",
  "▓██▒██░░░░░░░░░██▒██▓",
  " ▓██▒█░░░▒▒▒▒░░░█▒██▓",
  " ▓███░░░▒▓▓▓▓▒░░░███▓",
  "  ▓██░░░▒▒▒▒▒▒░░░██▓",
  "   ▓███░░░░░░░███▓",
  "    ▓████░░░████▓",
  "     ▓████████▓",
  "",
  "        YODA",
  "    CODE MENTOR"
];

// Create a simple icon description
console.log("🎨 ASCII Art Yoda Icon");
console.log("========================");
asciiYoda.forEach(line => console.log(line));
console.log("========================");

console.log("✅ ASCII art ready for PNG conversion!");
console.log("📝 To convert to PNG:");
console.log("1. Use online ASCII to image converter");
console.log("2. Or use image editing software");
console.log("3. Set size to 128x128 pixels");
console.log("4. Use green (#40ff40) text on black background");
console.log("5. Save as yoda-icon.png");

// Create a simple HTML file that can be screenshot
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            margin: 0;
            padding: 10px;
            background: black;
            color: #40ff40;
            font-family: 'Courier New', monospace;
            font-size: 8px;
            line-height: 8px;
            width: 128px;
            height: 128px;
            overflow: hidden;
        }
        .ascii-art {
            white-space: pre;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="ascii-art">${asciiYoda.join('\n')}</div>
</body>
</html>
`;

fs.writeFileSync('yoda-icon.html', htmlContent);
console.log("📄 Created yoda-icon.html - open in browser and screenshot at 128x128!");

// For now, let's create a placeholder PNG reference
console.log("🔄 Creating temporary icon...");

// Since we can't generate PNG directly, let's copy the existing icon for now
// and the user can replace it
if (fs.existsSync('icon.svg')) {
    console.log("📋 Using SVG as reference - you'll need to convert to PNG manually");
} 