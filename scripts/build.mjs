import esbuild from 'esbuild'
import { commonOptions, env } from './config.mjs'

await esbuild.build({
  ...commonOptions,
  define: {
    ...env,
    isDevelopment: 'false'
  },
  minify: true
})

console.info('Compiled successfully')
