const { merge } = require('webpack-merge')
const common = require('./webpack.base.config')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = merge(common,{
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin()
    ]
})
