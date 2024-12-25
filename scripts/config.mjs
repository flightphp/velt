import { readFileSync, existsSync, copyFileSync, writeFileSync } from 'node:fs'
import { parse } from 'dotenv'
import sveltePlugin from 'esbuild-svelte'

/** @type {import('esbuild').BuildOptions} */
export const commonOptions = {
  bundle: true,
  entryPoints: ['src/main.js'],
  format: 'esm',
  loader: {
    '.module.css': 'local-css',
    '.ttf': 'copy',
    '.woff': 'copy',
    '.woff2': 'copy'
  },
  outfile: 'app/build/bundle.js',
  target: ['es2018'],
  plugins: [sveltePlugin({})],
  conditions: ['main']
}

if (!existsSync('.env')) {
  copyFileSync('.env.dist', '.env')
}

const env = parse(readFileSync('.env'))
let declarations = ''

for (const variable in env) {
  env[variable] = `"${env[variable]}"`
  declarations += `declare const ${variable}: string\n`
}

writeFileSync('src/env.d.ts', declarations)

export { env }
