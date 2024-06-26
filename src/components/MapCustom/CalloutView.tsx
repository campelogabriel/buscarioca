import { StyleSheet, Text, View } from "react-native";
import MarkerPin from "../../../assets/markerPin.svg";
function CalloutView() {
  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.userIcon}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>Você</Text>
      </View>
      <MarkerPin width={30} height={60} />
    </View>
  );
}

const styles = StyleSheet.create({
  userIcon: {
    backgroundColor: "#0e997d",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default CalloutView;
