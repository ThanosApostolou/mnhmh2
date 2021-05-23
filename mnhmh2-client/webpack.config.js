/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (env, argv) => {
    const isProd = argv.mode === "production";
    return {
        entry: "./src/index",
        output: {
            path: path.join(__dirname, "/build"),
            filename: "mnhmh2-client.js"
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"]
        },
        watchOptions: {
            ignored: [path.join(__dirname, "/node_modules"), path.join(__dirname, "/build")]
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    use: {
                        loader: "babel-loader"
                    },
                    exclude: [/node_modules/, /build/]
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: "assets/[name][ext][query]"
                    },
                    exclude: [/node_modules/, /build/]
                },
                {
                    test: /\.json/,
                    type: "asset/resource",
                    generator: {
                        filename: "[name][ext][query]"
                    },
                    exclude: [/node_modules/, /build/]
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                    exclude: [/node_modules/, /build/]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                favicon: "./public/favicon.ico",

            }),
            new ESLintPlugin({
                context: "src/",
                extensions: ["js", "jsx", "ts", "tsx"],
                fix: true
            })
        ],
        devServer: {
            historyApiFallback: true,
            port: 3001,
            client: {
                overlay: {
                    errors: true
                }
            },
            proxy: {
                "/api/**": "http://localhost:3000",
            }
        },
        devtool: isProd ? false : "eval-cheap-module-source-map"
    };
};