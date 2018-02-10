/**
 * Created by shishitengteng on 2018/1/8.
 */
const { dependencies } = require('../package.json');
const path = require('path');
const webpackBase = require('./webpack.config.base');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const config = require('./config');

const dist = path.resolve(process.cwd(), 'lib');
const noBuild = ['font-awesome', 'antd' ];

const ss = Object
    .keys(dependencies || {})
    .filter(dependency => !noBuild.includes(dependency));
console.log(ss);

module.exports = webpackMerge.smart(webpackBase, {
    context: process.cwd(),

    target: 'electron-renderer',

    entry: {
        renderer: (
            Object
                .keys(dependencies || {})
                .filter(dependency => !noBuild.includes(dependency))
        )
    },

    output: {
        library: 'renderer',
        path: dist,
        filename: '[name].dev.dll.js',
        libraryTarget: 'var'
    },

    module: {
        rules: [{
            // 对 css 后缀名进行处理
            test: /\.css$/,
            // 不处理 node_modules 文件中的 css 文件
            exclude: /node_modules/,
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
        }]
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(dist, '[name].json'),
            name: '[name]',
        })
    ]
});