import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomepageTablet } from "./screens/HomepageTablet/HomepageTablet";

createRoot(document.getElementById("app") as HTMLElement).render(
    <StrictMode>
        <HomepageTablet />
    </StrictMode>,
);
