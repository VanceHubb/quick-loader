const path = require('path');
const Quickloader = require("../plugin");

module.exports = function () {
    return {
        entry: "./test/src/index.js", // string | object | a
        output: {
            path: path.resolve('./test/dist'),
            filename: "bundle.js"
        },

        module: {
            rules: [{
                test: /\.(css|scss)$/,
                use: [require.resolve('../../quick-loader'), 'postcss-loader?sourceMap', 'resolve-url-loader', 'sass-loader?sourceMap']
            }]
        },
        plugins: [
            new Quickloader()
        ]
    }
}