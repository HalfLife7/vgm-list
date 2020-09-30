// https://ssr.vuejs.org/guide/css.html#enabling-css-extraction
// https://vue-loader.vuejs.org/guide/#manual-setup
// webpack.config.js
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          // enable CSS extraction
          extractCSS: isProduction,
        },
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: isProduction
          ? ExtractTextPlugin.extract({
              use: "css-loader",
              fallback: "vue-style-loader",
            })
          : ["vue-style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    isProduction
      ? [new ExtractTextPlugin({ filename: "common.[chunkhash].css" })]
      : [],
    // it is common to extract deps into a vendor chunk for better caching.
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function(module) {
        // a module is extracted into the vendor chunk when...
        return (
          // if it's inside node_modules
          /node_modules/.test(module.context) &&
          // do not externalize if the request is a CSS file
          !/\.css$/.test(module.request)
        );
      },
    }),
    // extract webpack runtime & manifest
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
    }),
  ],
};
