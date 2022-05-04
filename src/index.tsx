import * as React from "react";
import * as ReactDom from "react-dom";

const App = (): React.ReactElement => {
  const a: string = "1111111dsafdfsfa111";
  return <div>{a}</div>;
};

ReactDom.render(<App />, document.getElementById("app"));
