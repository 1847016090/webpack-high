const { merge } = require("webpack-merge");
const path = require("path");
const commonConfig = require("./webpack.common");
console.log(
  'path.join(__dirname, "public")',
  path.join(__dirname, "..", "public")
);
const devConfig = {
  mode: "development",
  devServer: {
    // contentBase: path.resolve(__dirname, "public"), // 静态文件目录
    static: {
      directory: path.join(__dirname, "..", "public")
    },
    open: true // 是否自动打开浏览器
  },

  devtool: "eval-source-map"
};

module.exports = () => {
  return merge(commonConfig, devConfig);
};
