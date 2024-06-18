import { useEffect, useRef } from "react";
import { Animated, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function NoBattery() {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        // padding: 8
        width: "80%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#cf0000",
        borderRadius: 3,
        paddingVertical: 3,
        gap: 8,
        flex: 1,
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
      }}
    >
      <MaterialCommunityIcons name="lightning-bolt" size={24} color="white" />
      <Text
        style={{
          textAlign: "center",
          fontSize: 14,
          color: "#fff",

          fontWeight: "600",
        }}
      >
        Sem Energia no Radar
      </Text>
      <MaterialCommunityIcons name="lightning-bolt" size={24} color="white" />
    </Animated.View>
  );
}
export default NoBattery;
{
  /* <View
  style={{
    width: "80%",
    padding: 12,
  }}
>
  <Text
    style={{
      textAlign: "center",
      fontSize: 16,
      color: "#fff",
      backgroundColor: "#0e997d",
      borderRadius: 4,
      // padding: 4,
      gap: 8,
    }}
  >
    Atualizando...
  </Text>
</View>; */
}
