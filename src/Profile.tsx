import Hero from "./sections/hero/hero.tsx";
import Experience from "./sections/experience/experience.tsx";
import Stack from "./sections/stack/stack.tsx";
import About from "./sections/about/about.tsx";
import Education from "./sections/education/education.tsx";
import Contact from "./sections/contact/contact.tsx";
import Divider from "./ui/divider/divider.tsx";

const Profile = () => (
    <>
        <Hero />
        <Divider />
        <Experience />
        <Divider />
        <Stack />
        <Divider />
        <About />
        <Divider />
        <Education />
        <Divider />
        <Contact />
    </>
);

export default Profile;
