export const LightTheme = {
  background: "#ffffff",
  text: "#000000",
};

export const DarkTheme = {
  background: "#121212",
  text: "#ffffff",
};

export type Theme = typeof LightTheme | typeof DarkTheme;
export type ThemeKey = keyof typeof LightTheme | keyof typeof DarkTheme;