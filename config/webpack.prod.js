const path = require("path");
const { merge } = require("webpack-merge");

/** 打包分析器 */
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

/**webpack5.0 压缩CSS */
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

/** 压缩JS */
const terserWebpackPlugin = require("terser-webpack-plugin");

/** CSS 摇树 */
const PurgeCssWebpackPlugin = require("purgecss-webpack-plugin");

/** 匹配文件/文件夹路径 */
const glob = require("glob");

const commonConfig = require("./webpack.common");

/**配置只对src目录进行摇树 */
const cssTreeShakingPath = path.resolve(process.cwd(), "./src");

/** 生产环境配置 */
const prodConfig = {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin({
        include: /\/src/,
        exclude: /\/node_modules/,
        parallel: true
      }),
      new terserWebpackPlugin({
        include: /\/src/,
        exclude: /\/node_modules/,
        parallel: true
      })
    ]
  },
  plugins: [
    new PurgeCssWebpackPlugin({
      paths: glob.sync(`${cssTreeShakingPath}/**/*`, { nodir: true })
    })
  ]
};

/** 打包分析器配置 */
const analyzerConfig = {
  plugins: [
    // 配置插件
    new BundleAnalyzerPlugin({
      // analyzerMode: 'disabled',  // 不启动展示打包报告的http服务器
      generateStatsFile: true // 是否生成stats.json文件
    })
  ]
};

module.exports = (env, argv) => {
  switch (process.env.NODE_ENV) {
    /** 打包分析器 */
    case "analyze":
      return merge(commonConfig, prodConfig, analyzerConfig);
    /** 生产环境配置 */
    case "prod":
      return merge(commonConfig, prodConfig);
    default:
      return merge(commonConfig, prodConfig);
  }
};
