import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import axios from 'axios';
import MaskInput from 'react-native-mask-input';


export default function Home() {
    const [searchCep, setSearchCep] = useState('');
    const navigation = useNavigation();
    
    const getCep = async () => {
        if(searchCep.length == 0) {
            Alert.alert('Informe o CEP');
        }else{
            const {data} = await axios.get(`https://viacep.com.br/ws/${searchCep}/json`)
            navigation.navigate('Detalhes', 
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

    return (
        <SafeAreaView style={styles.container}>
            <View>
                 <Text style={styles.title}>BUSCA CEP</Text>
            </View>
            <View>
                <MaskInput
                    mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/,'-',/\d/, /\d/, /\d/]}
                    style={styles.input}
                    placeholder='Digite seu Cep'
                    keyboardType='numeric'
                    value={searchCep}
                    onChangeText={(masked, unmasked) => setSearchCep(unmasked)}
                    onSubmitEditing={getCep}
                />
            </View>
            <View><TouchableOpacity onPress={getCep}>
                    <Text style={styles.busca}>Buscar</Text>
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
    marginTop: 100,
    borderWidth: 1,
    backgroundColor: '#FFFF',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 8,
  },
  title: {
    marginTop: 250,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: "bold",
},
  busca:{
    marginTop: 35,
    borderWidth: 1,
    backgroundColor: '#FFFF',
    textAlign: 'center',
    paddingHorizontal: 60,
    paddingVertical: 15,
    fontWeight: "bold",
    borderRadius: 8,
  },
});
