export function getThemeSetting(): string {
  let theme = 'light';
  try {
    theme = localStorage.getItem('theme');
  } catch(e) {
    // Nothing to do
  };
  return theme;
}
