const path  = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
    //需要打包的js文件
    entry:entry,
    //输出文件名及目录
    output:{
        path:path.join(__dirname,'dist'),
        filename:'[name].js'
    },
    mode:'development',
    module:{
        rules:[
            //解析ES6
            {
                test:/.js$/, //匹配所有js
                use:'babel-loader',
            },
            //解析css
            {
                test:/.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                ]
            },
            //解析less
            {
                test:/.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            // //解析图片
            {
                test:/.(png|jpg\gif\jepg)$/,
                use:'file-loader'
            },
            //解析字体
            {
                test:/.(woff|woff2|eot|ttf|tof)$/,
                use:'file-loader'
            },
            //解析图片转base64
            {
                test:/.(png|jpg\gif\jepg)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:10240
                    }
                }
            }
        ]
    },
    plugins:[
        //热更新
        new webpack.HotModuleReplacementPlugin(),
        //自动清理dist
        new CleanWebpackPlugin()
    ].concat(HtmlWebpackPlugins),
    devServer:{
        contentBase:'./dist',
        hot:true
    },
    devtool:'source-map'
}