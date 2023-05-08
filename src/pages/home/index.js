import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { axios } from 'axios';
import { MaskInput } from 'react-native-mask-input';
import { Historico, Favoritos } from '../../../models/';
    
export default function Home() {
    const [searchCep, setSearchCep] = useState('');
    const navigation = useNavigation();
    
    const getCep = async () => {
        if(searchCep.length == 0) {

            Alert.alert('Informe o CEP');

        }else{

            const {data} = await axios.get(`https://viacep.com.br/ws/${searchCep}/json`);

            if(data) {
                const insertHistorico = await Favoritos.create({
                    'cep' : data.cep, 
                    'localidade': data.localidade, 
                    'bairro': data.bairro, 
                    'logradouro': data.logradouro,
                    'uf': data.uf,
                    'complemento': data.complemento, 
                    'ddd': data.ddd,
                    'ibge': data.ibge,
                    'siafi': data.siafi
                });

                if(insertHistorico) {
                    navigation
                        .navigate('Detalhes', 
                                    {'cep' : data.cep, 
                                    'localidade': data.localidade, 
                                    'bairro': data.bairro, 
                                    'logradouro': data.logradouro,
                                    'uf': data.uf,
                                    'complemento': data.complemento, 
                                    'ddd': data.ddd,
                                    'ibge': data.ibge,
                                    'siafi': data.siafi
                                    });
                }
            }else{
                Alert.alert('Falha ao buscar CEP');
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <MaskInput
                    mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/,'-',/\d/, /\d/, /\d/]}
                    placeholder='Digite seu Cep'
                    keyboardType='numeric'
                    value={searchCep}
                    onChangeText={(masked, unmasked) => setSearchCep(unmasked)}
                    onSubmitEditing={getCep}
                />
                <TouchableOpacity onPress={getCep}>
                    <Text>Buscar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
