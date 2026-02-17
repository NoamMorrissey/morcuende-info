#!/usr/bin/env node

/**
 * Token Engine — Reads W3C DTCG JSON tokens and generates SCSS settings files.
 * Usage: node token-engine/build.js
 */

const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '..', 'tokens');
const OUTPUT_DIR = path.join(__dirname, '..', 'scss', '1-settings');
const HEADER = '// GENERATED FILE — DO NOT EDIT MANUALLY.\n// Source of truth: tokens/*.json\n// Regenerate with: npm run tokens\n';

// ---------------------------------------------------------------------------
// 1. Read all JSON token files
// ---------------------------------------------------------------------------

function readJSON(filename) {
  return JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, filename), 'utf8'));
}

const optionsTokens = readJSON('options.json');
const colorsTokens = readJSON('colors.json');
const breakpointsTokens = readJSON('breakpoints.json');
const typographyTokens = readJSON('typography.json');

// ---------------------------------------------------------------------------
// 2. Build a flat dictionary of all tokens for reference resolution
// ---------------------------------------------------------------------------

function flattenTokens(obj, prefix = '', dict = {}) {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue; // skip $type, $value, $description
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && '$value' in value) {
      dict[path] = value['$value'];
    } else if (value && typeof value === 'object') {
      flattenTokens(value, path, dict);
    }
  }
  return dict;
}

const allTokens = {};
flattenTokens(optionsTokens, '', allTokens);
flattenTokens(colorsTokens, '', allTokens);
flattenTokens(breakpointsTokens, '', allTokens);
// Typography references point to opt.* tokens, no need to flatten typography itself

// ---------------------------------------------------------------------------
// 3. Resolve DTCG references {token.path} → final values
// ---------------------------------------------------------------------------

function resolveRef(value) {
  if (typeof value === 'string') {
    return value.replace(/\{([^}]+)\}/g, (_, refPath) => {
      if (refPath in allTokens) return allTokens[refPath];
      throw new Error(`Unresolved token reference: {${refPath}}`);
    });
  }
  return value;
}

// ---------------------------------------------------------------------------
// 4. SCSS formatting helpers
// ---------------------------------------------------------------------------

