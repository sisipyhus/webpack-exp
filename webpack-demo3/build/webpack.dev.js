const { merge } = require('webpack-merge')
const common = require('./webpack.base')
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
// const smp = new SpeedMeasurePlugin()
module.exports = merge(common,{
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 9091, // 本地服务器端口号
        // hot: true, // 热重载
        // overlay: true // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
        disableHostCheck: true
    }
})
