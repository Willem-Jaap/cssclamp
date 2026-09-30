#!/usr/bin/env node
// Generates a fluid CSS clamp() value that grows linearly between two viewport widths.
//
// Usage:
//   node clamp.mjs <minSize> <maxSize> [minViewport] [maxViewport] [--unit vw|cqi] [--root 16]
//
// Sizes and viewports accept px or rem (e.g. 16, 16px, 1rem). Bare numbers are px.
// Defaults: minViewport 360px, maxViewport 1440px, unit vw, root font size 16px.
//
// Example:
//   node clamp.mjs 16px 64px 320px 1440px
//   → clamp(1rem, 0.143rem + 4.286vw, 4rem)

const args = process.argv.slice(2);
const flags = {};
const positional = [];

for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
        flags[args[i].slice(2)] = args[i + 1];
        i++;
    } else {
        positional.push(args[i]);
    }
}

const root = Number(flags.root ?? 16);
const unit = flags.unit ?? 'vw';

if (!['vw', 'cqi', 'cqw'].includes(unit)) {
    console.error(`Unsupported unit "${unit}". Use vw, cqi or cqw.`);
    process.exit(1);
}

const toPx = value => {
    const match = /^(-?\d*\.?\d+)(px|rem)?$/.exec(String(value).trim());
    if (!match) {
        console.error(
            `Could not parse "${value}". Use a number with px or rem, e.g. 16px or 1rem.`,
        );
        process.exit(1);
    }
    return match[2] === 'rem' ? Number(match[1]) * root : Number(match[1]);
};

if (positional.length < 2) {
    console.error(
        'Usage: node clamp.mjs <minSize> <maxSize> [minViewport] [maxViewport] [--unit vw|cqi] [--root 16]',
    );
    process.exit(1);
}

const [minSize, maxSize, minViewport, maxViewport] = [
    positional[0],
    positional[1],
    positional[2] ?? '360',
    positional[3] ?? '1440',
].map(toPx);

if (maxViewport <= minViewport) {
    console.error('maxViewport must be larger than minViewport.');
    process.exit(1);
}

const round = value => parseFloat(value.toFixed(3));
const rem = px => `${round(px / root)}rem`;

const slope = (maxSize - minSize) / (maxViewport - minViewport);
const intercept = minSize - slope * minViewport;
const lower = Math.min(minSize, maxSize);
const upper = Math.max(minSize, maxSize);

const vw = round(slope * 100);
const operator = vw < 0 ? '-' : '+';

console.log(
    `clamp(${rem(lower)}, ${rem(intercept)} ${operator} ${Math.abs(vw)}${unit}, ${rem(upper)})`,
);
