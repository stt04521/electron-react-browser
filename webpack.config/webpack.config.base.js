/**
 * Created by chenlizan on 2017/10/30.
 */

const path = require('path');

// 引入多页面文件列表
const config = require('./config');
// const webpack = require('webpack');

module.exports = {

    // 输出文件
    output: {
        filename: 'js/[name].bundle.[hash].js',
        path: path.resolve(__dirname, '../electron/web'),
        publicPath: '/'
    },

    // 加载器
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, '../node_modules/yuan-pomeloclient'),
                    path.resolve(__dirname, '../src')
                ],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-0'],
                        plugins: ['add-module-exports', 'transform-object-assign', 'transform-decorators-legacy', ['import', {
                            libraryName: 'antd',
                            style: 'css'
                        },
                        {
                            libraryName: 'antd-mobile',
                            style: 'css'
                        }
                        ], ['transform-runtime', {
                            'helpers': false,
                            'polyfill': false,
                            'regenerator': true,
                            'moduleName': 'babel-runtime'
                        }]
                        ]
                    }
                }]
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        // 打包生成图片的名字
                        name: '[name].[ext]',
                        // 图片的生成路径
                        outputPath: config.imgOutputPath
                    }
                }
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: [{
                    loader: 'file-loader'
                }]
            }],
    },

    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            config: path.resolve(__dirname, '../config.js'),
            src: path.resolve(__dirname, '../src'),
            electron: path.resolve(__dirname, '../electron'),
            persistence: path.resolve(__dirname, '../src/js/persistence'),
            ystRedux: path.resolve(__dirname, '../src/js/redux'),
            utils: path.resolve(__dirname, '../src/js/utils'),
            component: path.resolve(__dirname, '../src/js/redux')
        }
    },

    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
    target: 'electron-renderer',
}
