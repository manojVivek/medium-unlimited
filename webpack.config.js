const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background.js',
    main: './src/medium-unlocker.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        {from: 'static', to: 'static'},
        {from: 'src/html', to: 'html'},
        {from: 'manifest.json', to: 'manifest.json'},
      ],
      {debug: true, context: '.'}
    ),
  ],
};
