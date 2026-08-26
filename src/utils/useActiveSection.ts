import {useEffect, useState} from "react";

const ACTIVATION_OFFSET = 32;

const headerHeight = () =>
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 0;

export const useActiveSection = (ids: readonly string[]): string | null => {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        let frame = 0;

        const update = () => {
            frame = 0;

            const sections = ids
                .map((id) => document.getElementById(id))
                .filter((element): element is HTMLElement => element !== null);

            if (!sections.length) {
                return;
            }

            const scrollable = document.documentElement.scrollHeight > window.innerHeight;
            const atBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

            const last = sections[sections.length - 1];

            if (scrollable && atBottom && last) {
                setActiveId(last.id);
                return;
            }

            const line = headerHeight() + ACTIVATION_OFFSET;
            const current = sections
                .filter((section) => section.getBoundingClientRect().top <= line)
                .pop();

            setActiveId(current?.id ?? null);
        };

        const onScroll = () => {
            if (!frame) {
                frame = requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, {passive: true});
        window.addEventListener("resize", onScroll);

        return () => {
            if (frame) {
                cancelAnimationFrame(frame);
            }
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [ids]);

    return activeId;
};
