import { StyleSheet, StatusBar, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import {
  LocationObject,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Application from "./src/Application";
import store from "./src/redux/store";
import LottieViewBus from "./src/components/LottieViewBus";

const queryClient = new QueryClient({});

export default function App() {
  const [location, setLocation] = useState<LocationObject | null>(null);

  const getPermissionLocation = async () => {
    let { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const positions = await getCurrentPositionAsync();
      setLocation(positions);
    }
  };

  useEffect(() => {
    getPermissionLocation();
  }, []);

  if (!location) return <LottieViewBus />;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={styles.container}>
          <Provider store={store}>
            <Application location={location} />
          </Provider>
        </SafeAreaView>
      </QueryClientProvider>
      <StatusBar backgroundColor={"#000"} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
