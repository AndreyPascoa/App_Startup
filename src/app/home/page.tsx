import axios from "axios";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { API } from "../../utils/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { HomeProps, ListaExtrato } from "../../types/home";

export default function Home() {

    const [balanco, setBalanço] = useState<string>()
    const [extrato, setExtrato] = useState<ListaExtrato[]>([])

    async function handleExtrato() {
        const usuario = await AsyncStorage.getItem('usuario')
        let id_empresa = '';

        if (usuario !== null) {
            const usuarioJson = JSON.parse(usuario)
            id_empresa = usuarioJson.id_empresa
        }

        API.get(`/extrato/${id_empresa}`)
            .then((response) => {
                const data: HomeProps = response.data
                setBalanço(data.balanco)
                const currentData = Object.entries(data.lista_extrato) as ListaExtrato[]
                setExtrato(currentData)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(() => { handleExtrato() }, [])

    function getByCategoria(categoria: string) {
        switch (categoria.toLowerCase()) {
            case 'compra':
                return require('../../../assets/compra.png');
            case 'venda':
                return require('../../../assets/vendas.png');
            case 'materia_prima':
                return require('../../../assets/materia_prima.png');
            case 'fornecedor':
                return require('../../../assets/fornecedor.png');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.main_extrato}>
                <Text style={styles.title}>Balanço</Text>
                <Text style={styles.title_balance}>{balanco}</Text>
            </View>

            <View style={styles.drop_list}>
                <TouchableOpacity style={[styles.container_image, { backgroundColor: '#004a77' }]}>
                    <Image
                        source={require('../../../assets/compra.png')}
                        style={styles.imagem}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.container_image, { backgroundColor: '#288f43' }]}>
                    <Image
                        source={require('../../../assets/vendas.png')}
                        style={styles.imagem}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.container_image, {backgroundColor: '#cf6621'}]}>
                    <Image
                        source={require('../../../assets/fornecedor.png')}
                        style={styles.imagem}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.container_image, {backgroundColor: '#964ad4'}]}>
                    <Image
                        source={require('../../../assets/materia_prima.png')}
                        style={styles.imagem}
                    />
                </TouchableOpacity>
            </View>


            <View style={styles.container_view}>
                <FlatList
                    data={extrato}
                    keyExtractor={([key]) => key}
                    renderItem={({ item: [, item] }) => (
                        <View style={[styles.item, {backgroundColor: item.valor.includes('-') ? '#B22A39' : '#466028'}]}>
                            <Text style={styles.text_item}>R$ {item.valor}</Text>
                            <Text style={styles.text_item}>{item.pessoa_emitiu}</Text>
                            <Image source={getByCategoria(item.categoria)} style={styles.imagem}/>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    )
}