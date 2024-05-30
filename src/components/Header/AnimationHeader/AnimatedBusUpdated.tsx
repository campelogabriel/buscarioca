import { useEffect, useRef } from "react";
import { Animated, Text } from "react-native";

function AnimatedBusUpdated({ busesOnMap }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(1200),
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
        width: "80%",
        padding: 12,
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
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          color: "#fff",
          backgroundColor: "#0e997d",
          borderRadius: 4,
          padding: 4,
          gap: 8,
        }}
      >
        Veículos no Mapa: {busesOnMap}
      </Text>
    </Animated.View>
  );
}

export default AnimatedBusUpdated;
