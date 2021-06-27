const path = require('path');
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    //Create a html template - Because in webapckl you don write html
    /*new HtmlWebpackPlugin({
      title: 'Development',
      template: 'src/index.html'
    })*/
    new CopyWebpackPlugin({ 
      patterns:[{ from: './src/index.html', to: "index.html" }]
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new NodePolyfillPlugin()
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', 
        }, 
        {
          loader: 'css-loader',
        }, 
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }                  
      },
      {
          loader: 'sass-loader'
      }]
    }]
  },
  resolve: {
    fallback : { 
      "http": require.resolve("stream-http")
    }
  }
  /*,resolve: {
    fallback : { 
        "os": require.resolve("os-browserify/browser"),
        "https": require.resolve("https-browserify"),
        "http": require.resolve("stream-http"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert/")
      }
  }*/
  /*,resolve: {
    fallback : { 
        "os": false,
        "https": false,
        "http": false,
        "crypto": false,
        "stream": false,
        "assert": false
      }
  }*/
};