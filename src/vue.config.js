module.exports = {
  runtimeCompiler: true,
  devServer: {
    compress: true,
    disableHostCheck: true
  },
  publicPath: '/goal-management-web/',
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
