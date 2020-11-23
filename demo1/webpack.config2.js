
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 设置 nodejs 环境变量
process.env.NODE_ENV = 'development';

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
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    // 'style-loader',
                    // 取代style-loader, 提取 js 中的 css 成单独文件
                    {
                        loader: MiniCssExtractPlugin.loader,
                        //在这里设置publicPath的路径就是background-img的路径
                        options:{
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    // css 兼容处理 postcss-loader  postcss-preset-env
                    // 开发环境 -> 设置 node 环境变量：process.env.NODE_ENV = development
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // 其他选项
                                        },
                                    ],
                                ],
                            },
                        },

                    },
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
            /**
             * 语法检查：eslint-loader eslint
             * 注意：只检查自己写的源代码，第三方的库是不用检查的
             * 设置检查规则：
             * package.json 中 eslintConfig 中设置
             *  "eslintConfig": {
             *      "extends": "airbnb-base"
             *  }
             * airbnb -> eslint-config-airbnb-base eslint eslint-plugin-import
             * eslint-disable-next-line: 下一行 eslint 所有规则都失效，不进行 eslint 检查。
             * */
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: 'eslint-loader',
            //     options: {
            //         // 自动修复 eslint 的错误
            //         fix: true,
            //     }
            // },
            /**
             * js 兼容性处理：babel-loader
             * 1.
             * */
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    // 只是 babel 做怎样的处理
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns: 'usage',
                                // 指定 core-js 版本
                                corejs: {
                                    version: 3,
                                },
                                // 指定兼容性做到哪个版本的浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17',
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },

    // plugins 的配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // 压缩 html
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true,
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name][contenthash:8].css',
        }),
        new OptimizeCssAssetsWebpackPlugin(),
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
