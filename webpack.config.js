const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SRC_PATH = path.join(__dirname, "src");

module.exports = {
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
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".scss"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
    library: "scrivito-another-cookie-banner",
    globalObject: "this",
  },
  mode: "production",
};
