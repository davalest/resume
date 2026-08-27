import {useEffect} from "react";
import {useEasterEgg} from "./ui/konamize/useEasterEgg.ts";
import {useI18n} from "./i18n.tsx";
import {applySeoMetadata} from "./utils/seoHead.ts";
import Header from "./layout/header/header.tsx";
import Footer from "./layout/footer/footer.tsx";
import ErrorBoundary from "./layout/errorBoundary/errorBoundary.tsx";
import Profile from "./Profile.tsx";

const App = () => {
    const {t, language} = useI18n();

    useEasterEgg();

    useEffect(() => {
        applySeoMetadata(language, t);
    }, [language, t]);

    return (
        <>
            <a className="skip-link" href="#content">
                {t("a11y.skip_to_content")}
            </a>

            <Header />
            <main className="layout" id="content" tabIndex={-1}>
                <ErrorBoundary>
                    <Profile />
                </ErrorBoundary>
            </main>
            <Footer />
        </>
    );
};

export default App;
