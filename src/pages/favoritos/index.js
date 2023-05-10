import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';

export default function Favoritos() {
  const [name, setName] = useState("")
 
  return (
    <SafeAreaView style={styles.container}>
            <View>
                 <Text style={styles.title}>FAVORITOS</Text>
            </View>
            <View style={styles.input}>
                  <TextInput
                  value={name}
                  onChangeText={(texto) => SVGAnimateTransformElement(texto)}
                  placeholder="Nome"
                />

            </View>
            <View style={styles.box}>
                    
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
  title: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: "bold",
    marginEnd: 170,
    height: 600,
},
  input:{
    marginTop: 10,
    top: -495,
    right: 113,
    borderWidth: 1,
    backgroundColor: '#FF8C00',
    paddingHorizontal: 60,
    paddingVertical: 5,
    borderRadius: 8,
    fontSize: 25,
    textAlign: 'left',
},
  box:{
    marginTop: 10,
    top: -500,
    borderWidth: 1,
    backgroundColor: '#FFFF',
    textAlign: 'center',
    paddingHorizontal: 200,
    paddingVertical: 45,
    fontWeight: "bold",
    borderRadius: 8,
}, 
  
});
