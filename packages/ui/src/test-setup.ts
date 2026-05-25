import '@testing-library/jest-dom/vitest';

// jsdom lacks ResizeObserver, which several Radix Themes components (Checkbox, Switch, Avatar,
// ScrollArea, …) observe at mount. Provide a no-op polyfill so component tests can render.
if (!('ResizeObserver' in globalThis)) {
  class ResizeObserver {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }
  globalThis.ResizeObserver = ResizeObserver as unknown as typeof globalThis.ResizeObserver;
}
