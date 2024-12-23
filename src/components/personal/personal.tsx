import Intro from "./intro/intro.tsx";
import Info from "./info/info.tsx";
import "./personal.scss"
import Hero from "./hero/hero.tsx";

const Personal = () => {

    return (
        <>
            <Hero/>
            <Intro/>
            <Info/>
        </>
    )
}

export default Personal
