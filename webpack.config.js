// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// require('dotenv').config({ path: './.env.local' }); 

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "docs"),
  },
  devServer: {
    host: "localhost",
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    // new webpack.EnvironmentPlugin({
    //   NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    // })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader","css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader","css-loader", "sass-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader","css-loader",
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                  javascriptEnabled: true,
              }
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    fallback: {
      "os": require.resolve("os-browserify/browser"),
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util"),
      "buffer": require.resolve("buffer"),
      "path": require.resolve('path-browserify'),
      "assert": require.resolve("assert")
    },
    extensions: [
      '.js',
      '.jsx',
      '.css', ".tsx", ".ts"
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      'pouchdb-promise$': "pouchdb-promise/lib/index.js"
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
