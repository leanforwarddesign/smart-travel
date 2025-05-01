import React from "react";  // Fix the typo from "Read" to "React"
import ReactDOMClient from "react-dom/client";
import App from "./App.tsx";

const app = document.getElementById("app");
const root = ReactDOMClient.createRoot(app);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);