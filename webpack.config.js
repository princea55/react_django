const path = require('path');

module.exports = {
    mode: "development",
    entry: ['babel-polyfill', './djsr/frontend/src/index.js'],
    output: {
        // options related to how webpack emits results

        // where compiled files go
        path: path.resolve(__dirname, "djsr/frontend/static/frontend/public/"),

        // 127.0.0.1/static/frontend/public/ where files are served from
        publicPath: "/static/frontend/public/",
        filename: 'main.js',  // the same one we import in index.html
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: { presets: ["@babel/env"] }

                },
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]

    },
};