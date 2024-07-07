import { createContext, useState } from 'react';
import { I18nProviderProps, LanguageContextType } from "../types.ts";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: I18nProviderProps) => {
    const [language, setLanguage] = useState('en');

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export { LanguageContext };