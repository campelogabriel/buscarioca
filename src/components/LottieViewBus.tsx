import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";
function LottieViewBus() {
  return (
    <View style={styles.splash}>
      <LottieView
        style={{ flex: 1 }}
        source={require("../../assets/buscarioca.json")}
        resizeMode="cover"
        autoPlay
        loop
      />
    </View>
  );
}

export default LottieViewBus;

const styles = StyleSheet.create({
  splash: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
});
