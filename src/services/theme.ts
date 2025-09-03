// Theme configuration
const THEMES = {
  light: {
    defaultSyntax: "light"
  },
  dark: {
    defaultSyntax: "dark"
  }
} as const;

const DEFAULT_MAIN_THEME = "light";
const DEFAULT_SYNTAX_THEME = "light";

export function getTheme(): string {
  let theme = DEFAULT_MAIN_THEME;
  try {
    theme = localStorage.getItem("theme") || DEFAULT_MAIN_THEME;
  } catch (e) {
    // Nothing to do
  }
  return theme;
}

export function getDefaultSyntaxTheme(mainTheme: string): string {
  return THEMES[mainTheme]?.defaultSyntax || DEFAULT_SYNTAX_THEME;
}

export function getEffectiveSyntaxTheme(
  syntaxTheme: string,
  mainTheme: string
): string {
  if (syntaxTheme === "default") {
    return getDefaultSyntaxTheme(mainTheme);
  }
  return syntaxTheme;
}

export function getSyntaxTheme(): string {
  let syntaxTheme = "default";
  try {
    syntaxTheme = localStorage.getItem("syntaxTheme") || "default";
  } catch (e) {
    // Nothing to do
  }
  return syntaxTheme;
}

export function setTheme(theme: string): void {
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    // Nothing todo
  } finally {
    document.body.setAttribute("data-theme", theme);
  }
}

export function setSyntaxTheme(theme: string): void {
  const mainTheme = getTheme();
  const effectiveTheme = getEffectiveSyntaxTheme(theme, mainTheme);
  try {
    localStorage.setItem("syntaxTheme", theme);
  } catch (e) {
    // Nothing todo
  } finally {
    document.documentElement.setAttribute("data-syntax-theme", effectiveTheme);
  }
}
