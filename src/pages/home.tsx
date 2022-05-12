import * as React from "react";
import { useState, useEffect } from "react";

// import { fetch } from "@/rapper";

const Home = () => {
  const [text, setText] = useState<string>("sdfasdfasfdasfasfa");
  useEffect(() => {
    // getuser();
    let timer: NodeJS.Timer = setTimeout(() => {
      setText("我的文字改变啦！！！");
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  // const getuser = async () => {
  //   const res = await fetch["GET/getUserList"]();
  //   console.log("res", res);
  // };
  return (
    <div>
      {text}
      <img src="../image/Load2.gif" alt="22" />
      <div>我是图标：</div>
      <i className="iconfont icon-yiliao_jingzhui"></i>
    </div>
  );
};

export default Home;
