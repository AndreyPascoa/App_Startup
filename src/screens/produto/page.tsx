import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { styles } from "./style";
import { api } from "../../service/api"; 

export default function CadastroProduto() {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precoVenda, setPrecoVenda] = useState("");
  const [precoCusto, setPrecoCusto] = useState("");
  const [estoque, setEstoque] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [dataValidade, setDataValidade] = useState<Date | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);

  async function handleSalvar() {
    if (!nome || !precoVenda || !estoque) {
      Alert.alert("Erro", "Preencha Nome, Preço de venda e Estoque.");
      return;
    }

    try {
      await api.post("/produtos", {
        nome,
        categoria,
        precoVenda,
        precoCusto,
        estoque,
        dataValidade: dataValidade ? dataValidade.toISOString().split("T")[0] : null,
        ativo,
        descricao,
      });

      Alert.alert("Sucesso", "Produto cadastrado com sucesso!");

      // Limpa os campos
      setNome("");
      setCategoria("");
      setPrecoVenda("");
      setPrecoCusto("");
      setEstoque("");
      setDescricao("");
      setDataValidade(undefined);
      setAtivo(true);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao cadastrar o produto.");
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Feather name="package" size={32} color="#F59E0B" />
          <Text style={styles.title}>Novo Produto</Text>
          <Text style={styles.subtitle}>Preencha os dados abaixo</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Identificação</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do produto *"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Categoria (opcional)"
            value={categoria}
            onChangeText={setCategoria}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preço</Text>
          <TextInput
            style={styles.input}
            placeholder="Preço de venda *"
            keyboardType="numeric"
            value={precoVenda}
            onChangeText={setPrecoVenda}
          />
          <TextInput
            style={styles.input}
            placeholder="Preço de custo"
            keyboardType="numeric"
            value={precoCusto}
            onChangeText={setPrecoCusto}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estoque & Validade</Text>
          <TextInput
            style={styles.input}
            placeholder="Quantidade em estoque *"
            keyboardType="numeric"
            value={estoque}
            onChangeText={setEstoque}
          />
          <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
            <Text style={{ color: dataValidade ? "#333" : "#aaa" }}>
              {dataValidade ? dataValidade.toLocaleDateString() : "Data de validade"}
            </Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={dataValidade || new Date()}
              mode="date"
              display="calendar"
              onChange={(event: DateTimePickerEvent, date?: Date) => {
                setShowPicker(false);
                if (date) setDataValidade(date);
              }}
            />
          )}
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Produto ativo</Text>
            <Switch
              value={ativo}
              onValueChange={setAtivo}
              thumbColor={ativo ? "#F59E0B" : "#ccc"}
              trackColor={{ true: "#fde68a", false: "#ddd" }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            multiline
            numberOfLines={5}
            placeholder="Descrição opcional"
            value={descricao}
            onChangeText={setDescricao}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Feather name="check" size={20} color="#fff" />
          <Text style={styles.buttonText}>Salvar Produto</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
