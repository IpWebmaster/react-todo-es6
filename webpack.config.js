const webpack = require('webpack');

module.exports = {
  context: `${__dirname}/app`,
  // Точки входа
  entry: './app',

  watch: true,
  // Сколько ждать при изменении файла чтоб watch отработал
  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: 'inline-source-map',

  // Куда нужно выкладывать
  output: {
    path: `${__dirname}/public/build`,
    publicPath: '/build/',
    filename: '[name].js'
  },

  // Где икать обычные файлы (более быстрая сборка)
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  // Где искать лоадеры (более быстрая сборка)
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  // Модули
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules)/,
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
