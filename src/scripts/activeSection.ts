import {onHeaderHeight} from "./headerBand.ts";

const ACTIVATION_OFFSET = 32;

const BAND_BOTTOM = "-85%";

export const trackActiveSection = (): void => {
    const links = new Map<string, HTMLAnchorElement>(
        [...document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]")].map((link) => [
            link.dataset.navLink ?? "",
            link,
        ]),
    );

    const sections = [...links.keys()]
        .map((id) => document.getElementById(id))
        .filter((element): element is HTMLElement => element !== null);

    if (!sections.length) {
        return;
    }

    const languageLinks = [...document.querySelectorAll<HTMLAnchorElement>(".lang-link")];


    const carryPlaceAcross = (id: string | null): void => {
        for (const link of languageLinks) {
            const url = new URL(link.href, location.href);
            url.hash = id ?? "";
            link.href = url.toString();
        }
    };

    let activeId: string | null = null;

    const paint = (next: string | null): void => {
        if (next === activeId) {
            return;
        }
        activeId = next;

        for (const [id, link] of links) {
            const active = id === next;
            link.classList.toggle("active", active);
            if (active) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        }

        carryPlaceAcross(next);
    };

    const visible = new Set<string>();
    let atBottom = false;

    const resolve = (): void => {
        if (atBottom) {
            paint(sections[sections.length - 1]?.id ?? null);
            return;
        }
        paint(sections.filter(({id}) => visible.has(id)).pop()?.id ?? null);
    };

    let bandObserver: IntersectionObserver | undefined;

    const armBand = (headerHeight: number): void => {
        bandObserver?.disconnect();
        visible.clear();

        const line = headerHeight + ACTIVATION_OFFSET;
        bandObserver = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        visible.add(entry.target.id);
                    } else {
                        visible.delete(entry.target.id);
                    }
                }
                resolve();
            },
            {rootMargin: `-${line}px 0px ${BAND_BOTTOM} 0px`, threshold: 0},
        );

        for (const section of sections) {
            bandObserver.observe(section);
        }
    };

    onHeaderHeight(armBand);

    const sentinel = document.querySelector("[data-bottom-sentinel]");
    if (sentinel) {
        new IntersectionObserver(([entry]) => {
            atBottom = entry?.isIntersecting ?? false;
            resolve();
        }).observe(sentinel);
    }
};
