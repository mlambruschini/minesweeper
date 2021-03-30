import React from "react";
import ReactDOM from "react-dom";
import "./main/view/index.css";
import App from "./main/view/App";
import reportWebVitals from "./main/view/reportWebVitals";
import { Provider } from "react-redux";
import initStore from "./main/view/config/store";

const store = initStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
