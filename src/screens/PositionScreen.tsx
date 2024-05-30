import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSelector } from "react-redux";
import {
  addPosition,
  usePositions,
} from "../redux/slicePositions/slicePositions";
import { StyleSheet } from "react-native";
import mapStyle from "../../src/utils/mapStyle";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

function PositionScreen() {
  const dispatch = useDispatch();
  const positions = useSelector(usePositions);
  const opacityRef = useRef(new Animated.Value(0)).current;

  const [show, setShow] = useState(true);

  //@ts-ignore
  const mapRef = useRef<MapView | null>();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacityRef, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(1200),
      Animated.timing(opacityRef, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [positions]);

  function handleDrag(e) {
    dispatch(
      addPosition([
        e.nativeEvent.coordinate.latitude,
        e.nativeEvent.coordinate.longitude,
      ])
    );
  }

  return (
    <>
      <Animated.View
        style={{
          opacity: opacityRef,
          backgroundColor: "#fff",
          gap: 12,
          alignItems: "center",
          padding: 8,
          position: "absolute",
          top: 20,
          left: Dimensions.get("screen").width * 0.25,
          elevation: 3,
          borderWidth: 1,
          borderColor: "#ccc",
          zIndex: 9,
          width: "50%",
          flexDirection: "row",
          borderRadius: 8,
        }}
      >
        <MaterialCommunityIcons
          name="map-marker-check"
          size={24}
          color="green"
        />
        <View>
          <Text style={{ fontWeight: "bold" }}>Posição Atualizada!</Text>
          <Text>
            {positions[0].toFixed(4)} {positions[1].toFixed(4)}
          </Text>
        </View>
      </Animated.View>
      <MapView
        ref={(el) => (mapRef.current = el)}
        customMapStyle={mapStyle["padrao"]}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        toolbarEnabled={false}
        initialRegion={{
          latitude: positions.at(0),
          longitude: positions.at(1),
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          draggable
          onDragEnd={handleDrag}
          coordinate={{ latitude: positions.at(0), longitude: positions.at(1) }}
        />
      </MapView>

      <View style={{ ...styles.tutorial, display: show ? "flex" : "none" }}>
        <View style={styles.containerTutorial}>
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: 8,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "600" }}>
              Escolha sua Localização
            </Text>
            <TouchableOpacity onPress={() => setShow(false)}>
              <FontAwesome name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              padding: 20,
            }}
          >
            <FontAwesome name="hand-pointer-o" size={28} color="#026088dd" />
            <Text
              style={{ fontSize: 12, fontWeight: "600", paddingHorizontal: 12 }}
            >
              Ao clicar e segurar o marcador, você pode arrastar para outra
              localização.
            </Text>
          </View>
        </View>
      </View>
      {!show && (
        <View style={styles.containerBtn}>
          <TouchableOpacity
            //@ts-ignore
            onPress={() =>
              mapRef.current?.animateCamera({
                center: {
                  latitude: positions.at(0),
                  longitude: positions.at(1),
                },
              })
            }
            style={styles.btn}
          >
            <MaterialIcons name="gps-fixed" size={28} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

export default PositionScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  tutorial: {
    backgroundColor: "#00000040",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerBtn: {
    position: "absolute",
    right: 20,
    bottom: 40,
    gap: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#fff",
    elevation: 3,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  btnSquare: {
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: "#fff",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  containerTutorial: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    gap: 12,
    marginHorizontal: "10%",
    elevation: 6,
  },
});
