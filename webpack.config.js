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
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: ['/node_modules', '/ClientApp/', '/build/']
            },            
            {
                test: /\.js$/,
                exclude: ['/node_modules', '/ClientApp/', '/build/']
            }
        ],
        noParse: '/ClientApp/'
    },
}