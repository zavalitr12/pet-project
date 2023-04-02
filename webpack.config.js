const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: "./src/index.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: true,
        watchFiles: path.join(__dirname, 'src'),
        port: 9000,
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
        filename: 'index.html',
    })]
}