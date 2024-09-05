import 'react-native-gesture-handler';
import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScoreScreen from '../screens/ScoreScreen';  
import GameOverScreen from '../screens/GameOverScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import NivelesScreen from '../screens/NivelesScreen';

import WelcomeScreen from '../screens/WelcomeScreen';
import JuegoScreen from '../screens/juegoScreen';
import JuegosScreen from '../screens/JuegosScreen';
import PuntuacionScreen from '../screens/PuntuacionScreen';

const Stack = createStackNavigator();
function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Registro" component={RegistroScreen}/>
            <Stack.Screen name="Drawer" component={MyDrawer} options={{headerShown: false}}/>  
        </Stack.Navigator>
    )
}

const Drawer = createDrawerNavigator();
function MyDrawer(){
    return(
            <Drawer.Navigator initialRouteName='Welcome'>
            <Drawer.Screen name="Welcome" component={WelcomeScreen}/>
            <Drawer.Screen name="Niveles" component={NivelesScreen} options={{ drawerLabel: () => null }}/>
            <Drawer.Screen name="Score" component={ScoreScreen}/>
            <Drawer.Screen name='Puntuaciones' component={PuntuacionScreen}/>
            <Drawer.Screen name="Juegos" component={JuegoScreen} options={{ drawerLabel: () => null }} />
            <Drawer.Screen name="Juego" component={JuegosScreen} options={{ drawerLabel: () => null }} />
            <Drawer.Screen name="GameOver" component={GameOverScreen}options={{ drawerLabel: () => null }}/>
        </Drawer.Navigator>
    )
}

export default function MainNavigator(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}