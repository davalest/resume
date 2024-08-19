import Intro from "./intro/intro.tsx";
import Info from "./info/info.tsx";
import "./personal.scss"
import Hero from "./hero/hero.tsx";

const Personal = () => {

    return (
        <>
            <Hero/>
            <Intro/>
            <div style={{display: "flex", padding:"50px 0",
                placeContent:"center"}}>
                <div style={{width:"40%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <div style={{
                        backgroundColor: "#46ABB7",
                        borderRadius: 15,
                        display:"flex",
                        placeContent:"center",
                        color: "white", width: 80, height: 25,
                        padding: "5px 10px",
                    }}>
                        SOBRE MI
                    </div>
                </div>
                <div style={{width:"60%"}}>
                    <Info/>
                </div>

            </div>
        </>
    )
}

export default Personal
