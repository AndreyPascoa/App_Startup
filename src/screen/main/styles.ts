import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containermain: {
        height: '80%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewSaldo: {
        height: 80,
        width: '90%',
        backgroundColor: '#fff2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        elevation: 5
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: 'monospace'
    },
    containerBody: {
        flex: 1,
        backgroundColor: '#fff1',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: '85%',
        marginTop: 10,
        width: '95%',
    },
    microphone: {
        borderRadius: '50%',
        backgroundColor: '#555',
        width: '80%',
        height: '50%',
        marginBottom: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        borderRadius: 10,
        width: '90%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    textButton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'monospace'
    },
    imgMicrophone: {
        height: 100,
        width: 100,
        resizeMode: 'contain',

    }
})