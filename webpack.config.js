const path = require('path');
const { NODE_ENV = 'production' } = process.env;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    mode: NODE_ENV,
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'mnhmh2.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: ['/node_modules', '/client/', '/build/']
            },            
            {
                test: /\.js$/,
                exclude: ['/node_modules', '/client/', '/build/']
            }
        ],
        noParse: '/client/'
    },
}