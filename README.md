# CSS Clamp

Generate fluid CSS `clamp()` values for typography and spacing, with a live preview at any screen width. Output as plain CSS or Tailwind CSS.

**[cssclamp.com](https://cssclamp.com)**

## Tools

- [Clamp generator](https://cssclamp.com): font sizes, padding, margin and gaps
- [Fluid type scale generator](https://cssclamp.com/fluid-type-scale-generator): a whole type scale from one base size and ratio
- [Tailwind CSS clamp generator](https://cssclamp.com/tailwind-clamp-generator): `@theme` tokens, `tailwind.config.js` entries or arbitrary value classes
- [Line height](https://cssclamp.com/line-height-clamp-generator), [gap](https://cssclamp.com/gap-clamp-generator) and [border radius](https://cssclamp.com/border-radius-clamp-generator) generators
- [px to rem converter](https://cssclamp.com/px-to-rem-converter)

Guides on [how clamp() works](https://cssclamp.com/guide), [the maths behind it](https://cssclamp.com/deepdive), [Tailwind CSS](https://cssclamp.com/tailwind), [accessibility](https://cssclamp.com/fluid-typography-accessibility) and more are on the site.

## Agent skill

The `css-clamp` skill teaches AI coding agents to generate correct, accessible `clamp()` values. It ships with a script that does the maths, so the agent never works out slopes by hand.

Install it for Claude Code, Codex, Cursor and other agents with the [skills CLI](https://skills.sh):

```bash
npx skills add Willem-Jaap/cssclamp
```

Or install it as a Claude Code plugin:

```
/plugin marketplace add Willem-Jaap/cssclamp
/plugin install css-clamp@cssclamp
```

Then ask your agent for things like "make the h1 fluid from 36px to 64px" or "give me a fluid type scale in Tailwind". The skill lives in [`skills/css-clamp`](skills/css-clamp/SKILL.md).

## Development

```bash
pnpm install
pnpm dev
```

Built with Next.js, React and Tailwind CSS.

## License

[MIT](LICENSE)
