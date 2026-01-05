const THEME_KEY = 'theme';

// Retrieves the initial theme from localStorage or system preference
export function getInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;

    const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
    ).matches;
    return prefersDark ? 'dark' : 'light';
}

// Applies the selected theme to the document
export function applyTheme(theme) {
    const root = document.documentElement;

    if(theme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

    localStorage.setItem(THEME_KEY, theme);
}