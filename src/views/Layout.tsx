import {Outlet} from "react-router-dom";
import Header from "../components/header/header.tsx";
import Footer from "../components/footer/footer.tsx";


function Layout() {
    return (
        <div style={{width:"100%"}}>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Layout
