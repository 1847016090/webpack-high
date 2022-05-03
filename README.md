# 1 - 基于 深入浅出 Webpack 学习

1. [深入浅出 Webpack](http://webpack.wuhaolin.cn/)

## 1. webpack 安装和使用

### **第一步**：初始化仓库生成 package.json 文件

```deep
npm init -y
```

### **第二步**：安装 `webpack`

```deep
cnpm i -D webpack webpack-cli
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

```deep
"scripts": {
  "build": "webpack --config webpack.config.js"
},
```

## 2 - 使用 Loader 加载 css

### **第一步**安装`style-loader`,`css-loader`

```deep
cnpm i -D style-loader css-loader
```

### **第二步**配置 webpack.config.js

```deep
// module => rules 新增加载css的loader规则

module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
```

## 3 - 使用 plugin 添加额外的功能

### **第一步**安装 `mini-css-extract-plugin`和`html-webpack-plugin`

```deep
cnpm i -D mini-css-extract-plugin html-webpack-plugin
```

### **第二步**配置`webpack.config.js`

修改 loader:

```deep
module: {
  rules: [
    {
      // 用正则去匹配要用该 loader 转换的 CSS 文件
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"]
    }
  ]
}
```

修改 plugin:

```deep
plugins: [
  new HtmlWebpackPlugin({
    // 输出的文件名
    filename: "index.html",
    // 引入的模版html
    template: "./index.html"
  }),
  new MiniCssExtractPlugin({
    // 输出的css名字
    filename: `[name]_[contenthash:8].css`
  })
]
```

## 4 - 使用 DevServer

### **第一步**安装`webpack-dev-server`

```deep
npm i -D webpack-dev-server
```

### **第二步**配置 package.json

1. 配置热替换 `--hot`
2. 配置 source map `--devtool source-map`

```deep
"scripts": {
  "start": "webpack-dev-server --config webpack.config.js --hot --devtool source-map"
},
```
