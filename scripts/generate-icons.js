const fs = require('fs');
const { execSync } = require('child_process');

// Simple SVG icon for metric.page — a ruler/calculator motif
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="108" fill="#0a84ff"/>
  <g fill="white">
    <!-- M letter stylized as metric ruler -->
    <text x="256" y="340" font-family="system-ui,-apple-system,sans-serif" font-size="280" font-weight="800" text-anchor="middle" fill="white">M</text>
    <!-- Ruler ticks at bottom -->
    <rect x="96" y="400" width="320" height="4" rx="2"/>
    <rect x="136" y="386" width="3" height="18" rx="1"/>
    <rect x="176" y="380" width="3" height="24" rx="1"/>
    <rect x="216" y="386" width="3" height="18" rx="1"/>
    <rect x="256" y="374" width="3" height="30" rx="1"/>
    <rect x="296" y="386" width="3" height="18" rx="1"/>
    <rect x="336" y="380" width="3" height="24" rx="1"/>
    <rect x="376" y="386" width="3" height="18" rx="1"/>
  </g>
</svg>`;

fs.writeFileSync('public/icon.svg', svg);

// Check if we have a tool to convert SVG to PNG
try {
  // Try using sips (macOS built-in) via a temp file approach
  // sips can't handle SVG, so we'll use the built-in qlmanage or just ship SVGs
  // Actually, let's check for common tools
  try {
    execSync('which convert', { stdio: 'pipe' });
    // ImageMagick available
    execSync('convert -background none -resize 192x192 public/icon.svg public/icon-192.png');
    execSync('convert -background none -resize 512x512 public/icon.svg public/icon-512.png');
    execSync('convert -background none -resize 180x180 public/icon.svg public/apple-touch-icon.png');
    execSync('convert -background none -resize 32x32 public/icon.svg public/favicon.ico');
    console.log('Generated all icons with ImageMagick');
  } catch {
    try {
      execSync('which rsvg-convert', { stdio: 'pipe' });
      execSync('rsvg-convert -w 192 -h 192 public/icon.svg > public/icon-192.png');
      execSync('rsvg-convert -w 512 -h 512 public/icon.svg > public/icon-512.png');
      execSync('rsvg-convert -w 180 -h 180 public/icon.svg > public/apple-touch-icon.png');
      execSync('rsvg-convert -w 32 -h 32 public/icon.svg > public/favicon.ico');
      console.log('Generated all icons with rsvg-convert');
    } catch {
      console.log('No SVG-to-PNG tool found. Using SVG-based icons in manifest instead.');
      console.log('Install ImageMagick (brew install imagemagick) to generate PNGs.');
      
      // Update manifest to use SVG
      const manifest = JSON.parse(fs.readFileSync('public/manifest.webmanifest', 'utf8'));
      manifest.icons = [
        { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }
      ];
      fs.writeFileSync('public/manifest.webmanifest', JSON.stringify(manifest, null, 2) + '\n');
      console.log('Updated manifest.webmanifest to use SVG icon');
    }
  }
} catch (e) {
  console.error('Error:', e.message);
}
