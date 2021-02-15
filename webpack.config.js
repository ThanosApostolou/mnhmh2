const path = require('path');
const { NODE_ENV = 'production' } = process.env;

module.exports = {
  entry: './src/main.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  watch: NODE_ENV === 'development'
}