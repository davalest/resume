import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './views/App.tsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Resume from "./views/Resume.tsx";
import Layout from "./views/Layout.tsx";
import './i18n';
import {LanguageProvider} from "./contexts/Language.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element:
            <LanguageProvider>
                <Layout/>
            </LanguageProvider>,
        children: [
            {
                path: "home",
                element: <App/>,
            },
            {
                path: "",
                element: <App/>,
            },
            {
                path: "resume",
                element: <Resume/>,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
