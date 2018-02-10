/**
 * Created by chenlizan on 2017/10/30.
 */
const fs = require('fs');
const path = require('path');
// 引入插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入基础配置文件
const webpack = require('webpack');
const webpackBase = require('./webpack.config.base');
// 引入 webpack-merge 插件
const webpackMerge = require('webpack-merge');
// 引入配置文件
const config = require('./config');
// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = [];
// 入口文件集合
let Entries = {
    // commons: path.resolve(__dirname, `../src/js/commons.jsx`)
}
const dll = path.resolve(process.cwd(), 'lib');
const manifest = path.resolve(dll, 'renderer.json');

// 获取所有页面 生成多页面的集合
const getHTMLFileNameList = path => {
    let fileList = [];
    let dirList = fs.readdirSync(path);
    dirList.forEach(item => {
        if (item.indexOf('html') > -1) {
            fileList.push(item.split('.')[0]);
        }
    });
    return fileList;
};

let HTMLDirs = getHTMLFileNameList('./src/templates');

// 生成多页面的集合
HTMLDirs.forEach((page) => {
    const htmlPlugin = new HTMLWebpackPlugin({
        filename: `${page}.html`,
        template: path.resolve(__dirname, `../src/templates/${page}.html`),
        chunks: [page, 'commons'],
    });
    HTMLPlugins.push(htmlPlugin);
    Entries[page] = path.resolve(__dirname, `../src/js/pages/${page}/index.jsx`);
});

// 合并配置文件
module.exports = webpackMerge.smart(webpackBase, {
    // 配置 webpack-dev-server
    // 入口文件
    entry: Entries,
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, '../node_modules/yuan-pomeloclient'),
                    path.resolve(__dirname, '../src')
                ]
            }, {
                // 对 css 后缀名进行处理
                test: /\.css$/,
                // 不处理 node_modules 文件中的 css 文件
                include: path.resolve(__dirname, '../src/js/page'),
                // 抽取 css 文件到单独的文件夹
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                        }
                    },
                ]
            }, {
                test: /\.css$/,
                include: /node_modules/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, '../src/js/style'),
                loader: 'style-loader!css-loader'
            }]
    },
    devServer: {
        // 项目根目录
        contentBase: config.devServerOutputPath,
        port: 1313,
        // 错误、警告展示设置
        overlay: {
            errors: true,
            warnings: false
        }
    },
    plugins: [
        // new webpack.DllReferencePlugin({
        //     context: process.cwd(),
        //     manifest: require(manifest),
        //     sourceType: 'var',
        // }),
        new webpack.HotModuleReplacementPlugin({}),
        // 自动生成 HTML 插件
        ...HTMLPlugins
    ]
});
