# Contributing to maquinaria

## Structure

```
maquinaria/
├── maquinaria.js        # source module
├── dist/                # minified UMD, CJS and ESM builds (generated, do not edit)
├── __test__/            # Jest tests (run against the built bundle)
├── rollup.config.mjs    # build configuration
├── stryker.conf.js      # mutation testing configuration
└── .github/workflows/   # CI, CodeQL, npm publish
```

## Scripts

- `npm run build` – builds the bundles with Rollup.
- `npm test` – formats with Prettier, builds, and runs Jest with coverage.
- `npm run mutation` – runs Stryker mutation testing on `maquinaria.js`. CI fails
  if any mutant survives, so every new behavior needs a test that pins it down.

## Releasing

Create a GitHub release. The publish workflow runs the tests, strips
`scripts`, `devDependencies` and `allowScripts` from the published
`package.json`, and stages the version with npm Trusted Publishing (OIDC), so
no npm token is stored in the repository. The version only becomes public
after a maintainer approves it with 2FA on npmjs.com or with
`npm stage approve <id>`.
