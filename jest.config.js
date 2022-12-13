const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // テストで使用する next.config.js と .env ファイルの場所
  dir: './',
});

// Jest に渡すカスタム設定
const customJestConfig = {
  // 個々のテスト実行前に処理されるファイル
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);