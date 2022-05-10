const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "none"
};

module.exports = () => {
  return merge(commonConfig, prodConfig);
};
