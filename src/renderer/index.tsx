import React from "react";
import ReactDOM from "react-dom";
import App from "./View/App";
import { Provider } from "react-redux";
import store from "./State/AppStore";

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById("app"));
