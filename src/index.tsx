import * as React from "react";
import * as ReactDom from "react-dom";

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

ReactDom.render(<App />, document.getElementById("app"));
