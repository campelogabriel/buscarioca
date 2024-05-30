import { Image, StyleSheet, Text, View } from "react-native";
function WatchVideo() {
  return (
    <View style={styles.container}>
      {/* <View style={styles.message}>
        <Image
          style={{ width: 60, height: 40, transform: [{ rotateZ: "-90deg" }] }}
          source={require("../../assets/battery-0.png")}
        />
        <View
          style={{
            flex: 2,
            alignItems: "center",
            flexDirection: "row",
            alignSelf: "center",
          }}
        >
          <Text>Recarga</Text>
        </View>
      </View> */}
      <Image source={require("../../assets/ad.png")} />
    </View>
  );
}

export default WatchVideo;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 9,
    width: "100%",
    height: "100%",
    backgroundColor: "#0000004c",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    backgroundColor: "#eee",
    width: "80%",
    padding: 16,
    borderRadius: 9,
    elevation: 6,
    flexDirection: "row",
    gap: 13,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
