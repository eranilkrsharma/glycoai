import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { ErrorBoundary } from "./error-boundary";
import { SafeAreaProvider } from "react-native-safe-area-context";
import colors from "@/constants/colors";
import { Image } from "expo-image";
import { View, StyleSheet } from "react-native";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <RootLayoutNav />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ 
        headerShown: false,
      }} />
      <Stack.Screen 
        name="result" 
        options={{ 
          headerTitle: "Food Analysis",
          headerTintColor: colors.text,
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerShadowVisible: false,
          // Add a custom header logo
          headerBackground: () => (
            <View style={styles.headerBackground}>
              <Image
                source={{ uri: 'https://source.unsplash.com/featured/?diabetes,glucose,monitor' }}
                style={styles.headerImage}
                contentFit="cover"
              />
              <View style={styles.headerOverlay} />
            </View>
          ),
        }} 
      />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.15,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.card,
    opacity: 0.7,
  },
});