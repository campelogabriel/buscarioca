import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

function BusMarkerBtn({
  isActive,
  setIsActive,
  markerBuses,
  lines,
  dispatch,
  state,
}) {
  const [busesM, setBusesM] = useState<{ linha: string; n: number }[]>([]);

  useEffect(() => {
    //@ts-ignore
    lines.map((line) => {
      const number = markerBuses?.current?.props.children[1]
        .filter((bus) => bus !== undefined)
        .filter((bus) => bus.props.bus.linha == line).length;

      setBusesM((b) => {
        return [
          ...b.filter((b) => b.linha != line),
          { linha: line, n: number },
        ];
      });
    });
  }, [markerBuses.current?.props.children[1]]);

  return (
    <TouchableOpacity
      onPress={() => {
        setIsActive(true);
      }}
      disabled={isActive ? true : false}
      style={isActive ? styles.boxActive : styles.box}
    >
      <FontAwesome5
        name="bus-alt"
        style={{ display: isActive ? "none" : "flex" }}
        size={24}
        color="#fff"
      />

      {isActive && (
        <>
          <View style={styles.containerBox}>
            <Text style={{ fontWeight: "bold", color: "#fff" }}>
              Veículos por Linha
            </Text>
          </View>
          {busesM.length > 0 ? (
            busesM.map((bus, i) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    dispatch({ type: "toggle", payload: bus.linha });
                  }}
                  key={i}
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    gap: 30,
                  }}
                >
                  <Text style={styles.textLine}>{bus.linha}</Text>
                  <Text style={styles.textLine}>{bus.n}</Text>
                  <Ionicons
                    style={{ flex: 1 }}
                    name={state.includes(bus.linha) ? "eye-off-outline" : "eye"}
                    size={24}
                    color="#efefef"
                  />
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={{ color: "#fff", fontWeight: "500", marginTop: 20 }}>
              Nenhum Onibus no Mapa
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    position: "absolute",
    top: "66%",
    left: 0,
    backgroundColor: "#0e997d",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    padding: 16,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    elevation: 4,
  },
  boxActive: {
    flex: 1,
    position: "absolute",
    minWidth: 80,
    top: "30%",
    left: 0,
    backgroundColor: "#0e997d",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    padding: 13,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    elevation: 6,
  },
  containerBox: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderBottomColor: "#fff",
    flex: 1,
  },

  textLine: {
    fontWeight: "500",
    color: "#fff",
    fontSize: 14,
    flex: 1,
    textAlign: "center",
  },
});

export default BusMarkerBtn;
