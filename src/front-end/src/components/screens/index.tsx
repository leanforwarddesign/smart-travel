import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomepageMockUp } from "./screens/HomepageMockUp/HomepageMockUp";

createRoot(document.getElementById("app") as HTMLElement).render(
    <StrictMode>
        <HomepageMockUp />
    </StrictMode>,
);
