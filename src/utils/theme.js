const THEME_KEY = 'theme';

export function getInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;

    const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches;
    return prefersDark ? 'dark' : 'light';
}

export function applyTheme(theme) {
    const root = document.documentElement;

    if(theme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

    localStorage.setItem(THEME_KEY, theme);
}