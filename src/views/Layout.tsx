import {Outlet} from "react-router-dom";
import Header from "../components/header/header.tsx";
import Footer from "../components/footer/footer.tsx";
import "../index.css"

function Layout() {
    return (
        <>
            <Header/>
            <div className="layout">
                <Outlet/>
            </div>
            <Footer/>
        </>
    )
}

export default Layout
