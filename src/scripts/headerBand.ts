const BREATHING_ROOM = 8;

type Listener = (height: number) => void;

const listeners = new Set<Listener>();

let current = 0;

const publish = (height: number): void => {
    if (height === current) {
        return;
    }
    current = height;
    for (const listener of listeners) {
        listener(height);
    }
};

export const onHeaderHeight = (listener: Listener): void => {
    listeners.add(listener);
    listener(current);
};

const readHeight = (root: HTMLElement): number =>
    parseFloat(getComputedStyle(root).getPropertyValue("--header-height")) || 0;

export const keepHeaderBandHonest = (): void => {
    const header = document.querySelector<HTMLElement>(".header-container");
    const content = document.querySelector<HTMLElement>("[data-header-content]");

    if (!header || !content) {
        return;
    }

    const root = document.documentElement;

    const measure = (contentHeight: number): void => {
        if (getComputedStyle(header).position !== "fixed") {
            root.style.removeProperty("--header-height");
            publish(0);
            return;
        }

        const design =
            parseFloat(getComputedStyle(root).getPropertyValue("--header-height-design")) || 0;
        const needed = Math.ceil(contentHeight) + BREATHING_ROOM;

        if (needed > design) {
            root.style.setProperty("--header-height", `${needed}px`);
        } else {
            root.style.removeProperty("--header-height");
        }

        publish(readHeight(root));
    };

    new ResizeObserver(([entry]) => {
        if (entry) {
            measure(entry.contentRect.height);
        }
    }).observe(content);

    measure(content.getBoundingClientRect().height);
};
