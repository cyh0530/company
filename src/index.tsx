import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { initGA } from "./utils/ga";
import "antd/dist/antd.css";

initGA();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
