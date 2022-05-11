const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const WebpackBar = require("webpackbar");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
console.log(
  'path.resolve(__dirname, "../src")',
  path.resolve(__dirname, "../src")
);
const config = {
  // 入口文件
  entry: path.join(__dirname, "..", "src/index.tsx"),
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: "bundle.js",
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, "..", "./dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/, // enforce 默认为 normal 普通 loader
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          {
            loader: "thread-loader", // 开启多进程打包
            options: {
              worker: 3
            }
          },
          {
            loader: "babel-loader",
            options: {
              cache: true
            }
          },
          {
            loader: "eslint-loader",
            options: {
              cache: true
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
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
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: "asset",
        generator: {
          // 输出文件位置以及文件名
          filename: "[name][hash:8][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 超过100kb不转 base64
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "../src")
    },
    modules: [path.resolve(__dirname, "../src"), "node_modules"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html"
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `css/[name]_[contenthash:8].css`
    }),
    new WebpackBar()
  ]
};

module.exports = config;
