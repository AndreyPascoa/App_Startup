import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./style";
import { BarChart } from "react-native-chart-kit";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { rootStack } from "../types/rootStack";
import * as Animatable from "react-native-animatable";
import { api } from "../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const navigation = useNavigation<NavigationProp<rootStack>>();
  const [nomeUsuario, setNomeUsuario] = useState("...");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [notifications, setNotifications] = useState<string[]>([]);
  const [tarefas, setTarefas] = useState<string[]>([]);
  const [resumo, setResumo] = useState({ receita: 0, despesa: 0, saldo: 0 });
  const [grafico, setGrafico] = useState<number[]>([]);
  const [labelsGrafico, setLabelsGrafico] = useState<string[]>([]);
  const [anotacoes, setAnotacoes] = useState<string[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const nomeSalvo = await AsyncStorage.getItem("usuario_nome");
        if (nomeSalvo){
          setNomeUsuario(nomeSalvo);
          console.log(nomeSalvo);
          
        } 
          

        const [noti, tarefasRes, resumoRes, graficoRes, anotacoesRes, produtosRes] = await Promise.all([
          api.get("/notificacoes"),
          api.get("/tarefas"),
          api.get("/financeiro"),
          api.get("/grafico"),
          api.get("/anotacoes"),
          api.get("/produtos"),
        ]);

        setAnotacoes(anotacoesRes.data.map((a: any) => a.texto));
        setNotifications(noti.data.map((n: any) => n.mensagem));
        setTarefas(tarefasRes.data.map((t: any) => t.descricao));
        setResumo({
          receita: Number(resumoRes.data?.receita) || 0,
          despesa: Number(resumoRes.data?.despesa) || 0,
          saldo: Number(resumoRes.data?.saldo) || 0,
        });
        setGrafico(graficoRes.data.map((g: any) => parseFloat(g.valor)));
        setLabelsGrafico(graficoRes.data.map((g: any) => g.dia));
        setProdutos(produtosRes.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    }

    fetchData();
  }, []);


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animatable.View animation="fadeInDown" duration={700}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Olá, <Text style={styles.highlight}>{nomeUsuario}</Text>
          </Text>
          <Feather name="user" size={28} color="#F59E0B" />
        </View>
      </Animatable.View>

      <Animatable.Text animation="fadeInUp" delay={100} style={styles.sectionTitle}>
        Notificações
      </Animatable.Text>
      <Animatable.View
        animation="fadeInUp"
        delay={200}
        style={[styles.notesBlock, { backgroundColor: "#fff3cd", borderLeftWidth: 4, borderLeftColor: "#f59e0b" }]}
      >
        {notifications.map((note, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.noteItem, { paddingVertical: 12 }]}
            onPress={() => {
              setModalMessage(note);
              setModalVisible(true);
            }}
          >
            <Feather name="alert-triangle" size={18} color="#f59e0b" />
            <Text style={[styles.noteText, { fontWeight: "bold", color: "#92400e" }]}>{note}</Text>
          </TouchableOpacity>
        ))}
      </Animatable.View>

      <Animatable.Text animation="fadeInUp" delay={300} style={styles.sectionTitle}>
        Resumo financeiro
      </Animatable.Text>

      <View style={styles.cardContainer}>
        <Animatable.View animation="fadeInUp" delay={400} duration={600} style={styles.card}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setModalMessage("Receitas detalhadas");
              setModalVisible(true);
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Feather name="dollar-sign" size={20} color="#22c55e" />
              <View>
                <Text style={styles.cardLabel}>Receitas</Text>
                <Text style={[styles.cardValue, { color: "#22c55e" }]}>
                  R$ {Number(resumo.receita ?? 0).toFixed(2)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={500} duration={600} style={styles.card}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setModalMessage("Despesas detalhadas");
              setModalVisible(true);
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Feather name="arrow-up" size={20} color="#ef4444" />
              <View>
                <Text style={styles.cardLabel}>Despesas</Text>
                <Text style={[styles.cardValue, { color: "#ef4444" }]}>
                  R$ {(resumo.despesa ?? 0).toFixed(2)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={600} duration={600} style={styles.card}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setModalMessage("Saldo atualizado");
              setModalVisible(true);
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Feather name="bar-chart" size={20} color="#F59E0B" />
              <View>
                <Text style={styles.cardLabel}>Saldo</Text>
                <Text style={[styles.cardValue, { color: "#f59e0b" }]}>
                  R$ {(resumo.saldo ?? 0).toFixed(2)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      </View>

      <Animatable.Text animation="fadeInUp" delay={700} style={styles.sectionTitle}>
        A fazer hoje
      </Animatable.Text>

      <Animatable.View animation="zoomIn" delay={800} style={styles.notesBlock}>
        {anotacoes.map((a, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.noteItem}
            onPress={() => {
              setModalMessage(a);
              setModalVisible(true);
            }}
          >
            <Feather name="file-text" size={18} color="#6366f1" />
            <Text style={styles.noteText}>{a}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.addNoteButton} onPress={() => navigation.navigate("NovaAnotacao")}>
          <Feather name="plus" size={16} color="#F59E0B" />
          <Text style={styles.addNoteText}>Adicionar tarefas</Text>
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.Text animation="fadeInUp" delay={1300} style={styles.sectionTitle}>
        Produtos cadastrados
      </Animatable.Text>

      <Animatable.View animation="fadeInUp" delay={1400} style={[styles.notesBlock, { maxHeight: 350 }]}>
        {produtos.length === 0 ? (
          <Text style={styles.noteText}>Nenhum produto encontrado.</Text>
        ) : (
          <ScrollView nestedScrollEnabled={true}>
            {produtos.map((produto, idx) => (
              <View key={idx} style={styles.noteItem}>
                <Feather name="package" size={18} color="#10b981" />
                <View>
                  <Text style={[styles.noteText, { fontWeight: "bold" }]}>{produto.nome}</Text>
                  <Text style={styles.noteText}>Estoque: {produto.estoque}</Text>
                  <Text style={styles.noteText}>Preço: R$ {parseFloat(produto.preco_venda).toFixed(2)}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </Animatable.View>


      <Animatable.Text animation="fadeInUp" delay={900} style={styles.sectionTitle}>
        Ações rápidas
      </Animatable.Text>

      <Animatable.View animation="bounceInUp" delay={1000} style={styles.actions}>
        <Animatable.View animation="pulse" iterationCount="infinite" duration={2500} style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("NovaReceita")}
          >
            <Feather name="plus-circle" size={20} color="#fff" />
            <Text style={styles.actionText}>Nova Receita</Text>
          </TouchableOpacity>
        </Animatable.View>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#ef4444" }]}
          activeOpacity={0.7}
        >
          <Feather name="minus-circle" size={20} color="#fff" />
          <Text style={styles.actionText}>Nova Despesa</Text>
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.Text animation="fadeInUp" delay={1100} style={styles.sectionTitle}>
        Gráfico de movimentações
      </Animatable.Text>

      <Animatable.View animation="fadeIn" delay={1200}>
        <BarChart
          data={{
            labels: labelsGrafico,
            datasets: [{ data: grafico }],
          }}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisLabel="R$ "
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
            style: { borderRadius: 12 },
          }}
          style={{ marginVertical: 8, borderRadius: 12 }}
        />
      </Animatable.View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes</Text>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20 }}>
              <Text style={{ color: "#F59E0B", textAlign: "right", fontWeight: "bold" }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
