const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config();

module.exports = {
    entry: ['src/index.tsx'],
    target: 'web',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../public/teams-app-dist'),
        filename: 'main.js',
    },
    resolve: {
        modules: [
            'src',
            'node_modules',
            path.resolve(__dirname),
        ],
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: ['node_modules/compass-mixins/lib', 'sass'],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            sources: false,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'teams-app.html',
        }),
    ],
    devServer: {
        static: path.join(__dirname, '/dist'),
        compress: true,
        port: Number.parseInt(process.env.REACT_APP_PORT, 10) || 8080,
    },
};
