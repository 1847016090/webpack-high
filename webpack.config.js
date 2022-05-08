const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  // 入口文件
  entry: "./src/index.tsx",
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
        test: /\.js$/, // enforce 默认为 normal 普通 loader
        use: [
          "babel-loader",
          {
            loader: "eslint-loader",
            options: {
              cache: true
            }
          }
        ],
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      },
      {
        test: /\.(s?)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|svg|gif)/i,
        type: "asset",
        generator: {
          filename: "img/[hash][ext][query]" // 局部指定输出位置
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 限制于 8kb
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: `css/[name]_[contenthash:8].css`
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  devtool: "eval-source-map"
};
