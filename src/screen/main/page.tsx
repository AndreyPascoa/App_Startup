import { Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { StatusBar } from "expo-status-bar"
import { Topbar } from "../../components/topbar/page"

export default function Main() {

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <Topbar />
                <View style={styles.containermain}>
                    <Text style={[styles.text, {fontSize: 15, alignSelf: 'flex-start', marginLeft: 30, marginBottom: 5}]}>Saldo</Text>
                    <View style={styles.viewSaldo}>
                         <Text style={[styles.text, {fontSize: 30}]}>R$10.000.000,00</Text>
                    </View>

                    <View style={styles.containerBody}>
                        <TouchableOpacity style={styles.microphone}>
                            <Image style={styles.imgMicrophone} source={require('../../assets/wave-sound.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}