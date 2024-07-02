import {Dispatch, ReactNode, SetStateAction} from "react";

export interface LanguageContextType {
    language: string;
    setLanguage: Dispatch<SetStateAction<string>>;
}

export interface I18nProviderProps {
    children: ReactNode;
}