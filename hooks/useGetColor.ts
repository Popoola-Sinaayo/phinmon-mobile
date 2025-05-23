import { useColorScheme } from "react-native"
import { DarkTheme, LightTheme, ThemeKey } from "../utils/theme"

const useGetColor = (item: ThemeKey) => { 
    const theme = useColorScheme()
    if (theme === "dark") {
        return DarkTheme[item]
    } else {
        return LightTheme[item]
    }
}