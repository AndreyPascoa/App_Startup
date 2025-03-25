import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    top: {
        height: 60,
        backgroundColor: '#1d1d1d',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        elevation: 3
    },
    iconMenu: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    }
})