/**
 * Created by chenlizan on 2017/10/30.
 */
const fs = require('fs');
const path = require('path');
// 引入插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// 清理 dist 文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 引入基础配置
const webpackBase = require('./webpack.config.base');
// 引入 webpack-merge 插件
const webpackMerge = require('webpack-merge');
// 引入 webpack
const webpack = require('webpack');
const config = require('./config');
// const dll = path.resolve(process.cwd(), 'lib');
// const manifest = path.resolve(dll, 'renderer.json');

let HTMLPlugins = [];
// 入口文件集合
let Entries = {
    // commons: path.resolve(__dirname, `../src/js/commons.jsx`)
}

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
    entry: Entries,
    output: {
        filename: 'js/[name].bundle.[hash].js',
        path: path.resolve(__dirname, '../electron/web'),
        publicPath: './'
    },
    module: {
        rules: [{
            // 对 css 后缀名进行处理
            test: /\.css$/,
            // 不处理 node_modules 文件中的 css 文件
            include: path.resolve(__dirname, '../src/js/page'),
            // 抽取 css 文件到单独的文件夹
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                // 设置 css 的 publicPath
                publicPath: config.cssPublicPath,
                use: {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[name]__[local]__[hash:base64:5]',
                    }
                }
            })
        }]
    },
    plugins: [
        // 将 css 抽取到某个文件夹
        new ExtractTextPlugin({filename: 'css/[name].css', disable: false, allChunks: true}),
        // 自动清理 dist 文件夹
        new CleanWebpackPlugin(['electron/web'], {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false
        }),
        ...HTMLPlugins,
        // 提取公共 JavaScript 代码
        new webpack.optimize.CommonsChunkPlugin({
            // chunk 名为 commons
            name: 'commons',
            filename: '[name].bundle.js',
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'server',
        //     openAnalyzer: true
        // })
        new webpack.ProvidePlugin({

            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"

        })
    ]

});
