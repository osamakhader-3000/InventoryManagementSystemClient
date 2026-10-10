import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import './shared/ui/i18n/i18n.ts'; // Import i18n configuration

const root = createRoot(document.getElementById("root")!);


    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    );
