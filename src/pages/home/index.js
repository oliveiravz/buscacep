import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaskInput from 'react-native-mask-input';
import { FontAwesome } from '@expo/vector-icons';

import firebase from '../../firebaseConnection';
import api from '../../services/api';

export default function Home() {
    const [searchCep, setSearchCep] = useState('');
    const navigation = useNavigation();
    const database = firebase.firestore();
    const [count, setCount] = useState(0);

    function saveData(data){
        database.collection("dados").add({
            id: count,
            favoritos: false,
            cep: data.cep,
            localidade: data.localidade,
            bairro: data.bairro,
            logradouro: data.logradouro,
            uf: data.uf,
            complemento: data.complemento,
            ddd: data.ddd,
            ibge: data.ibge,
            siafi: data.siafi,
            data_hora: firebase.firestore.FieldValue.serverTimestamp()
        });

        setCount(count + 1);
    }
    
    const getCep = async () => {
        if(searchCep.length == 0) {
            Alert.alert('Informe o CEP');
        }else{
            const {data} = await api.get(`/${searchCep}/json`);
            
            if(data.erro) {
                Alert.alert('CEP não encontrado');
            }else{
                saveData(data);
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
            
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                <FontAwesome name='map-marker' size='275px' color='#000000' />
                <Text style={styles.title}>BUSCACEP</Text>
            </View>
            <View>
                <MaskInput
                    mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/,'-',/\d/, /\d/, /\d/]}
                    style={styles.input}
                    placeholder='Digite seu CEP'
                    keyboardType='numeric'
                    value={searchCep}
                    onChangeText={(masked, unmasked) => setSearchCep(unmasked)}
                    onSubmitEditing={getCep}
                />
            </View>
            <View>
              <TouchableOpacity onPress={getCep}>
                  <Text style={styles.busca}>BUSCAR</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8C00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 25,
    backgroundColor: '#FFFF',
    padding: 15,
    paddingVertical: 15,
    borderRadius: 8,
    fontSize: 20,
    margin: 10
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: "bolder",
    fontStyle: 'italic',
  },
  busca:{
    marginTop: 35,
    borderWidth: 1,
    backgroundColor: '#000000',
    textAlign: 'center',
    paddingHorizontal: 60,
    paddingVertical: 15,
    fontWeight: "bold",
    borderRadius: 8,
    color: '#ffff'
  },
});
