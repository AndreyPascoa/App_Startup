import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

export function BottomBar() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const isFocused = (name: string) => route.name === name;

  return (
    <Animatable.View animation="fadeInUp" duration={700} style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Animatable.View animation={isFocused("Home") ? "pulse" : undefined} duration={600} iterationCount="infinite">
          <Feather
            name="home"
            size={22}
            color={isFocused("Home") ? "#F59E0B" : "#555"}
          />
        </Animatable.View>
        <Text style={[styles.label, isFocused("Home") && styles.activeLabel]}>
          Home
        </Text>
      </TouchableOpacity>

      <Animatable.View animation="bounceIn" duration={1000}>
        <TouchableOpacity
          style={styles.centralButton}
          onPress={() => navigation.navigate("CadastroProduto")}
        >
          <Feather name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </Animatable.View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Animatable.View animation={isFocused("Dashboard") ? "pulse" : undefined} duration={600} iterationCount="infinite">
          <Feather
            name="bar-chart-2"
            size={22}
            color={isFocused("Dashboard") ? "#F59E0B" : "#555"}
          />
        </Animatable.View>
        <Text
          style={[styles.label, isFocused("Dashboard") && styles.activeLabel]}
        >
          Dashboard
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 70,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  centralButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F59E0B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#F59E0B",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: "#555",
  },
  activeLabel: {
    color: "#F59E0B",
    fontWeight: "bold",
  },
});
