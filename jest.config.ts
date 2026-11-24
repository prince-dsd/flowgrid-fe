/** @jest-config-loader ts-node */
/** @jest-config-loader-options {"module": "CommonJS"} */
import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
          target: 'es2022',
        },
        module: {
          type: 'commonjs',
        },
      },
    ],
  },
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/test/styleMock.cjs',
    '\\.(svg|png|jpe?g|gif|webp)$': '<rootDir>/test/fileMock.cjs',
  },
}

export default config
