import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setMapStyles,
  useSettings,
} from "../redux/sliceSettings/sliceSettings";
import { useSelector } from "react-redux";

function MapaStylesScreen({ navigation }) {
  const [choosed, setChoosed] = useState("");
  const dispatch = useDispatch();
  const settings = useSelector(useSettings);

  useLayoutEffect(() => {
    setChoosed(settings.mapStyles);
  }, []);

  useEffect(() => {
    dispatch(setMapStyles(choosed));
  }, [choosed]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.header}>Estilo do Mapa</Text>
      </View>
      <View style={styles.mapChoose}>
        <TouchableOpacity
          style={styles.mapBtn}
          onPress={() => setChoosed("padrao")}
        >
          <View style={{ flexDirection: "row", gap: 12 }}>
            <FontAwesome name="map-signs" size={26} color="black" />
            <Text style={{ fontSize: 16, fontStyle: "italic" }}>Padrão</Text>
          </View>
          <TouchableOpacity
            style={styles.outter}
            onPress={() => setChoosed("padrao")}
          >
            {choosed == "padrao" && <View style={styles.inner}></View>}
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mapBtn}
          onPress={() => setChoosed("retro")}
        >
          <View style={{ flexDirection: "row", gap: 12 }}>
            <FontAwesome name="camera-retro" size={26} color="#005a48" />
            <Text style={{ fontSize: 16, fontStyle: "italic" }}>Retro</Text>
          </View>
          <TouchableOpacity
            style={styles.outter}
            onPress={() => setChoosed("retro")}
          >
            {choosed == "retro" && <View style={styles.inner}></View>}
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mapBtn}
          onPress={() => setChoosed("night")}
        >
          <View style={{ flexDirection: "row", gap: 12 }}>
            <MaterialCommunityIcons
              name="weather-night"
              size={26}
              color="#002c8b"
            />
            <Text style={{ fontSize: 16, fontStyle: "italic" }}>Night</Text>
          </View>
          <TouchableOpacity
            style={styles.outter}
            onPress={() => setChoosed("night")}
          >
            {choosed == "night" && <View style={styles.inner}></View>}
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mapBtn}
          onPress={() => setChoosed("silver")}
        >
          <View style={{ flexDirection: "row", gap: 12 }}>
            <FontAwesome name="map" size={26} color="#ccc" />
            <Text style={{ fontSize: 16, fontStyle: "italic" }}>Silver</Text>
          </View>
          <TouchableOpacity
            style={styles.outter}
            onPress={() => setChoosed("silver")}
          >
            {choosed == "silver" && <View style={styles.inner}></View>}
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={styles.blockButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              backgroundColor: "#fff",
              color: "#000",
              borderWidth: 1,
              borderRadius: 4,
              padding: 12,
              paddingHorizontal: 16,
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Voltar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("HomeInitial")}>
          <Text
            style={{
              color: "#fff",
              borderColor: "#ddd",
              backgroundColor: "#01374edd",
              padding: 12,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderRadius: 4,
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    gap: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 26,
    color: "#026088dd",
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowRadius: 2,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    justifyContent: "center",
    paddingBottom: 8,
  },
  mapChoose: { gap: 40, flex: 4, justifyContent: "center" },

  mapBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#aaa",
    elevation: 2,
    borderRadius: 3,
  },

  blockButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 26,
    flex: 2,
  },
  outter: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: 11,
    height: 11,
    backgroundColor: "#026088dd",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapaStylesScreen;
