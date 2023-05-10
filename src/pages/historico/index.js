import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function Historico() {
  return (
    <SafeAreaView style={styles.container}>
            <View>
                 <Text style={styles.title}>HISTÓRICO</Text>
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
