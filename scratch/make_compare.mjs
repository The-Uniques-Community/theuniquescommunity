import fs from 'fs';

const path1 = 'M 0 18 H 54 V 49 H 80 V 18 H 284 V 0 H 342 V 91 H 284 V 139 H 342 V 193 H 284 V 215 H 342 V 265 H 304 V 228 H 272 V 265 H 80 V 220 H 23 V 162 H 0 V 91 H 48 V 68 H 0 Z';
const path2 = 'M0 56V30C0 23.3726 5.37258 18 12 18H42C48.6274 18 54 23.3726 54 30V37C54 43.6274 59.3726 49 66 49H68C74.6274 49 80 43.6274 80 37V30C80 23.3726 85.3726 18 92 18H275C279.971 18 284 13.9706 284 9C284 4.02944 288.029 0 293 0H330C336.627 0 342 5.37258 342 12V79C342 85.6274 336.627 91 330 91H296C289.373 91 284 96.3726 284 103V167.5C284 169.985 286.015 172 288.5 172C290.985 172 293 169.985 293 167.5V151C293 144.373 298.373 139 305 139H330C336.627 139 342 144.373 342 151V181C342 187.627 336.627 193 330 193H304C297.925 193 293 197.925 293 204C293 210.075 297.925 215 304 215H330C336.627 215 342 220.373 342 227V253C342 259.627 336.627 265 330 265H305C298.373 265 293 259.627 293 253V232.5C293 230.015 290.985 228 288.5 228C286.015 228 284 230.015 284 232.5V253C284 259.627 278.627 265 272 265H92C85.3726 265 80 259.627 80 253V232C80 225.373 74.6274 220 68 220H35C28.3726 220 23 214.627 23 208V173.5C23 167.149 17.8513 162 11.5 162C5.14873 162 0 156.851 0 150.5V103C0 96.3726 5.37258 91 12 91H36.5C42.8513 91 48 85.8513 48 79.5C48 73.1487 42.8513 68 36.5 68H12C5.37258 68 0 62.6274 0 56Z';

const html = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; background: #f0f0f0; display: flex; gap: 30px; padding: 30px; font-family: sans-serif; }
    .box { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <div class="box">
    <h3>Original Sharp</h3>
    <svg width="342" height="265" viewBox="0 0 342 265" style="border: 1px solid #ddd">
      <defs>
        <clipPath id="clip1">
          <path d="${path1}" />
        </clipPath>
      </defs>
      <rect width="342" height="265" fill="#ca0019" clip-path="url(#clip1)" />
    </svg>
  </div>
  <div class="box">
    <h3>Ankur1 Rounded</h3>
    <svg width="342" height="265" viewBox="0 0 342 265" style="border: 1px solid #ddd">
      <defs>
        <clipPath id="clip2">
          <path d="${path2}" />
        </clipPath>
      </defs>
      <rect width="342" height="265" fill="#ca0019" clip-path="url(#clip2)" />
    </svg>
  </div>
</body>
</html>`;

fs.writeFileSync('c:/Users/hp/Desktop/uniques/theuniquescommunity/scratch/compare.html', html);
console.log('compare.html created');
