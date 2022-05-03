// import "@babel/polyfill";
// 通过 CommonJS 规范导入 CSS 模块
// require("./main.css");
import "./main.css";
// 通过 CommonJS 规范导入 show 函数
import show from "./show";
// 执行 show 函数
show("Webpa22222ck");

const myPromise = new Promise().resolve(111);

myPromise().thne(res => console.log("res", res));
