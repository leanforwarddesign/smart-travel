import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomepageMvp } from "./homepage_mockup/homepage_mockup";

createRoot(document.getElementById("app") as HTMLElement).render(
    <StrictMode>
        <HomepageMvp />
    </StrictMode>,
);
