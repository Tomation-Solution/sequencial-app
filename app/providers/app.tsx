import { createContext, useState } from "react";

export const AppContext = createContext<{
  loading: boolean;
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}>({
  loading: false,
  authenticated: false,
  setAuthenticated: () => {},
});

export const AppProvider = ({ children }: any) => {
  const [loading, setLoading] = useState("");
  const [showBackButton, setShowBackButton] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  const showBackButtonHandler = () => {
    setShowBackButton(true);
    setShowLogo(false);
    setHeaderText("");
  };

  const showLogoHandler = () => {
    setShowBackButton(false);
    setShowLogo(true);
    setHeaderText("");
  };

  const showHeaderTextHandler = (text: string) => {
    setShowBackButton(false);
    setShowLogo(false);
    setHeaderText(text);
  };

  return (
    <HeaderContext.Provider
      value={{
        headerText,
        showHeaderTextHandler,
        showBackButton,
        showBackButtonHandler,
        showLogo,
        showLogoHandler,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
