import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

import firebase from '../../firebaseConnection';


export default function Historico() {
  const [history, setHistory] = useState([])
  const database = firebase.firestore()

  useEffect(() => {
    database.collection("dados").orderBy("data_hora", "desc").onSnapshot((query) => {
      const list = []
      query.forEach((doc) => {
        list.push({...doc.data(), id: doc.id})
      })
      setHistory(list)
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title_cabecalho}>
        Histórico de Pesquisa

        <TouchableOpacity style={styles.button}>
          <Text >Limpar Historico</Text>
        </TouchableOpacity>
      
      </Text>
      
      <FlatList
        data={history}
        renderItem={({ item }) => {
          return(
            <SafeAreaView>
                <Card>
                    <Text style={styles.title}>
                        CEP: {item.cep}{'\n'}
                        Rua: {item.logradouro}{'\n'}
                        Bairro: {item.bairro}{'\n'}
                        Complemento: {item.complemento}{'\n'}
                        Estado: {item.uf}{'\n'}
                        DDD: {item.ddd}{'\n'}
                        Código IBGE: {item.ibge}{'\n'}
                    </Text>
                </Card>
                <Text>{'\n'}</Text>

            
            </SafeAreaView>
          )
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8C00',
    padding: '5%',
    // justifyContent: 'center'
  },
  title: {
    padding: '5%'
  },
  title_cabecalho: {
    // alignItems: 'center',
    padding: '5%',
    // justifyContent: 'center',
    fontWeight: 'bolder'
  },
  button:{
    padding: '5px',
    alignItems: 'flex-end',
    justifyContent: 'flex-end', 
    backgroundColor: '#000000',
    textAlign: 'center',
    fontWeight: "bold",
    borderRadius: 3,
    color: '#ffff'
  }
});
 