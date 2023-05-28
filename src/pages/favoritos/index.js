import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Alert, ActivityIndicator, ToastAndroid } from 'react-native';
import { Card } from 'react-native-paper';

import firebase from '../../firebaseConnection';

export default function Favoritos() {
  const [favorite, setFavorite] = useState([]);
  const [loading, setLoading] = useState(true);
  const database = firebase.firestore()

  useEffect(() => {
    database.collection("favoritos").orderBy("data_hora", "desc").onSnapshot((query) => {
      const list = []
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id })
      })
      setFavorite(list);
      setLoading(false);
    })
  }, [])

  const showConfirmationDialog = (onConfirm) => {
    Alert.alert(
      'Atenção',
      'Deseja excluir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'OK', onPress: () => onConfirm(true)},
      ],
      { cancelable: true }
    );
  };

  const removeFavorite = async (cep) => {
    showConfirmationDialog(async (confirm) => {
      if (confirm) {

        const cepId = await database.collection('favoritos').where('cep', '==', cep).get();
       
        if(!cepId.empty) {
          cepId.forEach((doc) => {
            doc.ref.delete()
              .then(() => {
                ToastAndroid.show('Excluído', ToastAndroid.SHORT);
              })
              .catch((error) => {
                console.error('Erro ao excluir o documento:', error);
              });
          });
        }
      }else{
        ToastAndroid.show('Falha ao excluir', ToastAndroid.SHORT);
      }
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleCabecalho}>
        Favoritos
      </Text>
      {loading ? (
        <ActivityIndicator style={styles.ActivityIndicator} size="large" color="#000000" />
      ) : ( 
        <React.Fragment>
          {favorite.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum favorito encontrado.</Text>
          ) : (
            <FlatList
              data={favorite}
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
                    <View style={styles.removeButton} >
                      <TouchableOpacity onPress={() => removeFavorite(item.cep)}>
                        <Text style={styles.removerButtonText}>REMOVER</Text>
                      </TouchableOpacity>
                    </View>
                  </SafeAreaView>
                )
              }}
            />
            )}
          </React.Fragment>
      )}
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
    fontWeight: 900,
    marginTop: 25
  },
  removeButton: {
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#FF0000',
    padding: 5
  },
  removerButtonText: {
    color: '#ffff',
    textAlign: 'center',
    fontWeight: 900
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
