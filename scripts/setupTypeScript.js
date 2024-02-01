/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
// @ts-check

/** This script modifies the project to support TS code in .svelte files like:

  <script lang="ts">
    export let name: string;
  </script>

  As well as validating the code for CI.
*/

/** To work on this script:
  rm -rf test-template template
  && git clone fadrian06/svelte-template test-template
  && node scripts/setupTypeScript.js test-template
*/

import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { argv } from 'node:process'
import url from 'node:url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const projectRoot = argv[2] || path.join(__dirname, '..')

// Add deps to pkg.json
const packageJson = JSON.parse(
  fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8')
)

packageJson.devDependencies = Object.assign(packageJson.devDependencies, {
  '@rollup/plugin-typescript': '^11.1.6',
  '@tsconfig/svelte': '^5.0.2',
  'svelte-check': '^3.6.3',
  'svelte-preprocess': '^5.1.3',
  tslib: '^2.6.2',
  typescript: '^5.3.3'
})

// Add script for checking
packageJson.scripts = Object.assign(packageJson.scripts, {
  check: 'svelte-check'
})

// Write the package JSON
fs.writeFileSync(
  path.join(projectRoot, 'package.json'),
  JSON.stringify(packageJson, null, '  ')
)

/* mv app/main.js to main.ts - note,
we need to edit rollup.config.js for this too */
const beforeMainJsPath = path.join(projectRoot, 'app', 'main.js')
const afterMainTsPath = path.join(projectRoot, 'app', 'main.ts')
fs.renameSync(beforeMainJsPath, afterMainTsPath)

// Switch the app.svelte file to use TS
const appSveltePath = path.join(projectRoot, 'app', 'App.svelte')
let appFile = fs.readFileSync(appSveltePath, 'utf8')
appFile = appFile.replace('<script>', '<script lang="ts">')
appFile = appFile.replace('export let name;', 'export let name: string;')
fs.writeFileSync(appSveltePath, appFile)

// Edit rollup config
const rollupConfigPath = path.join(projectRoot, 'rollup.config.js')
let rollupConfig = fs.readFileSync(rollupConfigPath, 'utf8')

// Edit imports
rollupConfig = rollupConfig.replace(
  "'rollup-plugin-css-only'",
  `'rollup-plugin-css-only'
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';`
)

// Replace name of entry point
rollupConfig = rollupConfig.replace("'app/main.js'", "'app/main.ts'")

// Add preprocessor
rollupConfig = rollupConfig.replace(
  'compilerOptions:',
  'preprocess: sveltePreprocess({ sourceMap: !production }),\n\t\t\tcompilerOptions:'
)

// Add TypeScript
rollupConfig = rollupConfig.replace(
  'commonjs(),',
  'commonjs(),\n\t\ttypescript({\n\t\t\tsourceMap: !production,\n\t\t\tinlineSources: !production\n\t\t}),'
)

fs.writeFileSync(rollupConfigPath, rollupConfig)

// Add svelte.config.js
const tsconfig = `{
  "extends": "@tsconfig/svelte/tsconfig.json",

  "include": ["app/**/*"],
  "exclude": ["node_modules/*", "__sapper__/*", "public/*"]
}`

const tsconfigPath = path.join(projectRoot, 'tsconfig.json')
fs.writeFileSync(tsconfigPath, tsconfig)

// Add TSConfig
const svelteConfig = `import sveltePreprocess from 'svelte-preprocess';

export default {
  preprocess: sveltePreprocess()
};
`

const svelteConfigPath = path.join(projectRoot, 'svelte.config.js')
fs.writeFileSync(svelteConfigPath, svelteConfig)

// Add global.d.ts
const dtsPath = path.join(projectRoot, 'app', 'global.d.ts')
fs.writeFileSync(dtsPath, '/// <reference types="svelte" />')

// Delete this script, but not during testing
if (!argv[2]) {
  // Remove the script
  fs.unlinkSync(path.join(__filename))

  // Check for Mac's DS_store file, and if it's the only one left remove it
  const remainingFiles = fs.readdirSync(path.join(__dirname))
  if (remainingFiles.length === 1 && remainingFiles[0] === '.DS_store') {
    fs.unlinkSync(path.join(__dirname, '.DS_store'))
  }

  // Check if the scripts folder is empty
  if (fs.readdirSync(path.join(__dirname)).length === 0) {
    // Remove the scripts folder
    fs.rmdirSync(path.join(__dirname))
  }
}

// Adds the extension recommendation
fs.mkdirSync(path.join(projectRoot, '.vscode'), { recursive: true })
fs.writeFileSync(
  path.join(projectRoot, '.vscode', 'extensions.json'),
  `{
  "recommendations": ["svelte.svelte-vscode"]
}
`
)

console.info('Converted to TypeScript.')

// if (fs.existsSync(path.join(projectRoot, 'node_modules'))) {
//   console.info('\nYou will need to re-run your dependency manager to get started.')
// }

spawn('npm', ['install'], {
  shell: true,
  stdio: ['ignore', 'inherit', 'inherit']
})
