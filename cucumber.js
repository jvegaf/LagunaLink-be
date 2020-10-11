let common = [
  'tests/app/features/**/*.feature', // Specify our feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require tests/app/features/step_definitions/*.steps.ts', // Load step definitions
  '--format node_modules/cucumber-pretty' // Load custom formatter
].join(' ');

module.exports = {
  default: common
};
