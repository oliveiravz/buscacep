import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import Home      from '../buscacep/src/pages/home/';
import Favoritos from '../buscacep/src/pages/favoritos/';
import Historico from '../buscacep/src/pages/historico/';
import Detalhes  from '../buscacep/src/pages/detalhes/';

const Stack = createNativeStackNavigator();
const Tab   = createBottomTabNavigator();

function Tabs() {
    return(
        <Tab.Navigator screenOptions={{
            tabBarStyle: { 
                backgroundColor: '#1e212d',
            },
            tabBarActiveTintColor: '#fff',
            style: { borderTopWidth: 0 }
          }}
          >
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
                 <Stack.Screen 
                    options={{title:'', headerTransparent: true, headerShown: true}}
                    name='Detalhes' 
                    component={Detalhes}
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
