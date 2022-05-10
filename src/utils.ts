import * as React from "react";
export const init = (WrapComponent?: any): React.ReactElement => {
  console.log("装饰器执行");
  return WrapComponent;
};
