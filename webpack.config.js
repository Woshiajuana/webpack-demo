
const path = require('path');
const fs = require('fs-extra');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');


const entry = {};
let walkFun = '';
/**
 * 遍历获取目录结构
 * */
(walkFun = (dir) => {
    dir = dir || '.';
    let directory = path.join(__dirname, './src/views', dir);
    fs.readdirSync(directory).forEach((file) => {
        let full_path = path.join(directory, file);
        let dir_arr = full_path.substring(full_path.indexOf('views') + 6).replace(/\\/g, '/').split('\/');
        let last_dir = dir_arr[dir_arr.length - 1];
        let stat = fs.statSync(full_path);
        let ext_name = path.extname(full_path);
        if (stat.isFile() && ext_name === '.js') {
            let page_name = '';
            dir_arr.forEach((item, index) => {
                page_name = index === (dir_arr.length - 1) ? page_name : (page_name ? page_name + '/' + item : item);
            });
            entry[page_name] = full_path;
        } else if (last_dir !== 'js' && last_dir !== 'css' && last_dir !== 'img' && stat.isDirectory()) {
            let sub_dir = path.join(dir, file);
            walkFun(sub_dir);
        }
    })
})();

console.log(entry);

const config = {
    entry: entry,
    output: {
        filename: '[name]/index.js',
        path: path.join(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test:   /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name]/index.css'),
    ],
    node: {
        fs: 'empty'
    },
};

for (let key in entry) {
    const htmlPlugin = new HtmlWebpackPlugin({
        filename: `${key}/index.html`,
        template: entry[key].replace('entry.js', 'index.html'),
        minify: { removeAttributeQuotes: true },
        chunks: [key, 'common'],
        inject: 'body',
    });
    config.plugins.push(htmlPlugin);
}



module.exports = config;