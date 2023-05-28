import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Card } from 'react-native-paper';

import firebase from '../../firebaseConnection';

export default function Detalhes({ route }) {

  const database = firebase.firestore();

  const getFavoritos = async () => {

    validate(route.params?.cep);
    // try {
    //   database.collection("favoritos").add({
    //     cep: route.params.cep,
    //     localidade: route.params.localidade,
    //     bairro: route.params.bairro,
    //     logradouro: route.params.logradouro,
    //     uf: route.params.uf,
    //     complemento: route.params.complemento,
    //     ddd: route.params.ddd,
    //     ibge: route.params.ibge,
    //     siafi: route.params.siafi,
    //     data_hora: firebase.firestore.FieldValue.serverTimestamp()
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  function validate(item) {
    const collection = database.collection("favoritos").where('cep', '==', item).get();

    console.log(collection);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <View style={styles.details}>
          <Text style={styles.title}>
            Detalhes sobre o CEP: {route.params?.cep}{'\n'}
          </Text>
          <Text>
            Rua: {route.params?.logradouro}{'\n'}
            Bairro: {route.params?.bairro}{'\n'}
            Complemento: {route.params?.complemento}{'\n'}
            Estado: {route.params?.uf}{'\n'}
            DDD: {route.params?.ddd}{'\n'}
            Código IBGE: {route.params?.ibge}{'\n'}
          </Text>
        </View>
      </Card>
      <View>
        <TouchableOpacity onPress={getFavoritos}>
          <Text style={styles.button}>Favoritar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 9,
    backgroundColor: '#FF8C00',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "900",
    margin: 25
  },
  button: {
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
  details: {
    margin: 25
  }
});
