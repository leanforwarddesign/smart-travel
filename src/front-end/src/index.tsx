import Read from "react";
import ReactDOMClient from "react-dom/client";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);

import App from "./App.tsx";

root.render(
    <App />
);
