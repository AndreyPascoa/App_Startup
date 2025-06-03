import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../service/api"; // ajuste conforme seu projeto

export default function NovaReceita() {
  const navigation = useNavigation();
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");

  const salvarReceita = async () => {
    if (!descricao || !valor) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await api.post("/receitas", {
        descricao,
        valor,
        categoria,
      });

      Alert.alert("Sucesso", "Receita salva com sucesso!");
      setDescricao("");
      setValor("");
      setCategoria("");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar receita:", error);
      Alert.alert("Erro", "Não foi possível salvar a receita.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Feather name="plus-circle" size={28} color="#F59E0B" />
        <Text style={styles.title}>Nova Receita</Text>
      </View>

      <Text style={styles.label}>Descrição *</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição da receita"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Valor *</Text>
      <TextInputMask
        type={"money"}
        style={styles.input}
        placeholder="R$ 0,00"
        value={valor}
        onChangeText={setValor}
        options={{
          precision: 2,
          separator: ",",
          delimiter: ".",
          unit: "R$ ",
          suffixUnit: "",
        }}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Categoria</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Venda, Serviços, Outros"
        value={categoria}
        onChangeText={setCategoria}
      />

      <TouchableOpacity style={styles.button} onPress={salvarReceita}>
        <Feather name="check" size={18} color="#fff" />
        <Text style={styles.buttonText}>Salvar Receita</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});
