import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window'); // pega tamanho da tela

export const stylesLogin = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#131314",
    },
    main: {
        width: width * 0.8, // 80% da largura da tela
        height: height * 0.5, // 50% da altura da tela
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1b1b1b",
        borderRadius: 10,
        padding: 20,
    },
    text_input: {
        backgroundColor: '#c4c7c5',
        width: "100%",
        height: 50,
        borderRadius: 10,
        color: '#131314',
        padding: 10,
        fontSize: width * 0.04, // tamanho do texto adaptável
        fontWeight: 'bold',
        textAlign: 'center',
    },
    title: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: '#c4c7c5',
        alignSelf: 'flex-start',
        marginLeft: 10,
        opacity: 0.8,
        marginTop: 20,
    },
    button_enviar: {
        backgroundColor: '#004a77',
        width: "100%",
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    text_button: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: '#c4c7c5',
        textAlign: 'center',
        textTransform: 'uppercase',
    }
});
