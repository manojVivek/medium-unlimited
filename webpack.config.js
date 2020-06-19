const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: ['babel-polyfill', './src/background.js'],
  },
  output: {
    filename: '[name].bundle.js',
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
