import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dimensions } from "react-native";
import {
  SimpleLineIcons,
  FontAwesome5,
  FontAwesome6,
  Feather,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAutomatedFetch,
  useSettings,
} from "../../src/redux/sliceSettings/sliceSettings";
import CustomTabBar from "../../src/components/CustomTabBar/CustomTabBar";
import { useRoute } from "@react-navigation/native";

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const settigns = useSelector(useSettings);
  const [enabledAuto, setEnableAuto] = useState<boolean>(
    settigns.isEnabledAutomate
  );

  const route = useRoute();


  function handleAutomatedFetch() {
    setEnableAuto((v) => {
      return !v;
    });
    dispatch(setAutomatedFetch(!enabledAuto));
  }

  return (
    <>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Configurações</Text>
          </View>
        </View>
        <View style={styles.blockSettings}>
          <TouchableOpacity
            onPress={handleAutomatedFetch}
            style={styles.blockBtn}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <FontAwesome6
                name="tower-cell"
                style={{
                  ...styles.icon,
                  backgroundColor: "#859bf8b8",
                }}
                size={22}
                color="#2f0394b3"
              />
              <Text>Busca Automática</Text>
            </View>
            <TouchableOpacity
              onPress={handleAutomatedFetch}
              style={{
                ...styles.outter,
                backgroundColor: enabledAuto ? "#859bf8b8" : "#aaa",
                justifyContent: enabledAuto ? "flex-end" : "flex-start",
              }}
            >
              <View style={styles.inner}></View>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MapaStyle")}
            style={styles.blockBtn}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Entypo
                style={{ ...styles.icon, backgroundColor: "#46c7ffdd" }}
                name="map"
                size={24}
                color="#026088dd"
              />

              <Text>Estilo do Mapa</Text>
            </View>
            <View>
              <Text>
                <SimpleLineIcons name="arrow-right" size={14} color="#444" />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Lines")}
            style={styles.blockBtn}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <FontAwesome5
                style={{ ...styles.icon, backgroundColor: "#60f39f" }}
                name="bus-alt"
                size={22}
                color="#2c9058"
              />

              <Text>Linhas Escolhidas</Text>
            </View>
            <View>
              <Text>
                <SimpleLineIcons name="arrow-right" size={14} color="#444" />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Manual")}
            style={styles.blockBtn}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Feather
                style={{
                  ...styles.icon,
                  backgroundColor: "black",
                }}
                name="book-open"
                size={22}
                color="#e9e7e7"
              />
              <Text>Perguntas e Respostas</Text>
            </View>
            <View>
              <Text>
                <SimpleLineIcons name="arrow-right" size={14} color="#444" />
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.blockBtn}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <AntDesign
                style={{
                  padding: 6,
                  borderRadius: 8,
                  backgroundColor: "#eee",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                name="infocirlceo"
                size={22}
                color="#222"
              />

              <Text>Sobre</Text>
            </View>
            <View>
              <Text>
                <SimpleLineIcons name="arrow-right" size={14} color="#444" />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <CustomTabBar routeName={route.name} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fefefe",
  },
  header: {
    backgroundColor: "#ff6a00ba",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  blockSettings: {
    padding: 14,
    marginHorizontal: 20,
    gap: 26,
    flex: 4,
    marginBottom: Dimensions.get("window").height * 0.205,
  },
  blockBtn: {
    flexDirection: "row",
    backgroundColor: "#fff",
    elevation: 2,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: 6,
    paddingHorizontal: 12,
    height: 70,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  icon: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#59ffa4",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: 20,
    height: 20,
    backgroundColor: "#f3f3f3",
    borderRadius: 15,
    borderWidth: 0.3,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  outter: {
    width: 40,
    height: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0.2,
  },
});

export default SettingsScreen;
