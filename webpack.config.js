var webpack = require('webpack');

module.exports = {
  entry: ['./assets/js/views/Merchant/index.js'],
  output: {
    path: __dirname,
    filename: './assets/js/views/Merchant/bundle.js'
  },
  module: {
    rules: [
      // 指定.js檔的loader
      {
        test: /\.js$/,
        use: [
          {loader: 'babel-loader'}
        ],
        exclude: /node_modules/
      },
      // 指定.vue檔的loader
      {
        test: /\.vue$/,
        use: [
          {loader: 'vue-loader'}
        ]
      },
      // 指定.css檔的loader
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "sass-loader"}
        ]
      },
      // 指定.eot,svg,ttf,woff,woff2的loader
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {loader: 'file-loader?name=public/fonts/[name].[ext]'}
        ]
      }
    ]
  },
  resolve: {
    /**
     * Vue v2.x 之後 NPM Package 預設只會匯出 runtime-only 版本
     */
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      'root.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      _: 'underscore',
    })
  ]
};

