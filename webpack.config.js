const path = require("path");
const webpack = require("webpack");
const { argv } = require("yargs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanObsoleteChunks = require("webpack-clean-obsolete-chunks");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const isProduction = !!((argv.env && argv.env.production) || argv.p);

const jsChunkFilename =
  argv.forcedCache || isProduction ? "[name].[chunkhash:5].chunk.js" : "[name].chunk.js?t=[chunkhash:5]";

const srcPath = path.join(__dirname, "/src");

module.exports = {
  mode: isProduction ? "production" : "development",
  context: srcPath,
  entry: {
    main: [path.join(srcPath, "/scripts/main.js"), path.join(srcPath, "/styles/main.scss")],
  },
  output: {
    path: path.join(__dirname, "/theme/assets"),
    chunkFilename: jsChunkFilename,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: "../",
              hmr: process.env.NODE_ENV === "development",
            },
          },
          {
            loader: "css-loader",
            options: { url: false },
          },
          { loader: "postcss-loader" },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    modules: [srcPath, "node_modules"],
    enforceExtension: false,
  },
  externals: {
    jquery: "jQuery",
  },
  optimization: {
    splitChunks: {
      automaticNameDelimiter: "-",
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].scss.liquid?t=[chunkhash:5]",
      chunkFilename: "[id].chunk.scss.liquid?t=[chunkhash:5]",
      ignoreOrder: false,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: isProduction,
      debug: !isProduction,
      stats: { colors: true },
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
    new CleanObsoleteChunks(),
    new BundleAnalyzerPlugin({
      analyzerMode: isProduction ? "static" : "disabled",
      reportFilename: "webpack-bundle-report.html",
    }),
  ],
};
