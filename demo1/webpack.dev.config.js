
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // 入口
    entry: './src/js/index.js',

    // 出口
    output: {
        // 输出文件名
        filename: 'js/index.js',
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
                    outputPath: 'images', // 输出目录
                },
            },
            {
                // 处理 html 文件的 img 图片，负责引入 img，从而能被 url-loader 进行处理
                test: /\.html$/,
                loader: 'html-loader',
            },
            // 打包其他资源
            {
                // 排除 css/js/html 资源
                // exclude: /\.(css|js|html|scss)$/
                test: /\.(eot|svg|woff|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media', // 输出目录
                }
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

    // devServer
    // 自动编译，自动打开浏览器，字段刷新浏览器
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动 devServer 指令为：webpack-dev-server
    devServer: {
        // 运行的目录
        contentBase: path.resolve(__dirname, 'dist'),
        // 启动 gzip 压缩
        compress: true,
        // 服务端口
        port: 3000,
        // 自动打开浏览器
        open: true,
    },
};
