import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { API } from '../../services/api'; 


export default function App() {
    const [infoCep, setInfoCep] = useState({});
    const [searchCep, setSearchCep] = useState('');

    const getCep = async () => {
        const {data} = await API.get(`${searchCep}/json`)
        setInfoCep(data);
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Digite seu Cep'
                keyboardType='numeric'
                value={searchCep}
                onChangeText={text => setSearchCep(text)}
                onSubmitEditing={getCep}
            />
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
