
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";


import App from "./App";
import { store } from "./pages/services/store.js"
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastProvider } from "./global/Tostify.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="895349577404-431jvovnkhfvnktdej80bgffc4efc161.apps.googleusercontent.com">

      <Provider store={store}>

        <ToastProvider>
          <BrowserRouter>

            {/* <HelmetProvider> */}
            <App />
            {/* </HelmetProvider> */}

          </BrowserRouter>
        </ToastProvider>
      </Provider>
    </GoogleOAuthProvider >
  </React.StrictMode>

);

