# 1 - 基于 深入浅出 Webpack 学习

1. [深入浅出 Webpack](http://webpack.wuhaolin.cn/)
2. [Webpack5 最佳实践](https://juejin.cn/post/7061165571252944926)
3. [Webpack 配置核心包的作用](https://juejin.cn/post/6986621723961475103)
4. [Airbnb 代码风格](https://github.com/airbnb/javascript)

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

## 12-配置 ESlint 代码检查

### 第一步 配置 Eslint 规则

- 创建 `.eslintrc.js`
- 配置以下的规则

```deep
module.exports = {
  globals: {
    // 脚本在执行期间访问的额外的全局变量。
    wx: true
  },
  env: {
    // 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量。
    browser: true,
    es2021: true
  },
  extends: [
    //继承一个配置文件可以被基础配置中的已启用的规则
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-airbnb-base"
  ],
  parser: "@typescript-eslint/parser", // Eslint 默认使用 Espree 作为其解析器，这里我们配置使用@typescript-eslint/parser
  parserOptions: {
    //指定解析的ES版本 12 == ES2021
    ecmaVersion: 12,
    sourceType: "module" //如果你的代码是 ECMAScript 模块
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "linebreak-style": 0, // 强制使用一致的换行风格
    "prefer-promise-reject-errors": 0, // 要求使用 Error 对象作为 Promise 拒绝的原因
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0,
    "no-unused-expressions": 0, // 禁止出现未使用过的表达式
    "func-names": 0, // 要求或禁止使用命名的 function 表达式
    "arrow-body-style": 0, // 要求箭头函数体使用大括号
    "no-async-promise-executor": 0, // 禁止使用异步函数作为 Promise executor
    "no-param-reassign": 0, // 禁止对 function 的参数进行重新赋值
    "@typescript-eslint/ban-types": 0,
    "import/prefer-default-export": 0,
    "arrow-parens": 0, //要求箭头函数的参数使用圆括号
    "no-use-before-define": 0, //禁止在变量定义之前使用它们
    "no-shadow": 0, // 禁止变量声明与外层作用域的变量同名
    eqeqeq: 0, // 要求使用 === 和 !==
    "object-curly-newline": ["error", { ObjectPattern: "never" }], // 强制大括号内换行符的一致性
    "no-console": 0, // 禁用 console
    semi: ["error", "never"], // 要求或禁止使用分号代替 ASI
    curly: ["error", "all"], // 强制所有控制语句使用一致的括号风格
    "no-param-reassign": [
      // 禁止对 function 的参数进行重新赋值
      "error",
      { props: true, ignorePropertyModificationsFor: ["state", "item"] }
    ],
    "brace-style": ["error", "1tbs", { allowSingleLine: false }], // 强制在代码块中使用一致的大括号风格
    camelcase: "off", // 强制使用骆驼拼写法命名约定
    "@typescript-eslint/no-empty-function": 0, // 空方法
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "max-len": ["error", { code: 160 }], // 强制一行的最大长度
    "no-unused-vars": 0, // 禁止出现未使用过的变量，需配合下面的规则使用
    "@typescript-eslint/no-unused-vars": ["error"] // 未使用的变量
  }
};
```

### 第二步 安装 `eslint`,并且将 `eslint-loader` 配置到`webpack.config.js`中

```deep
{
  test: /\.js$/,
  use: [
    {
      loader: "eslint-loader",
      options: {
        cache: true
      }
    }
  ],
  include: path.resolve(__dirname, "src"),
  exclude: /node_modules/
}
```

### 第三步 VScode 配置保存代码自动格式化代码

- 根目录新建`.vscode`文件夹
- 然后在`.vscode`下建立`setttings.json`文件

```deep
{
  "editor.tabSize": 2,
  "eslint.autoFixOnSave": true, // 每次保存的时候将代码按eslint格式进行修复
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true, //让函数(名)和后面的括号之间加个空格
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/dist": true
  },
  "window.title": "${dirty}${activeEditorMedium}${separator}${rootName}",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### 第四步 忽略不需要 Eslint 格式化的文件

- 创建`.eslintignore`文件
- 配置以下不需要格式化的文件/文件夹

```deep
node_modules/
dist/
.babelrc
.eslintrc.js
```

## 12-配置 Stylelint 代码检查

### 第一步 安装 `stylelint`,`stylelint-config-standard`

```deep
cnpm i -D stylelint stylelint-config-standard
```

### 第二步 创建`.stylelintrc`文件

- 填入以下的内容

```deep
{
  // 继承 stylelint-config-standard 中的所有检查规则
  "extends": "stylelint-config-standard",
  "rules": {
    "at-rule-empty-line-before": null
  }
}
```

### 第三步配置 忽略不需要 stylelint 检查的文件

- 创建 `.stylelintignore`

```

```

## 12-配置`.editorconfig` 帮助开发人员在不同的编辑器和 IDE 之间定义和维护一致的编码样式

- 根目录创建`.editorconfig`文件

```
## https://github.com/editorconfig/editorconfig-vscode

# 告诉EditorConfig插件，这是根文件，不用继续往上查找
root = true

# 匹配全部文件
[*]
# 结尾换行符，可选"lf"、"cr"、"crlf"
end_of_line = lf
# 在文件结尾插入新行
insert_final_newline = true
# 删除一行中的前后空格
trim_trailing_whitespace = true
# 匹配js和py结尾的文件
[*.{js,py}]
# 设置字符集
charset = utf-8

# 匹配py结尾的文件
[*.py]
# 缩进风格，可选"space"、"tab"
indent_style = space
# 缩进的空格数
indent_size = 4

# 以下匹配，类同
[Makefile]
indent_style = tab
# tab的宽度
tab_width = 4

# 以下匹配，类同
[lib/**.js]
indent_style = space
indent_size = 2

[{package.json,.travis.yml}]
indent_style = space
indent_size = 2

```
