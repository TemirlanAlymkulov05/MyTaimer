import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { rootReducers } from "./store/reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "react-circular-progressbar/dist/styles.css";
import "antd/dist/antd.css";
const store = createStore(rootReducers);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
