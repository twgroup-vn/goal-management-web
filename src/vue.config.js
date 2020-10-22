module.exports = {
  devServer: {
    compress: true,
    disableHostCheck: true
  },
  publicPath: process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/'
    : 'http://localhost:8080/',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
};
