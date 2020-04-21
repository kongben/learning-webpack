const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const glob = require('glob')


//多页面入口
const setMPA = () => {
    const entry = {};
    const HtmlWebpackPlugins = []

    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))

    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index]
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        const pageName = match && match[1];

        entry[pageName] = entryFile

        HtmlWebpackPlugins.push(//输出目录新建html
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `/src/${pageName}/index.html`), //模板位置
                filename: `${pageName}.html`, //输出文件名
                chunks: [pageName], //使用哪种chunk
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                },
                title: '我是标题'
            })
        )
    });

    return {
        entry,
        HtmlWebpackPlugins
    }
}

const { entry, HtmlWebpackPlugins } = setMPA();

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'none',
    module: {
        rules: [
            //解析ES6
            {
                test: /.js$/, //匹配所有js
                use: 'babel-loader',
            },
            //解析css
            {
                test: /.css$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            //解析less
            {
                test: /.less$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist: [
                                        "last 2 version",
                                        '> 1%',
                                        "iOS 7",
                                    ]
                                })
                            ]
                        }
                    },
                    //px转rem loader
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecession: 8 //小数点
                        }
                    },
                ]
            },

            //解析字体
            {
                test: /.(woff|woff2|eot|ttf|tof)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ],

            },
            //解析图片
            {
                test: /.(png|jpg\gif\jepg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        //自动清理dist
        new CleanWebpackPlugin(),
        //css导出
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "[id].css"
        })
    ].concat(HtmlWebpackPlugins),
    devtool:'inline-source-map'
}