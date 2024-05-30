import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
function ManualScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Perguntas e Respostas</Text>
      </View>
      <View style={styles.blockQuestions}>
        <TouchableOpacity style={styles.question}>
          <Text style={{ color: "#fff" }}>Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.question}>
          <Text style={{ color: "#fff" }}>Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.question}>
          <Text style={{ color: "#fff" }}>Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.question}>
          <Text style={{ color: "#fff" }}>Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.question}>
          <Text style={{ color: "#fff" }}>Test</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 24,
          flex: 1,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              borderColor: "#fff",
              borderWidth: 2,
              fontSize: 16,
              backgroundColor: "#fff",
              fontWeight: "bold",
              padding: 12,
              borderRadius: 8,
              textAlign: "center",
            }}
          >
            Voltar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("HomeInitial")}>
          <Text
            style={{
              borderColor: "#fff",
              borderWidth: 2,
              fontWeight: "bold",
              fontSize: 16,
              color: "#fff",
              textAlign: "center",
              padding: 12,
              borderRadius: 8,
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
    paddingHorizontal: 32,
    gap: 50,
    flex: 4,
  },
  question: {
    padding: 16,
    borderTopWidth: 3,
    borderTopColor: "#fff",
    borderRightWidth: 3,
    borderRightColor: "#fff",
    borderLeftWidth: 3,
    borderLeftColor: "#fff",
    borderRadius: 16,
  },
});
