export const LightTheme = {
  // Primary colors
  primary: "#8C78F2",
  primaryLight: "#A896F5",
  primaryDark: "#6B5BC7",

  // Background colors
  background: "#FFFFFF",
  backgroundSecondary: "#F8FAFC",
  backgroundTertiary: "#F1F5F9",

  // Surface colors
  surface: "#FFFFFF",
  surfaceSecondary: "#F8FAFC",
  surfaceElevated: "#FFFFFF",

  // Text colors
  text: "#1A202C",
  textSecondary: "#4A5568",
  textTertiary: "#718096",
  textInverse: "#FFFFFF",

  // Border colors
  border: "#E2E8F0",
  borderLight: "#F1F5F9",
  borderDark: "#CBD5E0",

  // Status colors
  success: "#48BB78",
  warning: "#ED8936",
  error: "#F56565",
  info: "#4299E1",

  // Chart colors
  chartBackground: "#F8FAFC",
  chartGrid: "#E2E8F0",

  // Status bar
  statusBar: "#8C78F2",
  statusBarStyle: "dark-content" as const,

  // Shadow
  shadow: "#000000",

  // Card colors
  cardBackground: "#FFFFFF",
  cardBorder: "#F1F5F9",

  // Input colors
  inputBackground: "#FFFFFF",
  inputBorder: "#E2E8F0",
  inputFocus: "#8C78F2",

  // Button colors
  buttonPrimary: "#8C78F2",
  buttonSecondary: "#F0EDFF",
  buttonText: "#FFFFFF",
  buttonTextSecondary: "#8C78F2",
};

export const DarkTheme = {
  // Primary colors
  primary: "#8C78F2",
  primaryLight: "#A896F5",
  primaryDark: "#6B5BC7",

  // Background colors
  background: "#1A202C",
  backgroundSecondary: "#2D3748",
  backgroundTertiary: "#4A5568",

  // Surface colors
  surface: "#2D3748",
  surfaceSecondary: "#4A5568",
  surfaceElevated: "#2D3748",

  // Text colors
  text: "#FFFFFF",
  textSecondary: "#E2E8F0",
  textTertiary: "#A0AEC0",
  textInverse: "#1A202C",

  // Border colors
  border: "#4A5568",
  borderLight: "#2D3748",
  borderDark: "#718096",

  // Status colors
  success: "#68D391",
  warning: "#F6AD55",
  error: "#FC8181",
  info: "#63B3ED",

  // Chart colors
  chartBackground: "#2D3748",
  chartGrid: "#4A5568",

  // Status bar
  statusBar: "#1A202C",
  statusBarStyle: "light-content" as const,

  // Shadow
  shadow: "#000000",

  // Card colors
  cardBackground: "#2D3748",
  cardBorder: "#4A5568",

  // Input colors
  inputBackground: "#2D3748",
  inputBorder: "#4A5568",
  inputFocus: "#8C78F2",

  // Button colors
  buttonPrimary: "#8C78F2",
  buttonSecondary: "#4A5568",
  buttonText: "#FFFFFF",
  buttonTextSecondary: "#E2E8F0",
};

export type Theme = typeof LightTheme;
export type ThemeKey = keyof Theme;