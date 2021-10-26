const path = require('path')

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  mode: 'production',
  target: 'web',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'stoken.js',
    library: 'SToken',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
    publicPath: '/public/',
  },
  devServer: {
    hot: true,
    port: 3000,
    open: true,
    static: [
      {
        directory: path.join(__dirname, './'),
        publicPath: '/',
      },
    ],
  },
}
