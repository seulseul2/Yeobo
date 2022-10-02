import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.scss";
import App from "./pages/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      {/* <Provider> */}
      <App />
      {/* </Provider> */}
    </React.StrictMode>
  </BrowserRouter>
);