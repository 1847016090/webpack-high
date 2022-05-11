const { merge } = require("webpack-merge");
const path = require("path");
const commonConfig = require("./webpack.common");

const cacheDirectory = path.resolve(
  process.cwd(),
  "./node_modules/.cache/temp_cache"
);

const devConfig = {
  mode: "development",
  cache: {
    type: "filesystem",
    cacheDirectory
  },
  devServer: {
    // contentBase: path.resolve(__dirname, "public"), // 静态文件目录
    static: {
      directory: path.join(__dirname, "..", "public")
    },
    open: true // 是否自动打开浏览器
  },

  devtool: "eval-cheap-module-source-map"
};

module.exports = () => {
  return merge(commonConfig, devConfig);
};
