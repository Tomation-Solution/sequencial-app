import { DefaultTheme } from "react-native-paper";
import { darkTheme } from "./color";

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...darkTheme,
  },
};

export default DarkTheme;
