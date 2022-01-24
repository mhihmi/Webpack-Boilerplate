const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    // Défini le mode développement ou production
    mode: 'development',

    // Défini comment les sourcemaps sont générés
    devtool: 'inline-source-map',

    // Mettre en place un serveur pour le mode développement
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },

    module: {
        rules: [
            // Styles: Inject CSS dans le head avec source map grace à style-loader
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: false
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                ],
            },
        ],
    }
})    