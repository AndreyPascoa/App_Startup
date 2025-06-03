import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { api } from "../../service/api";

export default function NovaAnotacao() {
  const [texto, setTexto] = useState("");
  const navigation = useNavigation<any>();

  async function salvar() {
    if (!texto.trim()) {
      Alert.alert("Erro", "Digite alguma anotação antes de salvar.");
      return;
    }

    try {
      await api.post("/anotacoes", { texto });
      Alert.alert("Salvo!", "Sua anotação foi registrada.");
      setTexto("");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar anotação:", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar a anotação.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Anotação</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite sua anotação..."
        placeholderTextColor="#aaa"
        multiline
        numberOfLines={8}
        value={texto}
        onChangeText={setTexto}
      />

      <TouchableOpacity style={styles.button} onPress={salvar}>
        <Feather name="save" size={20} color="#fff" />
        <Text style={styles.buttonText}>Salvar Anotação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F59E0B",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#F59E0B",
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    textAlignVertical: "top",
    color: "#333",
  },
  button: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#F59E0B",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
