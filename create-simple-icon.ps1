# Simple PowerShell script to create a basic icon
Add-Type -AssemblyName System.Drawing

# Create a bitmap
$bitmap = New-Object System.Drawing.Bitmap(128, 128)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

# Set background to black
$graphics.Clear([System.Drawing.Color]::Black)

# Create green brush for text
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::LimeGreen)
$font = New-Object System.Drawing.Font("Courier New", 8, [System.Drawing.FontStyle]::Bold)

# Draw simple YODA text
$graphics.DrawString("YODA", $font, $brush, 35, 50)
$graphics.DrawString("CODE", $font, $brush, 35, 70)
$graphics.DrawString("MENTOR", $font, $brush, 25, 90)

# Save as PNG
$bitmap.Save("yoda-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

# Cleanup
$graphics.Dispose()
$bitmap.Dispose()

Write-Host "✅ Created yoda-icon.png!" 