const SHARED_COLORS = {
  primary: "#24CDE2",
  secondary: "#000022",
};

const theme = {
  lightTheme: {
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

  darkTheme: {
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

export default theme;
