import { useState } from "react";
import { DefaultTheme } from "react-native-paper";
import DarkTheme from "../globals/constants/DarkTheme";

export const useTheme = () => {
  const [theme, setTheme] = useState(DefaultTheme);

  const toggleTheme = () => {
    setTheme(theme === DefaultTheme ? DarkTheme : DefaultTheme);
  };

  return [theme, toggleTheme];
};
