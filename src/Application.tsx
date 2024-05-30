import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "./screens/SettingsScreen";
import LocalScreen from "./screens/LocalScreen";
import MapaStylesScreen from "./screens/MapaStylesScreen";
import PositionScreen from "./screens/PositionScreen";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPosition } from "./redux/slicePositions/slicePositions";
import HomeScreen from "./screens/HomeScreen";
import LineScreen from "./screens/LineScreen";
import ManualScreen from "./screens/ManualScreen";

const Stack = createStackNavigator();

function Application({ location }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addPosition([location.coords.latitude, location.coords.longitude])
    );
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="HomeInitial"
      >
        <Stack.Screen name="HomeInitial" component={HomeScreen} />
        <Stack.Screen name="LocalInitial" component={LocalScreen} />
        <Stack.Screen name="MapaStyle" component={MapaStylesScreen} />
        <Stack.Screen name="Manual" component={ManualScreen} />
        <Stack.Screen
          name="Position"
          options={{
            title: "Coordenadas",
            headerShown: true,
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "#026088",
            },
          }}
          component={PositionScreen}
        />
        <Stack.Screen name="SettingsInitial" component={SettingsScreen} />
        <Stack.Screen name="Lines" component={LineScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Application;
