import React from "react";

export const Context = React.createContext({
  clickMenu: (menu: any) => {},
  clickItem: (item: any) => {},
  height: 24
})