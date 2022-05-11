const { merge } = require("webpack-merge");

/** 打包分析器 */
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const commonConfig = require("./webpack.common");

/** 生产环境配置 */
const prodConfig = {
  mode: "none"
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
