var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var htmlPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// var CleanWebpackPlugin = require('clean-webpack-plugin');
// var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// var uglifyjs = require('uglifyjs-webpack-plugin');

var entrys = {};
var jsArr = fs.readdirSync(path.resolve(__dirname, 'src/js'));
for (var i = 0; i <= jsArr.length-1; i++) {
    var name = jsArr[i].split('.js')[0];
    entrys[name] = './src/js/'+name+'.js';
}

module.exports = {
	// entry: {['webpack-dev-server/client?http://localhost:8080/','./src/index.js']},
	entry: entrys,
    output: {
    	// publicPath:'http://localhost:8080/',
        publicPath:'/', 
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: "development", // 开发模式
  	devtool: "source-map", // 开启调试
    devServer: {
        // contentBase: './dist/',
        contentBase: path.join(__dirname,"dist"),
        watchContentBase: true,
        historyApiFallback: true,
        inline: true,
        hot: true,
        host: 'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:8080,
        open:true,
        // openPage:'dist/',
        // proxy:{
        //     // path:'/data/*',
        //     target: "http://localhost:8080",
        //     host: "localhost"
        // }
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             styles: {
    //                 name: 'css/[name].css',
    //                 test: /\.css$/,
    //         //         chunks: 'all',
    //                 enforce: true
    //             }
    //         }
    //     }
    // },
    module:{
        rules:[       
        {
            test: /\.css$/,
            use:[
                {
                    loader:MiniCssExtractPlugin.loader,
                    options:{publicPath: "../"}
                },
                'css-loader'
            ]            
        }, 
      	{
            test: /\.js$/,
            loader: 'babel-loader', 
            exclude: path.resolve(__dirname, 'node_modules'),    
            query: {
                presets: ['env']
            }
        },      	
       	{
            test: /\.(png|jpg|gif|svg|mp4)$/,
            use:[
            	{
            		loader: 'file-loader',
		            options: {
		                name: '[name].[ext]?[hash]',
		                // publicPath: "../images/",
                        outputPath: "images/"
		            }
            	}
            ]            
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options:{
　　　　　　　　　//这里打包后可以把所有的字体库都放在fonts文件夹中
                name:'/fonts/[hash].[ext]'
            }
        },        
        // {
        // 	test: /\.(html)$/,
        //     loader:'html-loader',
        //     options:{
        //         attrs:['img:src','img:data-src'],
        //         minimize: true
        //     }
        // }
        ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
    	// new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        }),//从JS中分离出CSS，并放到css文件夹中
        // new OptimizeCssAssetsPlugin(),//压缩CSS
        // new uglifyjs(),//压缩JS
        
        // 复制静态文件
        new CopyWebpackPlugin([{ 
            from: path.join(__dirname,'src/lib'), 
            to:  path.join(__dirname,'dist/lib') 
        },{ 
            from: path.join(__dirname,'src/data'), 
            to:  path.join(__dirname,'dist/data') 
        },{ 
            from: path.join(__dirname,'src/images/static'), 
            to:  path.join(__dirname,'dist/images/static') 
        },{ 
            from: path.join(__dirname,'src/favicon.ico'), 
            to:  path.join(__dirname,'dist/favicon.ico') 
        }
        ]),
        new htmlPlugin({
            // title: 'Custom template',
            // minify:{
            //     removeAttributeQuotes:true
            // },
            hash:true,
            template:'./src/html/index.html',
            filename:'index.html',
            chunks:['function','common','index']
            // inject: true
        }),
        new htmlPlugin({            
            hash:true,
            template:'./src/html/product.html',
            filename:'product.html',
            chunks:['function','common','product']            
        }),
        new htmlPlugin({            
            hash:true,
            template:'./src/html/solution/optical_module.html',
            filename:'solution/optical_module.html',
            chunks:['function','common','solution']            
        }),
        new htmlPlugin({            
            hash:true,
            template:'./src/html/solution/cabling_system.html',
            filename:'solution/cabling_system.html',
            chunks:['function','common','solution']            
        }),
        new htmlPlugin({            
            hash:true,
            template:'./src/html/solution/switches.html',
            filename:'solution/switches.html',
            chunks:['function','common','solution']            
        }),
        new htmlPlugin({            
            hash:true,
            template:'./src/html/service.html',
            filename:'service.html',
            chunks:['function','common','service']            
        }),
    ]
};