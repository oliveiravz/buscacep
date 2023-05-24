import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import firebase from '../../firebaseConnection';


export default function Detalhes({route}) {
  const database = firebase.firestore();
  const getFavoritos = async () => {
    const documentID = await database.collection('dados').orderBy('data_hora', 'desc').limit(1).get();

    if(!documentID.empty) {
      const lastId = documentID.docs[0];

      var lastIdData = lastId.data();
    }

    if(!lastIdData.empty) {

      try {

        await database.collection('dados').doc(lastIdData.id).update({
          favoritos: true
        });

      } catch (error) {
        console.error('Erro ao realizar o update:', error);  
      }
    }
  };
  return (
    <View style={styles.container}>
        <Text>
            Detalhes sobre o CEP: {route.params?.cep}{'\n'}
            Rua: {route.params?.logradouro}{'\n'}
            Bairro: {route.params?.bairro}{'\n'}
            Complemento: {route.params?.complemento}{'\n'}
            Estado: {route.params?.uf}{'\n'}
            DDD: {route.params?.ddd}{'\n'}
            Código IBGE: {route.params?.ibge}{'\n'}
        </Text> 
        <Text>Detalhes!</Text>
        <TouchableOpacity onPress={getFavoritos}>
          <Text style={styles.busca}>Favoritar</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
    </View>
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
