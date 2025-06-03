import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { api } from "../../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { rootStack } from "../../types/rootStack";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation<NavigationProp<rootStack>>();

  useEffect(() => {
    async function autoLogin() {
      const lembrar = await AsyncStorage.getItem("login_lembrar");
      const emailSalvo = await AsyncStorage.getItem("usuario_email");
      const senhaSalva = await AsyncStorage.getItem("usuario_senha");

      if (lembrar === "true" && emailSalvo && senhaSalva) {
        setEmail(emailSalvo);
        setPassword(senhaSalva);
        handleLogin(emailSalvo, senhaSalva);
      }
    }

    autoLogin();
  }, []);

  async function handleLogin(loginEmail?: string, loginSenha?: string) {
    const usedEmail = loginEmail ?? email;
    const usedSenha = loginSenha ?? password;

    if (!usedEmail || !usedSenha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post("/login", { email: usedEmail, senha: usedSenha });

      if (response.data && response.data.usuario) {
        await AsyncStorage.setItem("usuario_nome", response.data.usuario.nome);

        if (rememberMe) {
          await AsyncStorage.setItem("login_lembrar", "true");
          await AsyncStorage.setItem("usuario_email", usedEmail);
          await AsyncStorage.setItem("usuario_senha", usedSenha);
        } else {
          await AsyncStorage.removeItem("login_lembrar");
        }

        Alert.alert("Login realizado!", `Bem-vindo, ${response.data.usuario.nome}`);
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      } else {
        Alert.alert("Erro", "Usuário ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      Alert.alert("Erro", "Erro ao realizar login.");
    }
  }

  function handleForgotPassword() {
    Alert.alert("Redefinição de senha", "Funcionalidade ainda não implementada.");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>
        Cash<Text style={[styles.title, { color: "#F59E0B" }]}>Chego</Text>
      </Text>

      <Text style={styles.description}>
        Sua rotina mais leve, seu financeiro no controle.
        <Text style={[styles.description, { color: "#F59E0B" }]}> Porque quem empreende merece praticidade</Text>.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          cursorColor={"#F59E0B"}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            cursorColor={"#F59E0B"}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Feather
              name={secureText ? "eye-off" : "eye"}
              size={20}
              color="#888"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.optionsRow}>
          <View style={styles.rememberMe}>
            <Checkbox
              value={rememberMe}
              onValueChange={setRememberMe}
              color={rememberMe ? "#F59E0B" : undefined}
            />
            <Text style={styles.rememberText}>Lembrar-me</Text>
          </View>

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <Image source={require("../../assets/team.png")} style={styles.image} />
    </KeyboardAvoidingView>
  );
}
