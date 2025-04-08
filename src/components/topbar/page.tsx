import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { rootStackNavigation } from "../../types/rootStackNavigation";

export function Topbar() {

    const navigation = useNavigation<NavigationProp<rootStackNavigation>>();

    return (
        <View  style={styles.top}>
            <TouchableOpacity onPress={() => navigation.navigate('Config')} >
                <Image style={styles.iconMenu} source={require('../../assets/menu.png')} />
            </TouchableOpacity>
            <Text style={styles.title}>CashChego</Text>
        </View>
    )
}