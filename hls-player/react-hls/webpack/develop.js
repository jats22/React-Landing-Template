'use strict';

const path = require('path');

const commonConfig = require('./common');

module.exports = Object.assign(commonConfig, {
    devtool : 'eval',
    devServer : {
        hot : true,
        port : 8030,
        contentBase : path.resolve(__dirname, '../dist'),
        publicPath : '/assets/',
    },
    alias: {

        react$: require.resolve(path.join(constants.NODE_MODULES_DIR, 'react')),
        'react-dom': require.resolve(path.join(constants.NODE_MODULES_DIR, 'react-dom'))
    
    },
    externals: {
        'react': 'react',
        'react-dom': 'react-dom'
    }
})
