// React
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";

// Components
import App from "./App";
import TeamSelect from "./components/TeamSelect";

// React Redux
import { Provider } from "react-redux";
import store from "./store/store";

// CSS
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TeamSelect />} />
          <Route path="/home" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
