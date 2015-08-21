var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var mainPath = path.resolve(__dirname, 'app', 'main.js');

module.exports = {

    entry: {
        app: mainPath,
        vendors: ['qwest']
    },
    output: {
        path: '', // set by gulp build task
        filename: 'app.min.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: [nodeModulesPath]
            }
        ]
    },
    plugins: [
        // added by gulp into build task
    ]
};
