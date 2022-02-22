const CracoLessPlugin = require('craco-less');
const path = require('path');
const { whenProd } = require('@craco/craco');
const TerserPlugin = require('terser-webpack-plugin');

const pathResolve = pathUrl => path.join(__dirname, pathUrl);

module.exports = {
    webpack: {
        configure: (webpackConfig, { env, path }) => {
            // 修改entry和output 
            webpackConfig.entry = pathResolve('src/index.js');
            webpackConfig.output = { 
                ...webpackConfig.output,
                path: pathResolve('build'), 
                filename: 'bundle.js',
                publicPath: '/', // webpack从该路径下寻找文件
                // publicPath设为“./”则用相对路径，在二级路由下请求资源以当前路由为参考
                //   设为“/”则用绝对路径，在二级路由下请求资源以根路由为参考
            };
            return webpackConfig; 
        },
        alias: {
            '@@': pathResolve('.'),
            '@': pathResolve('src'),
            '@assets': pathResolve('src/assets'),
            '@common': pathResolve('src/common'),
            '@components': pathResolve('src/components'),
            '@hooks': pathResolve('src/hooks'),
            '@pages': pathResolve('src/pages'),
            '@router': pathResolve('src/router'),
            '@service': pathResolve('src/service'),
            '@store': pathResolve('src/store'),
            '@utils': pathResolve('src/utils')
        },
        plugins:[ 
            ...whenProd(() => [
                //打包忽略console,debugger
                new TerserPlugin({
                    cache: true,
                    sourceMap: true,
                    parallel: true, //多进程
                    terserOptions: {
                      ecma: undefined,
                      warnings: false,
                      parse: {},
                      compress: {
                        // 生产环境下移除控制台所有的内容
                        drop_console: process.env.NODE_ENV === "production", 
                        // 移除断点
                        drop_debugger: false, 
                        // 生产环境下移除console
                        pure_funcs:
                          process.env.NODE_ENV === "production" ? ["console.log"] : "", 
                      },
                    },
                  }),
            ], [] )
        ]
    },
    babel: {
        //按需加载antd组件
        plugins: [
            ['import', { libraryName: 'antd', style: true }],
            ['@babel/plugin-proposal-decorators', { legacy: true }]
        ]
    },
    plugins: {
        plugin: CracoLessPlugin,
        options: {
            lessLoaderOptions: {
                lessOptions: {
                  modifyVars: { '@primary-color': '#1DA57A' }, //配置antd主题色
                  javascriptEnabled: true,
                }
            }
        }
    },
    // 使用BrowserRouter时，由于配置的路由并不是实际存在的文件，webpack-dev-sever根据文件查找的方式找不到文件，会出现404
    // 配置devServer，当路径匹配的文件不存在时取historyApiFallback.index对应的文件
    // devServer只在用webpack-dev-server启动的时候有效，craco好像用不了？
    // devServer: {
    //     contentBase: pathResolve('build'),
    //     publicPath: "/",
    //     compress: true, // 启动gzip压缩
    //     open: true,
    //     historyApiFallback:{
    //         index:'./index.html'
    //     },
    //     proxy: {
    //         context: () => true,
    //         target: 'http://101.35.24.184:9008',
    //         changeOrigin: true,
    //         secure: false,
    //     },
    //},
};

// npm run build 编译项目
// npx serve -s ./build 启动本地服务 ---无法适配browserRouter

// 在安装的nginx目录下执行nginx.exe启动反向代理，访问nginx.conf内配置的主机名+端口号，对资源和api的请求可以通过配置被正确转发
// 关闭cmd不会停止nginx服务器，需要执行nginx -s quit

// npm是一个node package安装工具
// npx的作用是先检查本地有没有安装某个package，如果没有去远程registry找，
//   找到的话直接使用，不用下载到本地node-modules包里面，这样就能优化本地项目的大小，也可以避免安装package到全局。

// 代码中的相对路径是以浏览器上 地址 为参考的，而不是文件所在目录
//   （一般情况这两个是统一的，但是服务器配置过就不一定了。比如浏览器请求a文件，服务器把b文件给浏览器，这个时候b文件的相对路径是以url的地址为参考的，即a的url地址）。
// 单页应用中，hash模式的url地址是不变的（变的是hash值），所以打包后  页面的相对路径 都是相对index页面。
//    但是history模式下，浏览器地址是改变的，所以直接把hash模式转化为history模式会出现错误。因为history模式下，不同的地址相对路径是不一样的。
