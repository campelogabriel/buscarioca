import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import timeConversion from "../../utils/timeConversion";
import distanceConversion from "../../utils/distanceConversion";

function ModalBus({
  setModal,
  modalInfoBus,
  markerBusArray,
  markerSelect,
  isNight,
}) {
  const now = Date.now();
  let diff = (now - modalInfoBus.datahora) / 1000; //seconds

  //time conversion
  let time = timeConversion(diff);

  //distance conversion
  let distance = distanceConversion(modalInfoBus.distancia);

  function handleModalBus() {
    setModal(false);

    //@ts-ignore
    markerBusArray.current[markerSelect.current].hideCallout();
    markerSelect.current = "";
  }

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isNight ? "#050814e3" : "#fff",
        borderColor: isNight ? "#000" : "#ccc",
      }}
    >
      <View
        style={{
          ...styles.tagInfo,
          borderBottomColor: `#0e997d`,
          borderBottomWidth: 3,
        }}
      >
        <View
          style={{
            ...styles.tag,
            backgroundColor: `#0e997d`,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Linha {modalInfoBus.linha}
          </Text>
        </View>
        <TouchableOpacity onPress={handleModalBus}>
          <AntDesign
            style={styles.closeBtn}
            name="closesquare"
            size={32}
            color={isNight ? "#fff" : "#ff1100dd"}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          alignItems: "center",
        }}
      >
        <MaterialIcons
          name="directions-bus"
          size={21}
          color={isNight ? "#fff" : "#000"}
        />
        <Text style={{ color: isNight ? "#fff" : "#000" }}>
          Numeração: {modalInfoBus.ordem}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <MaterialCommunityIcons
          name="map-marker-distance"
          size={22}
          color={isNight ? "#fff" : "#000"}
        />
        <Text style={{ color: isNight ? "#fff" : "#000" }}>
          Distância por volta de {distance}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <MaterialIcons
          name="speed"
          size={22}
          color={isNight ? "#fff" : "#000"}
        />
        <Text style={{ color: isNight ? "#fff" : "#000" }}>
          Velocidade do Veículo Registrada:
          {modalInfoBus.velocidade == 0
            ? " Parado"
            : ` ${modalInfoBus.velocidade} km/h`}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Octicons
          style={{ paddingLeft: 2 }}
          name="clock"
          size={20}
          color={isNight ? "#fff" : "#000"}
        />
        <Text style={{ color: isNight ? "#fff" : "#000" }}>
          Última Atualização: {time}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    elevation: 3,
    padding: 16,
    bottom: 0,
    left: 0,
    width: "100%",
    borderWidth: 1,
    gap: 22,
  },
  tagInfo: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },
  tag: {
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 9,
    justifyContent: "center",
    paddingVertical: 4,
    borderRadius: 0,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  closeBtn: {
    alignSelf: "flex-end",
  },
});

export default ModalBus;
