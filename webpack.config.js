const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: "file-loader",
      },
    ],
  },
  devServer: {
    // contentBase: './dist',  // Old
    static: "./dist", // New
    // ... other options
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // source html
      filename: "index.html", // output file
    }),
  ],
};
