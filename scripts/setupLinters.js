import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import { argv } from 'node:process'
import { spawn } from 'node:child_process'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const packageJson = JSON.parse(fs.readFileSync('package.json', { encoding: 'utf8' }))

packageJson.devDependencies = {
  ...packageJson.devDependencies,
  '@biomejs/biome': '^1.7.3',
  eslint: '^8.56.0',
  'eslint-plugin-svelte': '^2.40.0',
  stylelint: '^16.6.1',
  'stylelint-config-html': '^1.1.0',
  'stylelint-config-standard': '^36.0.0'
}

packageJson.stylelint = {
  extends: ['stylelint-config-standard', 'stylelint-config-html/svelte'],
  ignoreFiles: ['./**/*.js'],
  rules: {
    'media-feature-range-notation': 'prefix'
  }
}

packageJson.scripts = {
  ...packageJson.scripts,
  lint: 'eslint ./app/* & biome lint app & stylelint "app/*"',
  'lint:fix': 'eslint ./app/* --fix & biome check app --apply & stylelint "app/*" --fix',
  format: 'biome format app --write'
}

const replacer = null

fs.writeFileSync('package.json', JSON.stringify(packageJson, replacer, 2))
fs.copyFileSync('./scripts/.eslintrc.json', '.eslintrc.json')
fs.copyFileSync('./scripts/biome.json', 'biome.json')

// Delete this script, but not during testing
if (!argv[2]) {
  // Remove the script
  fs.unlinkSync(path.join(__filename))
  fs.unlinkSync('./scripts/.eslintrc.json')
  fs.unlinkSync('./scripts/biome.json')

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

console.info('Linter dependencies added')

spawn('npm', ['install'], {
  shell: true,
  stdio: ['ignore', 'inherit', 'inherit']
})
