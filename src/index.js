import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";

import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import TodoReducer from "./reducers/todo.reducer";

const store = createStore(TodoReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
