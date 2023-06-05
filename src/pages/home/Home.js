import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaskInput from 'react-native-mask-input';
import { FontAwesome } from '@expo/vector-icons';

import firebase from '../../firebaseConnection';
import api from '../../services/api';

export default function Home() {
  const [searchCep, setSearchCep] = useState('');
  const navigation = useNavigation();
  const database = firebase.firestore();

  function saveData(data) {
    database.collection("dados").add({
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
  }

  const getCep = async () => {
    
    if (searchCep.length == 0 || searchCep.length < 8) {

      ToastAndroid.show('Informe um CEP válido', ToastAndroid.SHORT);

    }else {

      const { data } = await api.get(`/${searchCep}/json`);

      if (data.erro) {
        ToastAndroid.show('CEP não encontrado', ToastAndroid.LONG);
      } else {

        saveData(data);

        navigation
          .navigate('Detalhes',
            {
              'cep': data.cep,
              'localidade': data.localidade,
              'bairro': data.bairro,
              'logradouro': data.logradouro,
              'uf': data.uf,
              'complemento': data.complemento,
              'ddd': data.ddd,
              'ibge': data.ibge,
              'siafi': data.siafi
            });
        setSearchCep('');
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <FontAwesome name='map-marker' size={275} color='#000000' />
        <Text style={styles.title}>BUSCACEP</Text>
      <View>
        <MaskInput
          mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
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
    width: 300,
    backgroundColor: '#FFFF',
    padding: 15,
    borderRadius: 8,
    fontSize: 20,
    margin: 10
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 900,
    fontStyle: 'italic'
  },
  titleIcon: {
    textAlign: 'center',
  },
  busca: {
    borderWidth: 1,
    backgroundColor: '#000000',
    textAlign: 'center',
    paddingHorizontal: 60,
    paddingVertical: 15,
    fontWeight: "bold",
    borderRadius: 8,
    color: '#ffff',
    marginTop: 15
  },
});
