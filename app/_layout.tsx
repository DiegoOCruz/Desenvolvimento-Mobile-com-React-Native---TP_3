import { Navigator } from "expo-router";
import Slot = Navigator.Slot;
import { SessionProvider, useSession } from "@/app/ctx";
import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "@/constants/Theme";
import { useStorageState } from "@/app/useStorageState";
import { useEffect } from "react";
import { createTableUser } from "@/services/database";
import { useTheme } from "@/hooks/useTheme";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
  } from "@react-navigation/native";

export default function RootLayout() {
  //const themeType = useColorScheme();

  useEffect(() => {
    createTableUser();
  }, []);

  const { colorScheme } = useTheme();
  
   // @ts-ignore
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider >
        <SessionProvider>
          <Slot />
        </SessionProvider>
      </PaperProvider>
    </ThemeProvider>
  );
}
