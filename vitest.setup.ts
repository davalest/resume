const noop = (): void => undefined;

class InertResizeObserver implements ResizeObserver {
    observe = noop;
    unobserve = noop;
    disconnect = noop;
}

globalThis.ResizeObserver = InertResizeObserver;
