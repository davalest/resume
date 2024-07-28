import {createBrowserRouter, Navigate} from "react-router-dom";
import {pathList} from "./constants.ts";
import {LanguageProvider} from "../language";
import Layout from "../../views/Layout.tsx";
import Home from "../../views/Home.tsx";
import Resume from "../../views/Resume.tsx";

export const router = createBrowserRouter([{
    path: pathList.root,
    element:
        <LanguageProvider>
            <Layout/>
        </LanguageProvider>,
    children: [
        {
            path: pathList.home,
            element: <Home/>,
        },
        {
            path: "",
            element: <Home/>,
        },
        {
            path: pathList.resume,
            element: <Resume/>,
        },
        {
            path: pathList.skills,
            element: <Resume/>,
        },
        {
            path: "*",
            element: <Navigate to={pathList.home}/>,
        }
    ]
}]);