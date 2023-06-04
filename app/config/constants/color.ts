// pls add to this File, if needed, do not use any colour in the app aside ones in here
import { DefaultTheme } from "react-native-paper";

export const COLORS = {
  primary: "#24CDE2",
  secondary: "#000022",
  light_green: "#4FDE9D",
  deep_green: "#23D685",
  deep_red: "#FF0000",
  light_red: "#FF8A8A",
  deep_yellow: "#FCBE2B",
  light_yellow: "#FFDF8CB2",
  deep_blue: "#245EF2",
  light_blue: "#24CDE2",
  gray: "#D9D9D9",
  light_gray: "#F2EEFCAB",
};

const SHARED_COLORS = {
  primary: "#24CDE2",
  secondary: "#000022",
  light_blue: "#4FDE9D",
  accent_white: "#F2EEFC63",
};

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...SHARED_COLORS,
    accent: "#4FDE9D",
    background: "#FFFFFF",
    text: "#000000",
    disabled: "#F2EEFCAB",
    success: "#4FDE9D",
    warning: "#FCBE2B",
    error: "#FF0000",
    placeholder: "#D9D9D9",
  },
};

const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...SHARED_COLORS,
    accent: "#4FDE9D",
    background: "#1C1C1C",
    text: "#FFFFFF",
    disabled: "#525252",
    success: "#23D685",
    warning: "#FFDF8CB2",
    error: "#FF8A8A",
    placeholder: "#2C2C2C",
  },
};

export { lightTheme, darkTheme };
