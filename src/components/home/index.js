import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';

import axios from 'axios';
import MaskInput from 'react-native-mask-input';

export default function App() {
    const [infoCep, setInfoCep]     = useState({});
    const [searchCep, setSearchCep] = useState('');
    
    const getCep = async () => {
        const {data} = await axios.get(`https://viacep.com.br/ws/${searchCep}/json`)
        console.log(data);
        setInfoCep(data);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <MaskInput
                    // mask={['00.000-00']}
                    mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/,'-',/\d/, /\d/, /\d/]}
                    placeholder='Digite seu Cep'
                    keyboardType='numeric'
                    value={searchCep}
                    onChangeText={(masked, unmasked) => setSearchCep(unmasked)}
                    onSubmitEditing={getCep}
                />
                <TouchableOpacity onPress={getCep}>
                    <Text>Buscar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
