# 基于 深入浅出 Webpack 学习

1. [深入浅出 Webpack](http://webpack.wuhaolin.cn/)

## 1. webpack 安装和使用

### **第一步**：初始化仓库生成 package.json 文件

```
npm init -y
```

### **第二步**：安装 `webpack`

```
npm i -D webpack webpack-cli
```

### **第三步**：新建 `show.js` 和 入口文件 `main.js`

> 如项目代码所示，在入口文件 `main.js` 里面调用 `show` 方法

### **第四步**配置 webpack.config.js

- 配置入口文件 `entry`
- 配置输出文件名以及输出的文件夹 `output`

```deep
const path = require("path");

module.exports = {
  entry: "./main.js",
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: "bundle.js",
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, "./dist")
  }
};

```

### **第五步**在`package.json`中配置打包命令

- 使用 `--config` 在使用我们自定义的打包配置来进行打包

```
"scripts": {
  "build": "webpack --config webpack.config.js"
},
```
