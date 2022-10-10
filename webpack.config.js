const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SRC_PATH = path.join(__dirname, "src");

module.exports = {
  optimization: {
    minimize: false
  },
  entry: {
    index: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [SRC_PATH],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-react",
                [
                  "@babel/preset-env",
                  {
                    debug: false,
                    modules: false,
                    shippedProposals: false,
                    useBuiltIns: false,
                  },
                ],
              ],
              cacheDirectory: "tmp/babel-cache",
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        type: "asset/inline",
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' }, 
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".scss"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  externals: {
    "@fortawesome/fontawesome-free": "@fortawesome/fontawesome-free",
    classnames: "classnames",
    lodash: "lodash",
    "lodash-es": "lodash-es",
    "parse-domain": "parse-domain",
    react: "react",
    // "react-bootstrap": "react-bootstrap",
    "react-cookie": "react-cookie",
    "react-dom": "react-dom"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    library: "scrivito-another-cookie-banner",
    globalObject: "this",
    assetModuleFilename: "./[name][ext]"
  },
  mode: "production",
};
