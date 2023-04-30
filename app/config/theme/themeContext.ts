import { createContext } from "react";

type Theme = {
  primary: string;
  secondary: string;
  light_blue: string;
  accent_white: string;
  accent: string;
  background: string;
  text: string;
  disabled: string;
  success: string;
  warning: string;
  error: string;
  placeholder: string;
};

const themeContext = createContext<Theme>({
  primary: "",
  secondary: "",
  accent_white: "",
  light_blue: "",
  accent: "",
  background: "",
  text: "",
  disabled: "",
  success: "",
  warning: "",
  error: "",
  placeholder: "",
});

export default themeContext;
