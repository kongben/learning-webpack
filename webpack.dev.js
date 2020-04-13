const path  = require('path')
const webpack = require('webpack')
module.exports = {
    entry:{
        index:'./src/index.js',
        search:'./src/search.js'
    },
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
            // {
            //     test:/.(png|jpg\gif\jepg)$/,
            //     use:'file-loader'
            // },
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
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase:'./dist',
        hot:true
    }
}