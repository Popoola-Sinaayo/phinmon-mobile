export const LightTheme = {
  primary: "#7A5FFF",
  statusBar: "#7A5FFF",
};

export const DarkTheme = {
  primary: "#7A5FFF",
  statusBar: "#7A5FFF",
};

export type Theme = typeof LightTheme | typeof DarkTheme;
export type ThemeKey = keyof typeof LightTheme | keyof typeof DarkTheme;