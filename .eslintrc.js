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
