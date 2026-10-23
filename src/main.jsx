// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@/config";
import App from "./App.jsx";
import 'lenis/dist/lenis.css'
import { ThemeProvider } from "./theme/ThemeProvider.jsx";
import { ToastContainer } from "react-toastify";
import store from "@/redux/store";
import { Provider } from "react-redux";
import ClickSpark from "./utils/clickSpark/ClickSpark";
import Lenis from 'lenis'

// Global recovery handler for Vite dynamic import preload failures (new deployments / chunk mismatches)
if (typeof window !== "undefined") {
  window.addEventListener("vite:preloadError", (event) => {
    event.preventDefault();
    const KEY = "tu_vite_preload_reload";
    try {
      const lastReload = sessionStorage.getItem(KEY);
      const now = Date.now();
      // Reload at most once every 20 seconds to prevent refresh loops
      if (!lastReload || now - Number(lastReload) > 20000) {
        sessionStorage.setItem(KEY, String(now));
        window.location.reload();
      } else {
        console.error("[Vite] Repeated dynamic import preload failure:", event);
      }
    } catch {
      window.location.reload();
    }
  });
}

// Initialize Lenis smooth scroll
new Lenis({
  autoRaf: true,
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <ToastContainer />
      <ClickSpark
        sparkColor='#ca0019'
        sparkSize={20}
        sparkRadius={45}
        sparkCount={8}
        duration={500}
      >
        <App />
      </ClickSpark>
    </ThemeProvider>
  </Provider>
);
