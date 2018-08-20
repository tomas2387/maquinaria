module.exports = function(config) {
  config.set({
    testRunner: "mocha",
    mutator: "javascript",
    transpilers: [],
    reporters: ["clear-text", "progress"],
    packageManager: "npm",
    testFramework: "mocha",
    mochaOptions: { opts: './test/mocha.opts' },
    coverageAnalysis: "perTest",
    mutate: ["maquina.js"]
  });
};
