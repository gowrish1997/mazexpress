const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  //  preset:'babel-jest',
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!nanoid)"],
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',

  modulePaths: ['<rootDir>/'],
  "transform": {
    '^.+\\.(t|j)sx?$': "<rootDir>/node_modules/babel-jest"
  },
  moduleNameMapper: {
   
     
  
    '^@/components(.*)$': '<rootDir>/components$1',
    '^@/pages(.*)$': '<rootDir>/pages$1',
  

    '^@/styles(.*)$': '<rootDir>/styles$1',
    '^@/contexts(.*)$': '<rootDir>/contexts$1',
    '^@/lib(.*)$': '<rootDir>/lib$1',
  
    '^@/models(.*)$': '<rootDir>/models$1',
    '^@/assets(.*)$': '<rootDir>/assets$1'
    // '\\.(scss|sass|css)$': 'identity-obj-proxy'
}

}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)