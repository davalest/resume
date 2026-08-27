import {useEffect, useRef, useState} from "react";

export type CopyStatus = "idle" | "copied" | "failed";

const RESET_AFTER_MS = 4000;

export const useCopyEmail = (address: string): {status: CopyStatus; copy: () => void} => {
    const [status, setStatus] = useState<CopyStatus>("idle");
    const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => () => clearTimeout(resetTimer.current), []);

    const copy = (): void => {
        clearTimeout(resetTimer.current);

        void (async () => {
            try {
                await navigator.clipboard.writeText(address);
                setStatus("copied");
            } catch {
                setStatus("failed");
            }
            resetTimer.current = setTimeout(() => setStatus("idle"), RESET_AFTER_MS);
        })();
    };

    return {status, copy};
};
