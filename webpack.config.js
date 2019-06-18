const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin')
const minicss = require("mini-css-extract-plugin");
module.exports = {
    entry : {
        app : ['babel-polyfill','./src/js/script.js']
    },
    output : {
        path : path.resolve(__dirname,"dist"),
        filename : 'bundle.js'
    },
    module : {
        rules : [
            {
                test : /\.js?$/,
                exclude : /node_modules/,
                loader : 'babel-loader',
                options : {
                    presets : ['@babel/env']
                }
            },
            {
                test:/\.html?$/,
                loader: 'html-loader'
            },
            {
                test:/\.scss?$/,
                loader: ['style-loader','css-loader','sass-loader']
            }
        ]
    },
    plugins : [
        new htmlWebpackPlugin({
            template : './src/index.html',
            filename : './index.html'
        }),
        new minicss({
            filename : '[name].css',
            chunkFilename : '[id].css'
        })
    ]
}