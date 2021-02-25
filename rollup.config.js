import resolve from '@rollup/plugin-node-resolve';
import common from '@rollup/plugin-commonjs';

export default {
    input: {
        index: 'index.js',
        Table: 'components/table/index.js',
    },
    output: {
        dir   : 'dist',
        format: 'esm',
    },
    plugins: [
        common(),
        resolve(),
    ],
};