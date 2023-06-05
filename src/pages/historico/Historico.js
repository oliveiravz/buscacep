import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';

import firebase from '../../firebaseConnection';

export default function Historico() {
  const [history, setHistory] = useState([])
  const database = firebase.firestore()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    database.collection("dados").orderBy("data_hora", "desc").onSnapshot((query) => {
      const list = []
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id })
      })
      setHistory(list);
      setLoading(false);
    })
  }, []);

  const limpaHistorio = async () => {
    try {
      const data = await database.collection('dados').get();
  
      const batch = database.batch();
      data.forEach((doc) => {
        batch.delete(doc.ref);
      });
  
      await batch.commit();
      ToastAndroid.show('Histórico excluido com sucesso', ToastAndroid.LONG);
    } catch (error) {
      console.error('Erro ao limpar histórico:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleCabecalho}>Histórico</Text>
      </View>
      <TouchableOpacity style={styles.limpar} onPress={limpaHistorio}>
        <Text style={styles.limparText}>LIMPAR TODO O HISTÓRICO</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator style={styles.ActivityIndicator} size="large" color="#0000ff" />
      ) : (
        <React.Fragment>
          {history.length === 0 ? (
            <Text style={styles.emptyText}>Histórico Vazio.</Text>
          ) : (
            <FlatList
              data={history}
              renderItem={({ item }) => {
                return (
                  <View style={styles.spaceCard}>
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
                  </View>
                )
              }}
            /> 
          )}
        </React.Fragment>
 
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
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
    backgroundColor: '#000000',
    textAlign: 'center',
    padding: 5,
    marginBottom: 10
  },
  limparText: {
    color: '#ffff',
    fontWeight: 600,
    margin: 5,
    textAlign: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25
  },
  spaceCard: {
    marginBottom: 15
  },
    ActivityIndicator: {
    flex: 1
  },
  emptyText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  }
});
