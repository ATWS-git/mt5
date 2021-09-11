const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // 用于在生成环境剔除debuger和console
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

const cdn = {
    css: [],
    js: [
        'https://cdn.bootcss.com/vue/2.6.11/vue.runtime.min.js',
        'https://cdn.bootcss.com/vue-router/3.1.6/vue-router.min.js',
        'https://cdn.bootcss.com/vuex/3.1.3/vuex.min.js',
    ],
};

module.exports = {
    publicPath: '/',
    productionSourceMap: false,
    devServer: {
        disableHostCheck: true,
        port: 8080,
        proxy: {
            '/ops': {
                //target: 'http://172.16.1.164:17101', //孙高进
                // target: 'http://172.16.1.149:17101', //李旭州
                // target: 'http://172.16.1.178:17101', //傅时哲
                // target: 'http://172.16.1.202:17101', //刘强
                target: 'http://dev.ops.admin.hqlive.com/hqlive',
                changeOrigin: true,
                pathRewrite: {
                    '^/ops': '/',
                },
            },
            '/im': {
                target: 'ws://dev.m.hqlive.com/im',
                changeOrigin: true,
                pathRewrite: {
                    '^/im': '/',
                },
            },
        },
    },
    configureWebpack: (config) => {
        if (isProduction) {
            config.externals = {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                vuex: 'Vuex',
            };
            config.plugins.push(
                // 去除console来减少文件大小，效果同'UglifyJsPlugin'
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: false, // Must be set to true if using source-maps in production
                    terserOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log'],
                        },
                    },
                }),
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // eslint-disable-line
                    threshold: 10240,
                    minRatio: 0.8,
                })
            );
        } else {
            config.devtool = 'source-map';
        }
    },
    chainWebpack: (config) => {
        // config.plugin('html').tap((args) => {
        //     console.log('================');
        //     console.log(args);
        //     args[0].cdn = cdn;
        //     return args;
        // });
        if (isProduction) {
            config.plugin('html').tap((args) => {
                console.log(args);
                args[0].cdn = cdn;
                return args;
            });
            config.plugin('ignore').use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)); // 忽略/moment/locale下所有文件
            config.plugin('loadshReplace').use(new LodashModuleReplacementPlugin()); // 优化lodash
            config.plugins.delete('preload'); // TODO: need test
            config.plugins.delete('prefetch'); // TODO: need test

            // set svg-sprite-loader
            config.module.rule('svg').exclude.add(resolve('src/icons')).end();
            config.module
                .rule('icons')
                .test(/\.svg$/)
                .include.add(resolve('src/icons'))
                .end()
                .use('svg-sprite-loader')
                .loader('svg-sprite-loader')
                .options({
                    symbolId: 'icon-[name]',
                })
                .end();

            // set preserveWhitespace
            config.module
                .rule('vue')
                .use('vue-loader')
                .loader('vue-loader')
                .tap((options) => {
                    options.optimizeSSR = false;
                    options.compilerOptions.preserveWhitespace = true;
                    return options;
                })
                .end();

            config.when(process.env.NODE_ENV !== 'development', (config) => {
                config
                    .plugin('ScriptExtHtmlWebpackPlugin')
                    .after('html')
                    .use('script-ext-html-webpack-plugin', [
                        {
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/,
                        },
                    ])
                    .end();
                config.optimization.splitChunks({
                    chunks: 'all',
                    cacheGroups: {
                        libs: {
                            name: 'chunk-libs',
                            test: /[\\/]node_modules[\\/]/,
                            priority: 10,
                            chunks: 'initial', // only package third parties that are initially dependent
                        },
                        // elementUI: {
                        //     name: 'chunk-elementUI', // split elementUI into a single package
                        //     priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        //     test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                        // },
                        commons: {
                            name: 'chunk-commons',
                            test: resolve('src/components'), // can customize your rules
                            minChunks: 3, //  minimum common number
                            priority: 5,
                            reuseExistingChunk: true,
                        },
                    },
                });
                config.optimization.runtimeChunk('single');
            });
        }
    },
    css: {
        extract: true, // css拆分ExtractTextPlugin插件，默认true - 骨架屏需要为true
    },
    // pages: {
    //     index: {
    //         entry: './src/main.js',
    //         filename: 'index1.html',
    //     },
    //     index2: {
    //         entry: './src/main.js',
    //         filename: 'index2.html',
    //     },
    // },
};