function formatScssValue(value, type) {
  if (Array.isArray(value)) {
    // cubicBezier arrays → cubic-bezier(a, b, c, d)
    return `cubic-bezier(${value.join(', ')})`;
  }
  if (typeof value === 'number') {
    return String(value);
  }
  if (typeof value === 'string') {
    // Pure numbers (e.g. resolved font-weight "900") → unquoted
    if (/^-?\d+(\.\d+)?$/.test(value)) return value;
    // Values with units or hex colors → unquoted
    if (/^-?\d+(\.\d+)?(px|em|rem|ms|s|%|vw|vh)$/.test(value)) return value;
    if (/^#[0-9A-Fa-f]{3,8}$/.test(value)) return value;
    if (/^0(px|em|rem|ms|s|%)$/.test(value)) return value;
    // Percentage values like "80%"
    if (/^\d+%$/.test(value)) return value;
    // Font family names and other strings → quoted
    return `'${value}'`;
  }
  return String(value);
}

function indent(level) {
  return '    '.repeat(level);
}

// Extract token entries from a group (skipping $type, $description, etc.)
function getTokenEntries(group) {
  return Object.entries(group).filter(([k]) => !k.startsWith('$'));
}

// Build a SCSS map string from token entries
function buildScssMap(group, level = 1) {
  const entries = getTokenEntries(group);
  const parentType = group['$type'];
  const lines = entries.map(([key, token]) => {
    const value = resolveRef(token['$value']);
    const type = token['$type'] || parentType;
    const formattedKey = /^\d/.test(key) ? key : key;
    return `${indent(level)}${formattedKey}: ${formatScssValue(value, type)}`;
  });
  return `(\n${lines.join(',\n')}\n)`;
}

// Build a nested SCSS map (like colors)
function buildNestedScssMap(group, level = 1) {
  const entries = getTokenEntries(group);
  const lines = entries.map(([categoryKey, categoryGroup]) => {
    const innerEntries = getTokenEntries(categoryGroup);
    const parentType = categoryGroup['$type'];
    const innerLines = innerEntries.map(([key, token]) => {
      const value = resolveRef(token['$value']);
      const type = token['$type'] || parentType;
      return `${indent(level + 1)}'${key}': ${formatScssValue(value, type)}`;
    });
    return `${indent(level)}'${categoryKey}': (\n${innerLines.join(',\n')}\n${indent(level)})`;
  });
  return `(\n${lines.join(',\n\n')}\n)`;
}

// ---------------------------------------------------------------------------
// 5. Generate _options.scss
// ---------------------------------------------------------------------------

function generateOptions() {
  const opt = optionsTokens.opt;
  let scss = HEADER + '\n';

  // $opt-base-size
  scss += `$opt-base-size: ${resolveRef(opt['base-size']['$value'])};\n\n`;

  // $opt-stroke
  scss += `$opt-stroke: ${buildScssMap(opt.stroke)};\n\n`;

  // $opt-elevation (was duplicated as $opt-stroke — bug fix)
  scss += `$opt-elevation: ${buildScssMap(opt.elevation)};\n\n`;

  // $opt-movement-duration
  scss += `$opt-movement-duration: ${buildScssMap(opt.movement.duration)};\n\n`;

  // $opt-movement-easing
  scss += `$opt-movement-easing: ${buildScssMap(opt.movement.easing)};\n\n`;

  // $opt-ratio
  scss += `$opt-ratio: ${buildScssMap(opt.ratio)};\n\n`;

  // $opt-radius
  scss += `$opt-radius: ${buildScssMap(opt.radius)};\n\n`;

  // $opt-dimensions
  scss += `$opt-dimensions: ${buildScssMap(opt.dimensions)};\n\n`;

  // $opt-font-families
  scss += `$opt-font-families: ${buildScssMap(opt.font.families)};\n\n`;

  // $opt-font-weights
  scss += `$opt-font-weights: ${buildScssMap(opt.font.weights)};\n\n`;

  // $opt-font-sizes
  scss += `$opt-font-sizes: ${buildScssMap(opt.font.sizes)};\n\n`;

  // $opt-font-spacing
  scss += `$opt-font-spacing: ${buildScssMap(opt.font.spacing)};\n\n`;

  // $opt-icon-sizes
  scss += `$opt-icon-sizes: ${buildScssMap(opt['icon-sizes'])};\n`;

  return scss;
}

// ---------------------------------------------------------------------------
// 6. Generate _opt-colors.scss
// ---------------------------------------------------------------------------

function generateColors() {
  const opt = colorsTokens.opt;
  let scss = HEADER + '\n';

  // $opt-colors (nested map)
  scss += `$opt-colors: ${buildNestedScssMap(opt.colors)};\n\n`;

  // $opacity-levels
  scss += `$opacity-levels: ${buildScssMap(opt['opacity-levels'])};\n`;

  return scss;
}

// ---------------------------------------------------------------------------
// 7. Generate _opt-breakpoints.scss
// ---------------------------------------------------------------------------

function generateBreakpoints() {
  const opt = breakpointsTokens.opt;
  let scss = HEADER + '\n';

  scss += `$opt-breakpoints: ${buildScssMap(opt.breakpoints)};\n\n`;
  scss += `$opt-columns: ${buildScssMap(opt.columns)};\n\n`;
  scss += `$opt-gutters: ${buildScssMap(opt.gutters)};\n`;

  return scss;
}

// ---------------------------------------------------------------------------
// 8. Generate _opt-typography.scss
// ---------------------------------------------------------------------------

function generateTypography() {
  const typo = typographyTokens.typography;
  let scss = HEADER + '\n';

  const breakpoints = ['mobile', 'tablet', 'laptop', 'desktop'];
  const varNames = {
    mobile: '$typography-mobile-styles',
    tablet: '$typography-tablet-styles',
    laptop: '$typography-laptop-styles',
    desktop: '$typography-desktop-styles',
  };

  // SCSS property name mapping from DTCG camelCase
  const propMap = {
    fontFamily: 'font-family',
    fontSize: 'font-size',
    lineHeight: 'line-height',
    fontWeight: 'font-weight',
    letterSpacing: 'letter-spacing',
  };

  for (const bp of breakpoints) {
    const styles = typo[bp];
    const entries = Object.entries(styles);

    const styleLines = entries.map(([styleName, token]) => {
      const value = token['$value'];
      const props = Object.entries(value).map(([dtcgProp, rawValue]) => {
        const scssProp = propMap[dtcgProp] || dtcgProp;
        const resolved = resolveRef(rawValue);
        const formatted = formatScssValue(resolved, dtcgProp === 'fontFamily' ? 'fontFamily' : null);
        return `${indent(2)}'${scssProp}': ${formatted}`;
      });
      return `${indent(1)}'${styleName}': (\n${props.join(',\n')}\n${indent(1)})`;
    });

    scss += `${varNames[bp]}: (\n${styleLines.join(',\n')}\n);\n`;

    // Add blank line between maps (but not after last)
    if (bp !== 'desktop') scss += '\n';
  }

  return scss;
}

// ---------------------------------------------------------------------------
// 9. Write all generated files
// ---------------------------------------------------------------------------

function writeFile(filename, content) {
  const filePath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✓ ${filename}`);
}

console.log('Token Engine: Generating SCSS from design tokens...\n');

writeFile('_options.scss', generateOptions());
writeFile('_opt-colors.scss', generateColors());
writeFile('_opt-breakpoints.scss', generateBreakpoints());
writeFile('_opt-typography.scss', generateTypography());

console.log('\nDone! SCSS settings generated from tokens/.\n');
