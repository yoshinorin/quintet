export function getTheme(): string {
  let theme = 'light';
  try {
    theme = localStorage.getItem('theme');
  } catch(e) {
    // Nothing to do
  };
  return theme;
}
