import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { NativeWindStyleSheet } from "nativewind";
import DrawerNavigations from "./app/navigations/DrawerNavigation";
import { Provider as PaperProvider } from "react-native-paper";
import { darkTheme, lightTheme } from "./app/globals/constants/color";
import { createContext, useEffect, useState } from "react";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "./app/config/theme/themeContext";
import theme from "./app/config/theme/color_theme";
import Onboarding from "./app/screens/Onboarding/Onboarding";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const ThemeProvider = createContext({});

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState("light");

  useEffect(() => {
    let listener = EventRegister.addEventListener("changeMode", (data) => {
      console.log("data", data);
      setIsDarkMode(data);
    });
    return () => {
      EventRegister.removeEventListener(listener as string);
    };
  }, []);

  return (
    <NavigationContainer>
      <themeContext.Provider
        value={isDarkMode === "light" ? theme.lightTheme : theme.darkTheme}
      >
        {/* <DrawerNavigations /> */}

        <Onboarding />
      </themeContext.Provider>
    </NavigationContainer>
  );
}
