// @ts-ignore
import HeaderNav from "./HeaderNav";

// @ts-ignore
import Workspace from "./Workspace";

import "../resources/styles/html.css";
import React from "react";

export const App = () => {
  return (
    <React.StrictMode>
      <div id="app">
        <HeaderNav />
        <Workspace />
      </div>
    </React.StrictMode>
  );
};

export default App;
