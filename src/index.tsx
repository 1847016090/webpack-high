import * as React from "react";
import * as ReactDom from "react-dom";
// import "./assets/img/feeds.png";
import "@/assets/img/feeds.png";
import "@/fonts/iconfont.css";
import "./testSass.scss";
const a = 1;
import Home from "./pages/home";

const App = (): React.ReactElement => {
  const a: string = "1111111dsafdfsfa111";
  return (
    <div>
      {a}
      <Home />
    </div>
  );
};

const aa =
  "sdafdafdfasfasfsdafsdfasdfsdfasdfasdfasdfasdfasdfasfdasdfasdfasfasdfasaassdafdafdfasfassssdafdafdfasfassdafdafdfasfas";

ReactDom.render(<App />, document.getElementById("app"));
