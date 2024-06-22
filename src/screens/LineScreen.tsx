import { useFonts } from "expo-font";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeLines, useLines } from "src/redux/sliceLines/sliceLines";
import { removeBusByLine } from "src/redux/sliceBuses/sliceBuses";

function LineScreen({ navigation }) {
  const lines = useSelector(useLines);
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    Londrina: require("../../assets/fonts/LondrinaSolid-Regular.ttf"),
  });

  if (!fontsLoaded) return;

  return (
    <View style={{ flex: 1, backgroundColor: "#2c9058" }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Linhas Escolhidas</Text>
      </View>
      <View style={styles.blockLines}>
        {lines.length > 0 ? (
          <FlatList
            contentContainerStyle={{ flex: 1, justifyContent: "center" }}
            style={{ paddingHorizontal: 8 }}
            data={lines}
            renderItem={({ item }) => {
              return (
                <View style={styles.lineEffect}>
                  <View style={styles.line}>
                    <Text style={styles.lineText}>Linha {item}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(removeLines(item));
                        dispatch(removeBusByLine(item));
                      }}
                    >
                      <Text style={styles.deleteText}>Deletar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <Text
            style={{
              fontSize: 24,
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              textShadowColor: "#222",
              textShadowRadius: 1,
              textShadowOffset: {
                width: 3,
                height: 2,
              },
            }}
          >
            Nenhuma Linha Definida pelo Usuário. Digite uma Linha na Página
            Inicial.
          </Text>
        )}
      </View>
      <View style={styles.btnBlock}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: 12,
              paddingHorizontal: 16,
              fontFamily: "Londrina",
              borderRadius: 4,
              fontSize: 20,
            }}
          >
            Voltar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("HomeInitial")}>
          <Text
            style={{
              backgroundColor: "#fff",
              color: "#000",
              fontFamily: "Londrina",
              padding: 12,
              paddingHorizontal: 16,
              borderRadius: 4,
              fontSize: 20,
            }}
          >
            Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LineScreen;

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 20,
    flexDirection: "row",
    gap: 20,
  },
  headerText: {
    color: "#f7c319ed",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 24,
    textShadowColor: "#222",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 4,
    },
  },
  blockLines: {
    padding: 25,
    flex: 2,
    justifyContent: "center",
    gap: 20,
  },
  lineEffect: {
    backgroundColor: "#000",
    alignItems: "center",
    borderRadius: 16,
    padding: 5,
    paddingRight: 10,
    paddingBottom: 10,
    marginTop: 10,
  },
  line: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 9,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lineText: {
    fontFamily: "Londrina",
    fontSize: 18,
    color: "#333",
  },
  deleteText: {
    fontSize: 16,
    color: "#db3005",
    fontWeight: "bold",
  },
  btnBlock: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingBottom: 60,
  },
});
