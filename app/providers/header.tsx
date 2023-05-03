import { createContext, useState } from "react";

export const HeaderContext = createContext<{
  headerText: any;
  showHeaderTextHandler: any;
  showBackButton: any;
  showBackButtonHandler: () => void;
  showLogo: any;
  showLogoHandler: any;
}>({
  headerText: "",
  showHeaderTextHandler: () => {},
  showBackButton: false,
  showBackButtonHandler: () => {},
  showLogo: true,
  showLogoHandler: () => {},
});

export const HeaderProvider = ({ children }: any) => {
  const [headerText, setHeaderText] = useState("");
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
