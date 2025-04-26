import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { rootStackParamList } from './src/types/rootStackParamList';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/app/home/page';
import { Login } from './src/app/login/page';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const Stack = createNativeStackNavigator<rootStackParamList>();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const check = async () => {
      try{
        const usuario = await AsyncStorage.getItem('usuario');
        if(usuario){
          setAuthenticated(true);
        }
      }catch(error) {
        console.log(error);
      }
    } 

    check();
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={authenticated ? "Home" : "Login"} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

