import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/config';

interface Props {
  navigation: any;
}

export default function LoginScreen({ navigation }: Props) {
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Drawer');
        setCorreo('');
        setContrasenia('');
      })
      .catch((error) => {
        const errorCode = error.code;

        switch (errorCode) {
          case 'auth/invalid-credential':
            Alert.alert('Error', 'Credenciales incorrectas');
            break;

          case 'auth/missing-password':
            Alert.alert('Error', 'Ingrese su contraseña');
            break;

          default:
            Alert.alert('Error', 'Ingrese sus credenciales');
            break;
        }
      });
  }

  return (
    <ImageBackground source={require('../assets/fondo2.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <Image source={require('../assets/Luti.png')} style={styles.image}/>

        <TextInput
          style={styles.input}
          placeholder="Ingresar email"
          keyboardType="email-address"
          onChangeText={(texto: string) => setCorreo(texto)}
          value={correo}
        />

        <TextInput
          style={styles.input}
          placeholder="Ingresar contraseña"
          onChangeText={(texto: string) => setContrasenia(texto)}
          value={contrasenia}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.registerText}>👉 Regístrate aquí 👈</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '85%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    width: '85%',
    height: 45,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 20,
    color: '#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
