import { terser } from 'rollup-plugin-terser';

export default [{
  input: 'maquinaria.js',
  plugins: [terser()],
  output: [
    {
      compact: true,
      name: 'maquinaria',
      file: 'dist/maquinaria.umd.js',
      format: 'umd',
      strict: false,
      esModule: false
    },
    {
      file: 'dist/maquinaria.cjs.js',
      format: 'cjs',
      compact: true,
      strict: false,
      esModule: false
    },
    {
      file: 'dist/maquinaria.esm.js',
      format: 'esm',
      compact: true
    }
  ]
}];