const RESET_AFTER_MS = 4000;

export const enableCopyEmail = (): void => {
    const button = document.querySelector<HTMLButtonElement>("[data-copy-email]");
    const status = document.querySelector<HTMLElement>("[data-copy-status]");

    if (!button || !status) {
        return;
    }

    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    const onClick = (): void => {
        clearTimeout(resetTimer);

        void (async () => {
            try {
                await navigator.clipboard.writeText(button.dataset.address ?? "");
                status.textContent = button.dataset.copied ?? "";
            } catch {
                status.textContent = button.dataset.failed ?? "";
            }
            resetTimer = setTimeout(() => {
                status.textContent = "";
            }, RESET_AFTER_MS);
        })();
    };

    button.addEventListener("click", onClick);
};
