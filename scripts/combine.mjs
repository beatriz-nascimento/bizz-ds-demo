import { cpSync, mkdirSync, copyFileSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root  = resolve(__dirname, '..');
const out   = resolve(root, 'dist/public');

mkdirSync(join(out, 'react'),   { recursive: true });
mkdirSync(join(out, 'angular'), { recursive: true });

// Vanilla -> root project
const vanillaDir = resolve(root, 'apps/vanilla');
cpSync(vanillaDir, out, { recursive: true });
console.log('✓ Vanilla  →  dist/public/');

//  React -> /react
const reactBuild = resolve(root, 'dist/apps/react-demo');
if (!existsSync(reactBuild)) {
  console.error('✗ React build not found at', reactBuild);
  process.exit(1);
}
cpSync(reactBuild, join(out, 'react'), { recursive: true });
copyFileSync(join(out, 'react', 'index.html'), join(out, 'react', '404.html'));
console.log('✓ React    →  dist/public/react/');

// Angular -> /angular
// Angular outputs to dist/apps/angular-demo/browser
const angularBuildBrowser = resolve(root, 'dist/apps/angular-demo/browser');
const angularBuildFlat    = resolve(root, 'dist/apps/angular-demo');
const angularBuild = existsSync(angularBuildBrowser) ? angularBuildBrowser : angularBuildFlat;

if (!existsSync(angularBuild)) {
  console.error('✗ Angular build not found at', angularBuildFlat);
  process.exit(1);
}
cpSync(angularBuild, join(out, 'angular'), { recursive: true });
copyFileSync(join(out, 'angular', 'index.html'), join(out, 'angular', '404.html'));
console.log('✓ Angular  →  dist/public/angular/');
