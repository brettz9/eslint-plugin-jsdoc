import {
  defineConfig,
} from 'tsdown';

export default defineConfig([
  {
    attw: {
      level: 'error',
      profile: 'node16',
    },
    dts: {
      sourcemap: true,
    },
    entry: [
      './src/index.js',
    ],
    format: [
      'es',
      'cjs',
    ],
    outputOptions: {
      exports: 'default',
    },
    publint: {
      level: 'error',
      strict: true,
    },
    sourcemap: true,
    unbundle: true,
  },
  {
    attw: {
      level: 'error',
      profile: 'node16',
    },
    dts: {
      sourcemap: true,
    },
    entry: [
      './src/getJsdocProcessorPlugin.js',
      './src/iterateJsdoc.js',
    ],
    format: [
      'es',
      'cjs',
    ],
    outputOptions: {
      exports: 'named',
    },
    publint: {
      level: 'error',
      strict: true,
    },
    sourcemap: true,
    unbundle: true,
  },
]);
