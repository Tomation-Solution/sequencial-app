import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { useEffect, useState } from "react";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "./app/config/theme/themeContext";
import theme from "./app/config/theme/color_theme";
import Onboarding from "./app/screens/Onboarding/Onboarding";
import AuthNavigations from "./app/navigations/AuthNavigation";
import DrawerNavigations from "./app/navigations/DrawerNavigation";

import { StatusBar } from "react-native";
import { AppProvider } from "./app/providers/context/app";
import { NotificationProvider } from "./app/providers/context/notification";
import { HeaderProvider } from "./app/providers/context/header";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<string>("light");

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
    <>
      <StatusBar
        barStyle={isDarkMode === "light" ? `dark-content` : `light-content`}
        backgroundColor={isDarkMode === "light" ? "#ffffff" : "#000"}
      />
      <QueryClientProvider client={new QueryClient()}>
        <NavigationContainer>
          <AppProvider>
            <NotificationProvider>
              <HeaderProvider>
                <themeContext.Provider
                  value={
                    isDarkMode === "light" ? theme.lightTheme : theme.darkTheme
                  }
                >
                  <DrawerNavigations />

                  {/* <Onboarding /> */}

                  {/* <AuthNavigations /> */}
                </themeContext.Provider>
              </HeaderProvider>
            </NotificationProvider>
          </AppProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </>
  );
}
