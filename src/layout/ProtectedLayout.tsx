import { View, StyleSheet } from "react-native";
import { ReactNode } from "react";
import { BottomBar } from "../components/sidebar/page";

export function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
