import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';

import Home from '../buscacep/src/components/home/';
import Favoritos from '../buscacep/src/components/favoritos/';
import Historico from '../buscacep/src/components/historico/';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
    return(
        <Tab.Navigator>
            <Tab.Screen 
                options={{
                            headerTransparent: true, 
                            headerShown: false,
                            tabBarIcon: ({ size, color}) => (
                                <FontAwesome name='search' size={size} color={color} />
                            )
                        }}
                name='Busca' 
                component={Home} 
            />
            <Tab.Screen 
                options={{
                            headerTransparent: true, 
                            headerShown: false,
                            tabBarIcon: ({ size, color}) => (
                                <FontAwesome name='star' size={size} color={color} />
                            )
                        }}
                name='Favoritos' 
                component={Favoritos} 
            />
            <Tab.Screen 
                options={{
                            headerTransparent: true, 
                            headerShown: false,
                            tabBarIcon: ({ size, color}) => (
                                <FontAwesome name='folder' size={size} color={color} />
                            )
                        }}
                name='Historico'
                component={Historico} 
            />
        </Tab.Navigator>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen  
                    options={{title:'', headerTransparent: true, headerShown: false}}
                    name='Home' 
                    component={Tabs} 
                />
                <Stack.Screen 
                    options={{title:'', headerTransparent: true, headerShown: false}}
                    name='Favoritos' 
                    component={Favoritos} 
                />
                <Stack.Screen 
                    options={{title:'', headerTransparent: true, headerShown: false}}
                    name='Historico' 
                    component={Historico}
                 />
            </Stack.Navigator>
        </NavigationContainer>
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
