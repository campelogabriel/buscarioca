import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
function ManualScreen({ navigation }) {
  const [selected, setSelected] = useState("empty");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Perguntas e Respostas</Text>
      </View>
      <View style={styles.blockQuestions}>
        <TouchableOpacity
          onPress={() => {
            if (selected == "line") {
              setSelected("empty");
              return;
            }
            setSelected("line");
          }}
          style={{
            ...styles.question,
            display:
              selected == "line" || selected == "empty" ? "flex" : "none",
          }}
        >
          <Text style={styles.questionText}>Como solicitar uma linha</Text>
          <MaterialIcons
            name={
              selected == "line"
                ? "keyboard-arrow-down"
                : "keyboard-arrow-right"
            }
            size={28}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (selected == "update") {
              setSelected("empty");
              return;
            }
            setSelected("update");
          }}
          style={{
            ...styles.question,
            display:
              selected == "update" || selected == "empty" ? "flex" : "none",
          }}
        >
          <Text style={styles.questionText}>Como funciona a atualização</Text>
          <MaterialIcons
            name={
              selected == "update"
                ? "keyboard-arrow-down"
                : "keyboard-arrow-right"
            }
            size={28}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (selected == "bus") {
              setSelected("empty");
              return;
            }
            setSelected("bus");
          }}
          style={{
            ...styles.question,
            display: selected == "bus" || selected == "empty" ? "flex" : "none",
          }}
        >
          <Text style={styles.questionText}>Informações sobre o ônibus</Text>
          <MaterialIcons
            name={
              selected == "bus" ? "keyboard-arrow-down" : "keyboard-arrow-right"
            }
            size={28}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (selected == "prefix") {
              setSelected("empty");
              return;
            }
            setSelected("prefix");
          }}
          style={{
            ...styles.question,
            display:
              selected == "prefix" || selected == "empty" ? "flex" : "none",
          }}
        >
          <Text style={styles.questionText}>O que são os prefixos</Text>
          <MaterialIcons
            name={
              selected == "prefix"
                ? "keyboard-arrow-down"
                : "keyboard-arrow-right"
            }
            size={28}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
          flex: 1,
          display: selected == "empty" ? "flex" : "none",
        }}
      >
        <TouchableOpacity
          style={{
            borderColor: "#fff",
            borderWidth: 2,
            backgroundColor: "#fff",
            padding: 12,
            borderRadius: 4,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Voltar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: "#fff",
            borderWidth: 2,
            padding: 12,
            borderRadius: 4,
          }}
          onPress={() => navigation.navigate("HomeInitial")}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              color: "#fff",
            }}
          >
            Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ManualScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    padding: 24,
  },
  headerText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
  blockQuestions: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    gap: 50,
    flex: 4,
  },
  question: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 3,
    borderTopColor: "#fff",
    borderRightWidth: 3,
    borderRightColor: "#fff",
    borderLeftWidth: 3,
    borderLeftColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderRadius: 16,
  },
  questionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
