import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware} from "redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app";
import Cart from "../src/components/pages/cart";
import reducers from "./reducers";
// import cartReducer from './actions/cartReducer';
import { GoogleOAuthProvider } from '@react-oauth/google';

import "./style/main.scss";

// const rootReducer = combineReducers({
//   ...reducers,
//   cart: cartReducer,
// })
const createStoreWithMiddleware = applyMiddleware()(createStore);

// const stores = createStore(rootReducer, createStoreWithMiddleware(reducers, rootReducer));

function main() {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <GoogleOAuthProvider clientId="689727145528-h608dbh1t3ci50ckvevlc1mstuvgggr9.apps.googleusercontent.com" >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>,
    document.querySelector(".app-wrapper")
  );
}

document.addEventListener("DOMContentLoaded", main);
