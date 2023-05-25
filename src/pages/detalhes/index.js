import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity,  SafeAreaView} from 'react-native';
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
        <Text>Detalhes!</Text>
        <TouchableOpacity onPress={getFavoritos}>
          <Text style={styles.busca}>Favoritar</Text>
        </TouchableOpacity>
        </Text>
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
