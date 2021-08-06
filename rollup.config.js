import pkg from './package.json';

export default {
  input: 'index.js',
  external: [...Object.keys(pkg.dependencies), 'path'],
  output: [
    { file: pkg.main, format: 'cjs', exports: 'auto' },
    { file: pkg.module, format: 'es' }
  ]
};
