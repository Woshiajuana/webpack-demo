
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // 入口
    entry: './src/index.js',

    // 出口
    output: {
        // 输出文件名
        filename: 'index.js',
        // 输出路径
        path: path.resolve(__dirname, 'dist'),
    },

    // loader 配置
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                // 问题：处理不了 html 中的 img 图片
                test: /\.(jpe?g|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    // url-loader 的 es6 模块化解析关掉，新版本已解决
                    // esModule: false,
                    // 取 hash 前十位
                    name: '[hash:10].[ext]',
                },
            },
            {
                // 处理 html 文件的 img 图片，负责引入 img，从而能被 url-loader 进行处理
                test: /\.html$/,
                loader: 'html-loader',
            },
        ]
    },

    // plugins 的配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],

    // 模式
    mode: 'development',
    // mode: 'production',
};
