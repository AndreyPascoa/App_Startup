import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "500",
  },
  form: {
    gap: 20,
    marginBottom: 30,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#F59E0B",
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    marginLeft: 10,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    marginLeft: 8,
    color: "#333",
    fontSize: 14,
  },
  forgotText: {
    color: "#F59E0B",
    fontSize: 14,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#F59E0B",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  textButton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    position: "absolute",
    bottom: -5,
    width: "100%",
    height: 180,
    right: 30,
    resizeMode: "contain",
  },
});
