import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { useEffect, useState } from "react";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "./app/config/theme/themeContext";
import theme from "./app/config/theme/color_theme";
import Onboarding from "./app/screens/Onboarding/Onboarding";
import AuthNavigations from "./app/navigations/AuthNavigation";

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

        {/* <Onboarding /> */}

        <AuthNavigations />
      </themeContext.Provider>
    </NavigationContainer>
  );
}
