const path = require('path');
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'bundle.js'
    },
    devServer:{
        port:8080,
        contentBase:path.join(__dirname,'public'),
        publicPath:'/vritual/'
    }
}