
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
            }
        ]
    },

    // plugins 的配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
    ],

    // 模式
    mode: 'development',
    // mode: 'production',
};
