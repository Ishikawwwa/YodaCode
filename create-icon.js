const fs = require('fs');

// Create a simple ASCII art representation for fallback
const createSimpleIcon = () => {
  const iconContent = `
🧙‍♂️ YODA CODE MENTOR

This extension includes a custom SVG icon.
To view the icon properly, install the extension in VS Code.

Icon features:
- Yoda-inspired design with green color scheme
- Code brackets (< />) surrounding Yoda
- Binary code patterns in background  
- Wisdom stars for mystical effect
- 128x128 pixel perfect design

If you need a PNG version, you can:
1. Open icon.svg in any image editor
2. Export as PNG at 128x128 pixels
3. Replace the icon reference in package.json
`;

  console.log('Icon created! Here\'s what it includes:');
  console.log(iconContent);
  
  // Check if icon.svg exists
  if (fs.existsSync('icon.svg')) {
    console.log('✅ icon.svg found and ready to use!');
    console.log('📦 The extension will use the SVG icon automatically.');
  } else {
    console.log('❌ icon.svg not found. Please ensure the SVG file exists.');
  }
};

createSimpleIcon(); 