
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// npm uninstall react-helmet-async

import App from "./App.jsx";
import { store }  from "./pages/services/store.js"
import "./index.css";
import  StateProvider  from "./context/StateContext.jsx"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <StateProvider>
            {/* <HelmetProvider> */}
              <App />
            {/* </HelmetProvider> */}
        </StateProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

 