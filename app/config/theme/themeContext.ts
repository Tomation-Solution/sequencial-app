import { createContext } from "react";

type Theme = {
  primary: string;
  secondary: string;
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
