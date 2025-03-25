import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export function Topbar() {
    return (
        <View  style={styles.top}>
            <TouchableOpacity>
                <Image style={styles.iconMenu} source={require('../../assets/menu.png')} />
            </TouchableOpacity>
            <Text style={styles.title}>CashChegô</Text>
            <TouchableOpacity>
                <Image style={styles.iconMenu} source={require('../../assets/user.png')} />
            </TouchableOpacity>
        </View>
    )
}