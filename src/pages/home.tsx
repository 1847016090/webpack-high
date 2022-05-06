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
      <img src={"@/assets/img/feeds.png"} alt="22" />
    </div>
  );
};

export default Home;
