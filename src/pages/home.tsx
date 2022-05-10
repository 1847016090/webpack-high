import * as React from "react";
import { useState, useEffect } from "react";

const Home = () => {
  const [text, setText] = useState<string>("sdfasdfasfdasfasfa");

  useEffect(() => {
    let timer: NodeJS.Timer = setTimeout(() => {
      setText("我的文字改变啦！！！");
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
