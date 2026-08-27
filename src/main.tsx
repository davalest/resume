import {StrictMode} from "react";
import {hydrateRoot} from "react-dom/client";
import "./index.scss";
import "./styles/konamize.css";
import {I18nProvider} from "./i18n.tsx";
import App from "./App.tsx";

hydrateRoot(
    document.getElementById("root")!,
    <StrictMode>
        <I18nProvider>
            <App />
        </I18nProvider>
    </StrictMode>,
);
