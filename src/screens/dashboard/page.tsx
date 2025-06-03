import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./style";
import { api } from "../../service/api";

export default function Dashboard() {
  const [vendas, setVendas] = useState({ total: 0, variacao: "" });
  const [despesas, setDespesas] = useState({ total: 0, detalhe: "" });
  const [clientes, setClientes] = useState({ total: 0 });
  const [estoque, setEstoque] = useState({ total: 0, baixos: 0 });
  const [performance, setPerformance] = useState({ percentual: 0, comparacao: "" });

  useEffect(() => {
    async function fetchData() {
      try {
        const [v, d, c, e, p] = await Promise.all([
          api.get("/dashboard/vendas"),
          api.get("/dashboard/despesas-hoje"),
          api.get("/dashboard/novos-clientes"),
          api.get("/dashboard/estoque"),
          api.get("/dashboard/performance"),
        ]);

        // Convertendo os totais para número, se necessário
        setVendas({
          total: Number(v.data.total) || 0,
          variacao: v.data.variacao || "",
        });

        setDespesas({
          total: Number(d.data.total) || 0,
          detalhe: d.data.detalhe || "",
        });

        setClientes({
          total: Number(c.data.total) || 0,
        });

        setEstoque({
          total: Number(e.data.total) || 0,
          baixos: Number(e.data.baixos) || 0,
        });

        setPerformance({
          percentual: Number(p.data.percentual) || 0,
          comparacao: p.data.comparacao || "",
        });
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.card, { borderLeftColor: "#22c55e" }]}>
        <Feather name="dollar-sign" size={28} color="#22c55e" />
        <Text style={styles.cardTitle}>Total de Vendas</Text>
        <Text style={styles.cardValue}>
          R$ {Number(vendas?.total ?? 0).toFixed(2)}
        </Text>
        <Text style={styles.cardSub}>{vendas.variacao}</Text>
      </View>

      <View style={[styles.card, { borderLeftColor: "#ef4444" }]}>
        <Feather name="credit-card" size={28} color="#ef4444" />
        <Text style={styles.cardTitle}>Despesas Hoje</Text>
        <Text style={[styles.cardValue, { color: "#ef4444" }]}>
          R$ {Number(despesas?.total ?? 0).toFixed(2)}
        </Text>
        <Text style={[styles.cardSub, { color: "#b91c1c" }]}>{despesas.detalhe}</Text>
      </View>

      <View style={[styles.card, { borderLeftColor: "#3b82f6" }]}>
        <Feather name="users" size={28} color="#3b82f6" />
        <Text style={styles.cardTitle}>Novos Clientes</Text>
        <Text style={[styles.cardValue, { color: "#3b82f6" }]}>+{clientes.total}</Text>
        <Text style={[styles.cardSub, { color: "#2563eb" }]}>Últimas 24h</Text>
      </View>

      <View style={[styles.card, { borderLeftColor: "#eab308" }]}>
        <Feather name="box" size={28} color="#eab308" />
        <Text style={styles.cardTitle}>Estoque Atual</Text>
        <Text style={[styles.cardValue, { color: "#eab308" }]}>
          {estoque.total} itens
        </Text>
        <Text style={[styles.cardSub, { color: "#92400e" }]}>
          Baixo em {estoque.baixos} produtos
        </Text>
      </View>

      <View style={[styles.card, { borderLeftColor: "#8b5cf6" }]}>
        <Feather name="activity" size={28} color="#8b5cf6" />
        <Text style={styles.cardTitle}>Performance</Text>
        <Text style={[styles.cardValue, { color: "#8b5cf6" }]}>
          ↑ {performance.percentual}%
        </Text>
        <Text style={[styles.cardSub, { color: "#7c3aed" }]}>{performance.comparacao}</Text>
      </View>
    </ScrollView>
  );
}
