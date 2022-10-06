import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";

import "./assets/styles/index.scss";

import { BrowserRouter } from "react-router-dom";

import { store } from "./store/index";
import { Provider } from "react-redux"; // redux 사용
import { CookiesProvider } from "react-cookie"; // cookie 사용

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
