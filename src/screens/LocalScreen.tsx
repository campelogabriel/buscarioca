import { useRoute } from "@react-navigation/native";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSelector } from "react-redux";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import CustomTabBar from "../components/CustomTabBar/CustomTabBar";
import mapStyle from "../utils/mapStyle";
import {
  addPosition,
  usePositions,
} from "../redux/slicePositions/slicePositions";
import { useEffect, useRef } from "react";
import { getCurrentPositionAsync } from "expo-location";
import { useDispatch } from "react-redux";

const LocalScreen = ({ navigation }) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const positions = useSelector(usePositions);
  //@ts-ignore
  const mapRef = useRef<MapView | null>();

  async function handleGetLocalNow() {
    try {
      const { coords } = await getCurrentPositionAsync();
      dispatch(addPosition([coords.latitude, coords.longitude]));
    } catch (err) {
      return;
    }
  }

  useEffect(() => {
    mapRef.current?.animateToRegion({
      latitude: positions[0],
      longitude: positions[1],
      latitudeDelta: 0.006,
      longitudeDelta: 0.006,
    });
  }, [positions]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
            Localização
          </Text>
        </View>
        <View style={styles.map}>
          <MapView
            key={process.env.EXPO_PUBLIC_KEY_GOOGLE_MAPS}
            toolbarEnabled={false}
            ref={(el) => (mapRef.current = el)}
            scrollEnabled={false}
            initialRegion={{
              latitude: positions[0],
              longitude: positions[1],
              latitudeDelta: 0.006,
              longitudeDelta: 0.006,
            }}
            customMapStyle={mapStyle["silver"]}
            provider={PROVIDER_GOOGLE}
            style={styles.mapview}
          >
            <Marker
              coordinate={{ latitude: positions[0], longitude: positions[1] }}
              pinColor={"#00000"}
            />
          </MapView>
          <View style={styles.info}>
            <View
              style={{
                flexDirection: "row",
                gap: 22,
                padding: 12,
                marginTop: 20,
                borderRadius: 4,
                backgroundColor: "#fafafa",
                borderWidth: 1,
                borderColor: "#ccc",
              }}
            >
              <FontAwesome5
                style={{
                  backgroundColor: "#98dbf8dd",
                  paddingVertical: 9,
                  paddingHorizontal: 12,
                  borderRadius: 4,
                }}
                name="map-marker-alt"
                size={22}
                color="black"
              />

              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ flex: 2, textAlign: "center", fontWeight: "bold" }}
                >
                  Local Escolhido
                </Text>
                <Text style={{ fontStyle: "italic" }}>
                  {positions[0].toFixed(6)} {positions[1].toFixed(6)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#0583b9dd",
                  borderRadius: 4,
                  padding: 9,
                  borderWidth: 1,
                  borderColor: "#eee",
                }}
                onPress={() => navigation.navigate("Position")}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                >
                  Escolher Local
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleGetLocalNow}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  borderWidth: 1,
                  borderRadius: 4,
                  padding: 7,
                  borderColor: "#026088dd",
                }}
              >
                <MaterialIcons name="gps-fixed" size={24} color="#026088dd" />
                <Text
                  style={{
                    backgroundColor: "#ffffff",
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#026088dd",
                  }}
                >
                  Local Atual
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.rest}></View>
      </View>
      <CustomTabBar routeName={route.name} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  header: {
    backgroundColor: "#026088dd",
    flexDirection: "row",
    justifyContent: "center",
    flex: 2,
    padding: 16,
    gap: 12,
  },
  rest: {
    flex: 3,
  },
  map: {
    position: "absolute",
    top: Dimensions.get("screen").height * 0.1,
    left: Dimensions.get("screen").width * 0.073,
    width: Dimensions.get("screen").width * 0.85,
    height: 550,
    backgroundColor: "#fefefe",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 30,
    marginBottom: Dimensions.get("screen").height * 0.13,
  },
  mapview: {
    width: "100%",
    height: "80%",
    flex: 2,
  },
  info: {
    gap: 12,
    flex: 2,
    justifyContent: "space-between",
  },
});

export default LocalScreen;
