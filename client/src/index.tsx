import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import "./assets/css/index.sass";
import reportWebVitals from "./reportWebVitals";

const container: HTMLElement = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();