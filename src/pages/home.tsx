import * as React from "react";
import { useState, useEffect } from "react";

const Home = () => {
  const [text, setText] = useState("sdfasdfasfdasfasfa");
  useEffect(() => {
    let timer: NodeJS.Timer = setTimeout(() => {
      setText("我的文字改变啦！！！");
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return <div>{text}</div>;
};

export default Home;
