import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function Detalhes({route}) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
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
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF8C00',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "900",
    margin: 25
  }
});
