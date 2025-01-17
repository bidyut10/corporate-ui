const path = require('path');

module.exports = {
    entry: './src/index.js', 
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'corporate-ui',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    mode: 'production', 
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
        'prop-types': 'prop-types',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], 
    },
};
