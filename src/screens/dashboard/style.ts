import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    justifyContent: "space-between",
    elevation: 3,
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
  },
  cardValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
  },
  cardSub: {
    fontSize: 14,
    color: "#777",
  },
});
