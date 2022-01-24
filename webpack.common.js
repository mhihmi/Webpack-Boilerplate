const { resolve, join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const src = join(__dirname, 'src')
const public = join(__dirname, 'public')
const pages = join(src, 'pages')
const jsSrc = join(src, 'js')
// const sassSrc = join(src, 'sass')

module.exports = {
    entry: {
        'index': join(src, 'index.js'),
        'page1': join(jsSrc, 'pagesJs', 'page1.js'),
        'page2': join(jsSrc, 'pagesJs', 'page2.js'),
        'page3': join(jsSrc, 'pagesJs', 'page3.js'),
        'page4': join(jsSrc, 'pagesJs', 'page4.js'),
    },

    output: {
        filename: 'js/[name].min.js',
        path: public,
        clean: true // nettoyer le dossier build and assets inutilisés lors d'un rebuild
    },

    module: {
        rules: [
            // JavaScript: transpiler les fichiers Js avec Babel
            {
                test: /\.*js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            // Fonts et SVGs : fichier inline
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                exclude: join(src, 'images'),
                type: 'asset',
                generator: {
                    filename: 'css/fonts/[name].[ext]'
                }
            },
        ],
    },

    plugins: [
        // Copie des fichiers du dossier src/export à la destination (public)
        new CopyWebpackPlugin({
            patterns: [{
                from: join(src, 'export'),
                to: public,
                globOptions: {
                    ignore: ['*.DS_Store'],
                },
                noErrorOnMissing: true,
            },],
        }),

        // Génère un fichier HTML du template
        new HtmlWebpackPlugin({
            template: join(src, 'index.html'),
            title: 'webpack Boilerplate',
            favicon: join(src, 'images', 'favicon.png'),
            filename: 'index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            template: join(pages, 'page1.html'),
            title: 'webpack Boilerplate',
            favicon: join(src, 'images', 'favicon.png'),
            filename: 'pages/page1.html',
            chunks: ['page1'],
        }),
        new HtmlWebpackPlugin({
            template: join(pages, 'page2.html'),
            title: 'webpack Boilerplate',
            favicon: join(src, 'images', 'favicon.png'),
            filename: 'pages/page2.html',
            chunks: ['page2'],
        }),
        new HtmlWebpackPlugin({
            template: join(pages, 'page3.html'),
            title: 'webpack Boilerplate',
            favicon: join(src, 'images', 'favicon.png'),
            filename: 'pages/page3.html',
            chunks: ['page3'],
        }),
        new HtmlWebpackPlugin({
            template: join(pages, 'page4.html'),
            title: 'webpack Boilerplate',
            favicon: join(src, 'images', 'favicon.png'),
            filename: 'pages/page4.html',
            chunks: ['page4'],
        }),
    ],

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': src,
        },
    },
}
