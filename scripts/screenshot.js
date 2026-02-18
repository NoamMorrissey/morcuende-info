/**
 * Visual Regression Screenshot Script
 *
 * Takes screenshots of all Storybook stories at each breakpoint viewport.
 * Uses Playwright (Chromium) to render stories in isolation via iframe URL.
 *
 * Usage:
 *   node scripts/screenshot.js              — capture "actual" screenshots
 *   node scripts/screenshot.js --baseline   — capture "expected" (baseline) screenshots
 *
 * Requires Storybook running on localhost:6006.
 */

import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// --- Config -----------------------------------------------------------

const STORYBOOK_URL = 'http://localhost:6006';

const VIEWPORTS = {
  mobile:  { width: 480,  height: 896 },
  tablet:  { width: 768,  height: 1024 },
  laptop:  { width: 1024, height: 768 },
  desktop: { width: 1366, height: 900 },
  wide:    { width: 1920, height: 1080 },
};

const THEMES = ['light', 'dark'];

const isBaseline = process.argv.includes('--baseline');
const outDir = isBaseline ? 'screenshots/expected' : 'screenshots/actual';

// --- Helpers ----------------------------------------------------------

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function sanitize(str) {
  return str.replace(/[^a-zA-Z0-9_-]/g, '_');
}

// --- Main -------------------------------------------------------------

async function run() {
  // 1. Fetch story index from Storybook
  let index;
  try {
    const res = await fetch(`${STORYBOOK_URL}/index.json`);
    index = await res.json();
  } catch {
    console.error(
      '\n  Storybook no esta corriendo en localhost:6006.\n' +
      '  Ejecuta primero: npm run storybook\n'
    );
    process.exit(1);
  }

  // 2. Filter only story entries (skip docs)
  const stories = Object.values(index.entries).filter(
    (e) => e.type === 'story'
  );

  console.log(`\n  Stories encontradas: ${stories.length}`);
  console.log(`  Viewports: ${Object.keys(VIEWPORTS).join(', ')}`);
  console.log(`  Temas: ${THEMES.join(', ')}`);
  console.log(`  Destino: ${outDir}/`);
  console.log(`  Total capturas: ${stories.length * Object.keys(VIEWPORTS).length * THEMES.length}\n`);

  // 3. Launch browser
  const browser = await chromium.launch();

  for (const [vpName, vpSize] of Object.entries(VIEWPORTS)) {
    for (const theme of THEMES) {
      const context = await browser.newContext({
        viewport: vpSize,
        colorScheme: theme === 'dark' ? 'dark' : 'light',
      });
      const page = await context.newPage();

      for (const story of stories) {
        const storyUrl = `${STORYBOOK_URL}/iframe.html?id=${story.id}&viewMode=story`;
        const fileName = `${sanitize(story.id)}__${vpName}__${theme}.png`;
        const filePath = join(ROOT, outDir, fileName);
        ensureDir(dirname(filePath));

        try {
          await page.goto(storyUrl, { waitUntil: 'networkidle', timeout: 15000 });
          await page.waitForTimeout(500);
          await page.screenshot({ path: filePath, fullPage: true });
          console.log(`  ✓ ${story.title} / ${story.name} [${vpName}] [${theme}]`);
        } catch (err) {
          console.log(`  ✗ ${story.title} / ${story.name} [${vpName}] [${theme}] — ${err.message}`);
        }
      }

      await context.close();
    }
  }

  await browser.close();

  console.log(`\n  Screenshots guardadas en: ${outDir}/\n`);
}

run();
