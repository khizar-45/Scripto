import { defineConfig } from 'eslint/config'
import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'

export default defineConfig({
  root: true,
  ignorePatterns: ['**/node_modules', '**/dist', '**/out'],
  extends: [
    tseslint.configs.recommended,
    eslintPluginReact.configs.recommended,
    eslintPluginReact.configs['jsx-runtime'],
    eslintConfigPrettier
  ],
  plugins: {
    'react-hooks': eslintPluginReactHooks,
    'react-refresh': eslintPluginReactRefresh
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        ...eslintPluginReactHooks.configs.recommended.rules,
        ...eslintPluginReactRefresh.configs.vite.rules
      }
    }
  ]
})
