import { Text, View } from "react-native";
function AnimatedBusUpdating() {
  return (
    <View
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
          padding: 4,
          gap: 8,
        }}
      >
        Atualizando...
      </Text>
    </View>
  );
}

export default AnimatedBusUpdating;
