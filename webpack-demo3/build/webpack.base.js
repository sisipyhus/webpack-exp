const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const babelConf = require("../babel.config");

let babelLoaderConf = {
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['ie>=8', 'chrome>=62'],
            node: '8.9.0',
          }, // 转换目标
          debug: false, // 是否打印prese-env对当前配置用了哪些插件，以及我们所支持的浏览器集合的数据
          useBuiltIns: 'usage', // 按需引入
          corejs: '3.0', // corejs版本
        },
      ],
      [
        '@babel/preset-typescript',
        {
          allExtensions: true, // 支持所有文件扩展名，否则在vue文件中使用ts会报错
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 3,
        },
      ],
    ],
  },
};


function getConfigPath(mode) {
  return path.resolve(process.cwd(), `.env.${mode}`)
}
module.exports = {
    entry: './src/index.ts',
    cache: {
      type: 'filesystem'  // 持久化缓存
    },
    
    output: {
        filename: 'js/[name].[chunkhash:5].js',
        path: path.resolve(__dirname, "../dist")
      },
    module: {
        rules: [
          {
            test: /\.(t|j)s$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
              },
            ],
          },
          {
            test: /\.(ts|js)x?$/,
            use: [babelLoaderConf],
            exclude: /node_modules/,
        },
          {
            test: /\.css$/,
            use: [
              // 'vue-style-loader',
              // 'style-loader',
              MiniCssExtractPlugin.loader,
              'postcss-loader',
              'css-loader'
            ],
          },
          {
            test: /\.less$/,
            use: [
              // 'vue-style-loader',
              MiniCssExtractPlugin.loader,
              // 'style-loader',
              'css-loader',
              'postcss-loader',
              'less-loader'
            ],
          },
          {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 1024,
                },
              }
            ]
          },
          {
            test: /\.vue$/,
            use: [
              {
                loader: 'vue-loader',
              },
            ],
            include: /(src)/,
          },
        ]
    },
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minChunks: 1, // 最小使用的次数 
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        minChunks: 1,
        cacheGroups: {
          // 提取公共js
          commons: {
            chunks: "all", // initial
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            name: "commons"
          }
        }
      }
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            title: 'webpack5+Vue3'
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
          filename: "style/[name].[hash:8].css",
          chunkFilename: "style/[hash:8].css"
        }),
        new ForkTsCheckerWebpackPlugin(),
    ]
}

