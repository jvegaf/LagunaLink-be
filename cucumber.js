let common = [
  'tests/app/features/**/*.feature', // Specify our feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require tests/app/features/step_definitions/*.steps.ts', // Load step definitions
].join(' ');

module.exports = {
  default: common
};
