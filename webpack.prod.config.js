const path = require('path')
const pkg = require('./package.json')

const libraryName = pkg.name

module.exports = {
  mode: 'production', // "production" | "development" | "none"
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index.js',
    publicPath: '/dist/',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/i,
        loaders: ['file-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
}
