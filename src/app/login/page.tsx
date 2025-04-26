import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { stylesLogin } from "./styles";
import { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { rootStackParamList } from "../../types/rootStackParamList";
import { API } from "../../utils/API";
import { LoginProps } from "../../types/login";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Login() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigation = useNavigation<NavigationProp<rootStackParamList>>();

    async function handleLogin() {
        try {
            const response = await API.post("/login", {
                email: email,
                password: password
            });
            const data: LoginProps = response.data;

            console.log(response.data);
            

            if (data.success) {
                await AsyncStorage.setItem("usuario", JSON.stringify(data.usuario));
            }
            navigation.navigate("Home");
        } catch (error) {
            console.error("Login failed:", error);
            Alert.alert("Login failed", "Please check your credentials and try again.");
        }
    }

    return (
        <View style={stylesLogin.container}>
            <View style={stylesLogin.main}>

                <Image 
                    source={require("../../../assets/logo.png")}
                    style={{ width: 200, height: 120}}
                />

                <Text style={stylesLogin.title}>Email</Text>
                <TextInput
                    style={stylesLogin.text_input}
                    cursorColor={'#1e1f20'}
                    selectionColor={'#1e1f20'}
                    onChangeText={setEmail}
                    value={email}
                />

                <Text style={stylesLogin.title}>Password</Text>
                <TextInput
                    style={stylesLogin.text_input}
                    cursorColor={'#1e1f20'}
                    selectionColor={'#1e1f20'}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />

                <TouchableOpacity 
                    style={stylesLogin.button_enviar}
                    onPress={handleLogin}
                    activeOpacity={0.7}    
                >
                    <Text style={stylesLogin.text_button}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}