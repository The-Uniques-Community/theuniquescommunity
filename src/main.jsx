// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./theme/ThemeProvider.jsx";
import { ToastContainer } from "react-toastify";
import store from "@/redux/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <ToastContainer />
      <App />
    </ThemeProvider>
  </Provider>
);
