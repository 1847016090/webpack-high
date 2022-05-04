const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  // 入口文件
  entry: "./src/main.ts",
  devServer: {
    open: true
  },
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: "bundle.js",
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.js$/, // enforce 默认为 normal 普通loader
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: 2
                }
              ]
            ], // 把es6转成es5
            plugins: ["@babel/plugin-transform-runtime"] //作用？
          }
        },
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      },
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: `[name]_[contenthash:8].css`
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  devtool: "eval-source-map"
};
