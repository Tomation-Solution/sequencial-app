import "react-native-gesture-handler";
import {
  NavigationContainer,
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";

import { useEffect, useState } from "react";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "./app/config/theme/themeContext";
import theme from "./app/config/theme/color_theme";
import Onboarding from "./app/screens/Onboarding/Onboarding";
import AuthNavigations from "./app/navigations/AuthNavigation";
import DrawerNavigations from "./app/navigations/DrawerNavigation";
import { StatusBar, Text, View, useColorScheme } from "react-native";
import { AppProvider } from "./app/providers/context/app";
import { NotificationProvider } from "./app/providers/context/notification";
import { HeaderProvider } from "./app/providers/context/header";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApiProvider } from "./app/providers/context/api";
import { retrieveAppData } from "./app/helper_functions/storingAppData";
import { COLORS } from "./app/config/constants/color";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<string>("light");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(true);

  const colorScheme = useColorScheme();

  console.log("colorScheme", colorScheme);

  useEffect(() => {
    let listener = EventRegister.addEventListener("changeMode", (data) => {
      setIsDarkMode(data);
    });

    let logout_listener = EventRegister.addEventListener("logout", () => {
      setIsAuthenticated(false);
    });

    const checkToken = async () => {
      const token = await retrieveAppData("token");
      if (token !== null) {
        setIsAuthenticated(true);
      }
    };

    checkToken();

    return () => {
      EventRegister.removeEventListener(listener as string);
      EventRegister.removeEventListener(logout_listener as string);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  // if (showLoadingScreen) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         backgroundColor: "blue",
  //       }}
  //     >
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <>
      <StatusBar
        barStyle={isDarkMode === "light" ? `dark-content` : `light-content`}
        backgroundColor={isDarkMode === "light" ? COLORS.light_blue : "#000"}
      />
      <QueryClientProvider client={new QueryClient()}>
        <NavigationContainer>
          <AppProvider>
            <themeContext.Provider
              value={
                isDarkMode === "light" ? theme.lightTheme : theme.darkTheme
              }
            >
              <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
              >
                <NotificationProvider>
                  <ApiProvider setIsAuthenticated={setIsAuthenticated}>
                    <HeaderProvider>
                      {/* <DrawerNavigations /> */}

                      {/* <Onboarding /> */}

                      {isAuthenticated ? (
                        <DrawerNavigations />
                      ) : (
                        <AuthNavigations />
                      )}
                    </HeaderProvider>
                  </ApiProvider>
                </NotificationProvider>
              </ThemeProvider>
            </themeContext.Provider>
          </AppProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </>
  );
}
