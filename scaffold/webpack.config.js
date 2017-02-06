module.exports = {
  entry: {
    ngApp: './client/ngApp/app.component.js',
    reactApp: [
      './client/reactApp/App.component.jsx'
    ]
  },
  output: {
    path: __dirname + '/client',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components|reactApp)/,
        loader: ['ng-annotate-loader', 'babel-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|ngApp)/,
        loader: ['react-hot-loader','babel-loader?presets[]=react,presets[]=es2015,plugins[]=transform-react-jsx']
      }
    ]

  }
};
