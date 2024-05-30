import { useEffect, useRef } from "react";
import { Animated, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
function OpenRadar() {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: true,
        delay: 500,
      })
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        width: "80%",
        opacity,
        gap: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0e997d",
      }}
    >
      <MaterialIcons name="cell-tower" size={22} color="#eee" />
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          color: "#fff",
          borderRadius: 4,
          padding: 4,
          gap: 8,
        }}
      >
        Abrindo Radar...
      </Text>
    </Animated.View>
  );
}

export default OpenRadar;
