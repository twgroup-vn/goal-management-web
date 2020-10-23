module.exports = {
  runtimeCompiler: true,
  devServer: {
    compress: true,
    disableHostCheck: true
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/goal-management-web/' : '',

};
