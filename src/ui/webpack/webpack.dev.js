const { HotModuleReplacementPlugin } = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: 'development',

    devServer: {
        open: true,
        port: 8000,
        hot: true,
        inline: true,
        watchContentBase: true,
        proxy: {
            '/static': {
                target: 'https://sunitdeshpande.github.io/DevGeo/',
                secure: true,
                changeOrigin: true
            }
        }
    },

    plugins: [new HotModuleReplacementPlugin()]
});
