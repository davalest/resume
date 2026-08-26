import {useEffect, useRef} from "react";
import {navSectionIds, navSections, sectionIds} from "../../navigation.ts";
import {useActiveSection} from "../../utils/useActiveSection.ts";
import {languageNames, pathForLanguage, supportedLanguages, useI18n} from "../../i18n.tsx";
import "./header.scss";

const Header = () => {
    const {t, pick, language: currentLanguage, switchTo} = useI18n();
    const activeSection = useActiveSection(navSectionIds);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const content = contentRef.current;
        if (!content) {
            return;
        }

        const root = document.documentElement;
        const observer = new ResizeObserver(([entry]) => {
            if (!entry) {
                return;
            }
            const design =
                parseFloat(getComputedStyle(root).getPropertyValue("--header-height-design")) || 0;
            const needed = Math.ceil(entry.contentRect.height) + 8;


            if (needed > design) {
                root.style.setProperty("--header-height", `${needed}px`);
            } else {
                root.style.removeProperty("--header-height");
            }
        });

        observer.observe(content);
        return () => observer.disconnect();
    }, []);

    return (
        <header className="header-container">
            <div className="header-content" ref={contentRef}>
                <a className="header-identity" href={`#${sectionIds.hero}`}>
                    <span className="header-name">{t("header.name")}</span>
                    <span className="header-role">{t("header.role")}</span>
                </a>

                <nav className="header-navigation">
                    {navSections.map(({id, label}) => (
                        <a
                            key={id}
                            className={`nav-link ${activeSection === id ? "active" : ""}`}
                            href={`#${id}`}
                            aria-current={activeSection === id ? "location" : undefined}
                        >
                            {pick(label)}
                        </a>
                    ))}
                    <div
                        className="lang-switch"
                        role="group"
                        aria-label={t("header.language_label")}
                    >
                        {supportedLanguages.map((language) => (
                            <a
                                key={language}
                                className={`lang-link ${language === currentLanguage ? "active" : ""}`}
                                href={pathForLanguage(language)}
                                hrefLang={language}
                                lang={language}
                                aria-current={language === currentLanguage ? "page" : undefined}
                                onClick={(event) => {
                                    if (
                                        event.button !== 0 ||
                                        event.metaKey ||
                                        event.ctrlKey ||
                                        event.shiftKey ||
                                        event.altKey
                                    ) {
                                        return;
                                    }
                                    event.preventDefault();
                                    switchTo(language);
                                }}
                            >
                                {language}
                                <span className="visually-hidden"> {languageNames[language]}</span>
                            </a>
                        ))}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
