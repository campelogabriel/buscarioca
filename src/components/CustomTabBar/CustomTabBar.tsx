import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CustomTabBar = ({ routeName, isNight = false }) => {
  const navigation = useNavigation();

  return (
    <View style={{ ...styles.container }}>
      <View
        style={{
          ...styles.content,
          backgroundColor: isNight ? "#111111e4" : "#fff",
          borderColor: isNight ? "#444" : "#ccc",
        }}
      >
        <TouchableOpacity
          //@ts-ignore
          onPress={() => navigation.navigate("LocalInitial")}
          style={{ flex: 1, alignItems: "center" }}
        >
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={26}
            color={routeName == "LocalInitial" ? "#026088dd" : "#535353"}
            style={{
              ...(!isNight && {
                backgroundColor:
                  routeName == "LocalInitial" ? "#f0efef" : "#fff",
              }),
              ...styles.iconLight,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          //@ts-ignore
          onPress={() => navigation.navigate("HomeInitial")}
          style={{ flex: 1, alignItems: "center" }}
        >
          <Ionicons
            name={"home"}
            size={25}
            color={routeName == "HomeInitial" ? "#0e997d" : "#535353"}
            style={{
              ...(!isNight && {
                backgroundColor:
                  routeName == "HomeInitial" ? "#f0efef" : "#fff",
              }),
              ...styles.iconLight,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          //@ts-ignore
          onPress={() => navigation.navigate("SettingsInitial")}
          style={{ flex: 1, alignItems: "center" }}
        >
          <Ionicons
            name={"settings-outline"}
            size={25}
            color={routeName == "SettingsInitial" ? "#FF6B00" : "#535353"}
            style={{
              ...(!isNight && {
                backgroundColor:
                  routeName == "SettingsInitial" ? "#f0efef" : "#fff",
              }),
              ...styles.iconLight,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    marginBottom: Dimensions.get("window").height * 0.05,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    margin: 100,
    gap: 34,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  iconLight: {
    padding: 4,
    borderRadius: 12,
    justifyContent: "center",
  },
  iconNight: {
    backgroundColor: "#111111e4",
    borderColor: "#444",
    padding: 4,
    borderRadius: 12,
    justifyContent: "center",
  },
  iconNightHome: {
    borderColor: "#444",
    padding: 4,
    borderRadius: 12,
    justifyContent: "center",
    backgroundColor: "#026088dd",
  },
});

export default CustomTabBar;
