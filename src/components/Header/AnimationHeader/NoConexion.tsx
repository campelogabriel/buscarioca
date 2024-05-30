import { Text, View } from "react-native";
function NoConexion() {
  return (
    <Text
      style={{
        backgroundColor: "#333",
        color: "#eee",
        padding: 8,
        borderRadius: 4,
        textAlign: "center",
      }}
    >
      Sem Conexão com Internet
    </Text>
  );
}

export default NoConexion;
