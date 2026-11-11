/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
module.exports = {
  testRunner: 'jest',
  reporters: [
    'clear-text',
    'progress',
    'html',
    // Only CI pushes to master provide the key; it feeds the README badge.
    ...(process.env.STRYKER_DASHBOARD_API_KEY ? ['dashboard'] : []),
  ],
  dashboard: { reportType: 'full' },
  packageManager: 'npm',
  // Tests run against the built bundle, so per-test coverage is not available.
  coverageAnalysis: 'off',
  buildCommand: 'npm run build',
  tempDirName: 'stryker-tmp',
  mutate: ['maquinaria.js'],
  jest: { enableFindRelatedTests: false },
  thresholds: { high: 100, low: 100, break: 100 },
};
