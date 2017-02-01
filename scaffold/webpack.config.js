module.exports = {
  entry: {
    app: './client/app/app.component.js'
  },
  output: {
    path: __dirname + '/client',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: ['ng-annotate-loader', 'babel-loader']
      }
    ]
  }
};
