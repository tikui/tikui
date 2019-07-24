export const reload = (isReload: boolean) => (): string => (isReload) ? '<script src="/reload/reload.js"></script>' : '';
