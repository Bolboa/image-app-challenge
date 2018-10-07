import React from "react";
import ReactDOM from "react-dom";
import Main from "./screens/Routes.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";


ReactDOM.render((
  <Provider store={ store }>
    <BrowserRouter>
      <Main /> 
    </BrowserRouter>
  </Provider>
), document.getElementById("root"));