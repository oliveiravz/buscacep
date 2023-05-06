import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Detalhes({route}) {
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
