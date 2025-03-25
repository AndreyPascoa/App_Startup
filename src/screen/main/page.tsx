import { Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { StatusBar } from "expo-status-bar"
import { Topbar } from "../../components/topbar/page"

export default function Main() {

    return (
        <>
            <View style={styles.container}>
                <Topbar />
                <View style={styles.containermain}>

                </View>
            </View>
            <StatusBar style="light" />
        </>
    )
}