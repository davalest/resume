type Directives = Record<string, readonly string[]>;

const BASE: Directives = {
    "default-src": ["'none'"],
    "script-src": ["'self'"],
    "style-src": ["'self'"],
    "img-src": ["'self'"],
    "media-src": ["'self'"],
    "font-src": ["'self'"],
    "connect-src": ["'self'"],
    "base-uri": ["'none'"],
    "form-action": ["'none'"],
};

const serialise = (directives: Directives): string =>
    [
        ...Object.entries(directives).map(([name, values]) => `${name} ${values.join(" ")}`),
        "upgrade-insecure-requests",
    ].join("; ");

export const productionPolicy = serialise(BASE);

export const developmentPolicy = serialise({
    ...BASE,
    "style-src": [...BASE["style-src"]!, "'unsafe-inline'"],
    "script-src": [...BASE["script-src"]!, "'unsafe-inline'"],
});

export const contentSecurityPolicy = (isDev: boolean): string =>
    isDev ? developmentPolicy : productionPolicy;
