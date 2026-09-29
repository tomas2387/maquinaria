/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
module.exports = {
  testRunner: 'jest',
  reporters: ['clear-text', 'progress'],
  packageManager: 'npm',
  coverageAnalysis: 'off',
  buildCommand: 'npm run build',
  tempDirName: 'stryker-tmp',
  mutate: ['maquinaria.js'],
  jest: { enableFindRelatedTests: false },
};
