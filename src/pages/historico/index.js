import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

import firebase from '../../firebaseConnection';
import { Spacer } from 'native-base';


export default function Historico() {
  const [history, setHistory] = useState([])
  const database = firebase.firestore()

  useEffect(() => {
    database.collection("dados").orderBy("data_hora", "desc").onSnapshot((query) => {
      const list = []
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id })
      })
      setHistory(list)
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.titleCabecalho}>Histórico</Text>
        <TouchableOpacity style={styles.limpar}>
          <Text style={styles.limparText}>LIMPAR</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={history}
        renderItem={({ item }) => {
          return (
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
    padding: 15,
  },
  title: {
    padding: 15,
    fontSize: 15
  },
  titleCabecalho: {
    padding: 5,
    fontSize: 25,
    fontWeight: 900
  },
  button: {
    padding: 5,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#000000',
    textAlign: 'center',
    fontWeight: "bold",
    borderRadius: 3,
    color: '#ffff'
  },
  limpar: {
    borderRadius: 5,
    backgroundColor: '#FF0000',
    textAlign: 'center',
    padding: 2,
    marginBottom: 10
  },
  limparText: {
    color: '#ffff',
    fontWeight: 600,
    margin: 5
  }
});
