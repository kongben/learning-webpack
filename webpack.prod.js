const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
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
                    'style-loader',
                    'css-loader',
                ]
            },
            //解析less
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'/src/search.html'), //模板位置
            filename:'search.html', //输出文件名
            chunks:['search'], //使用哪种chunk
            inject:true,
            minify:{
                html5:true,
                collapseWhitespace:true,
                preserveLineBreaks:false,
                minifyCSS:true,
                minifyJS:true,
                removeComments:false
            }
        }),
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'/src/index.html'), //模板位置
            filename:'index.html', //输出文件名
            chunks:['index'], //使用哪种chunk
            inject:true,
            minify:{
                html5:true,
                collapseWhitespace:true,
                preserveLineBreaks:false,
                minifyCSS:true,
                minifyJS:true,
                removeComments:false
            }
        })
    ]
}