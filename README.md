# 1 - 基于 深入浅出 Webpack 学习

1. [深入浅出 Webpack](http://webpack.wuhaolin.cn/)
2. [Webpack5 最佳实践](https://juejin.cn/post/7061165571252944926)

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

## 5 - 核心概念

通过之前几节的学习，相信你已经对 Webpack 有了一个初步的认识。虽然 Webpack 功能强大且配置项多，但只要你理解了其中的几个核心概念，就能随心应手地使用它。 Webpack 有以下几个核心概念。

- **Entry**：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
- Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- **Chunk**：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- **Loader**：模块转换器，用于把模块原内容按照需求转换成新内容。
- **Plugin**：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
- **Output**：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。

Webpack 启动后会从 Entry 里配置的 Module 开始递归解析 Entry 依赖的所有 Module。 每找到一个 Module， 就会根据配置的 Loader 去找出对应的转换规则，对 Module 进行转换后，再解析出当前 Module 依赖的 Module。 这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。最后 Webpack 会把所有 Chunk 转换成文件输出。 在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑。

## 6 - 使用 ES6 + 语法

### **第一步**安装依赖

1. `babel-loader`,Webpack 和 babel 通信的桥梁，目的是将转化 ES6+代码到 ES5
2. `@babel/preset-env`,包含了大部分 ES6 转化成 ES5 的规则
3. `@babel/polyfill`, 解析更加高级的语法，比如 Promise 等
4. `@babel/plugin-transform-runtime`，提供辅助函数的作用，例如帮助引入公共的方法，一般和`@babel/runtime`一起使用

#### 安装

```deep
npm i @babel/core babel-loader @babel/preset-env @babel/plugin-transform-runtime -@babel/polyfill -D
```

#### 配置

```deep
rules: [
  {
    test: /\.js$/, // enforce 默认为 normal 普通loader
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          [
            "@babel/preset-env", // 把es6转成es5
            {
              // 按需引入polyfiil里面的高级语法解析规则
              useBuiltIns: "usage",
              corejs: 2
            }
          ]
        ],
        plugins: ["@babel/plugin-transform-runtime"] //作用？
      }
    },
    include: path.resolve(__dirname, "src"),
    exclude: /node_modules/
  }
]
```

## 7 - 使用 Typescript

### **第一步**安装`typescript`和`ts-loader`

**查看你安装的第三方的库所需要的类型**, [查询链接](https://www.typescriptlang.org/dt/search?search=)

```deep
cnpm i -D typescript ts-loader
```

### **第二步**新建`tsconfig.json`

配置 tsconfig.json

```deep
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  }
}
```

### **第三步**配置 webpack.config.js

```deep
{
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
}
```

### **第四步**新建 main.ts，并且修改`webapck.config.js`文件入口路径以及文件名就 OK 了

```deep
{
  entry: "./src/main.ts",
}
```

## 8-使用 Sass

### 第一步 安装依赖 `node-sass`和`sass-loader`

#### 具体的处理流程

- 通过 sass-loader 把 SCSS 源码转换为 CSS 代码，再把 CSS 代码交给 css-loader 去处理。
- css-loader 会找出 CSS 代码中的 @import 和 url() 这样的导入语句，告诉 Webpack 依赖这些资源。同时还支持 CSS Modules、压缩 CSS 等功能。处理完后再把结果交给 style-loader 去处理。
- style-loader 会把 CSS 代码转换成字符串后，注入到 JavaScript 代码中去，通过 JavaScript 去给 DOM 增加样式。

```deep
cnpm i sass-loader node-sass -D
```

### 第二步 配置`webpack.config.js`

```deep
{
  modules: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  }
}
```

### 第三步 编写`testSass.scss`文件并且在`main.ts`中引入

### 执行`yarn build`

## 9 - 使用 Postcss

### 第一步 安装依赖

- `postcss-loader`依赖`postcss`
- `autoprefixer`可以为 css 属性添加前缀，兼容不同的浏览器

```deep
cnpm i -D postcss postcss-loader autoprefixer
```

### 第二步 根目录 创建 `postcss.config.js`并且引入`autoprefixer`

> 这里也可以用`postcss-preset-env`,它会自动添加所需的`polyfill`，同时也可以自动帮助我们添加`autoprefixer`

```deep
module.exports = {
  plugins: [require("autoprefixer")]
};

```

### 第三步 配置 `webpack.config.js`

```deep
{
  modules: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        // 等css预处理器将scss样式转化为css样式再给其添加前缀兼容浏览器
        "postcss-loader",
        "sass-loader"
      ]
    }]
  }
}
```

## 10-使用 React 框架

###  第一步 安装依赖

- 配置 babel 转译
- 安装 `react` `react-dom`

```deep
cnpm i -D @babel/preset-react

cnpm i -D react react-dom
```

### 第二步 配置`.babelrc`，引入`preset-react`

```deep
{
  "presets": [
    "@babel/preset-react"
  ]
}
```

### 第三步 在新增`index.tsx` 并且新增以下代码

```deep
import * as React from "react";
import * as ReactDom from "react-dom";

const App = (): React.ReactElement => {
  const a: string = "1111111dsafdfsfa111";
  return <div>{a}</div>;
};

ReactDom.render(<App />, document.getElementById("app"));
```

### 第四步 修改`webpack.config.js` 的入口`entry`为`index.tsx`并且打包编译成功

```deep
{
  entry: './src/index.tsx'
}
```

### 第五步 引入 React 对应的类型

#### 1. 安装`react`,`react-dom`的类型

```deep
cnpm i @types/react @types/react-dom -D
```

#### 2. 配置`tsconfig.json`

```deep
{
  "compilerOptions": {
    "jsx": "react",
  }
}
```

#### 然后就 OK 了

## 11-使用图片

### 第一步 配置`webpack.config.js`

- 设置 type 为`asset`
- 当图片当于 8kb，会将图片资源拷贝到 dist/img 下面并且以哈希命名
- 当图片小于 8kb，会将图片转化为 base64 注入到代码里面

```
// webpack 5.0不需要使用 url-loader, file-loader, raw-loader，直接使用asset来配置

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
```

### 第二步 在`scss`文件中引入背景图片

```
#app {
  background: url(./assets/img/feeds.png);
}
```

### 执行 `yarn build` 查看浏览器显示的图片路径
