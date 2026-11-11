# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-11-11

### Added
- TypeScript types (`maquinaria.d.ts`)
- `"sideEffects": false`, so bundlers can drop maquinaria when it is not used

### Fixed
- README: actions receive the arguments of `transition` as a single array

### Changed
- README: TypeScript section, and Types, Bundle size and License badges instead of the install size badge

## [1.0.1] - 2026-11-11

No changes to the public API.

### Changed
- Rebuild the bundles with Rollup 4 and @rollup/plugin-terser
- Publish only `dist/`, without scripts and devDependencies
- Publish with npm Trusted Publishing (OIDC) and provenance
- Migrate tests from Jest to Vitest and CI from Travis to GitHub Actions

## [1.0.0] - 2019-07-14

- First stable release
