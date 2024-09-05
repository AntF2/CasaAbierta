import { Alert, StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { auth, db } from '../config/config';
import { ref as databaseRef, onValue } from "firebase/database";


export default function WelcomeScreen({ navigation }: any) {
  const [avatarURL, setAvatarURL] = useState<string | null>(null);
  const [nick, setNick] = useState<string | null>(null);

  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) {
      const userRef = databaseRef(db, `usuarios/${user.email!.replace(/\./g, '_')}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          if (data.avatarURL) {
            setAvatarURL(data.avatarURL);
          }
          if (data.nick) {
            setNick(data.nick);
          }
        }
      });
    }
  }, []);

  function salir() {
    signOut(auth)
      .then(() => {
        Alert.alert("Sesión cerrada correctamente", "Vuelve Pronto");
        navigation.navigate("Login");
      })
      .catch(() => {
        Alert.alert("Error", "No se pudo cerrar sesión");
      });
  }

  return (
    <ImageBackground source={require('../assets/fondo3.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>¡Bienvenido!</Text>
          {nick && <Text style={styles.nick}>{nick}</Text>}
        </View>
        {avatarURL && <Image source={{ uri: avatarURL }} style={styles.avatar} />}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Niveles')}>
          <Text style={styles.buttonText}>Ir a Juego 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Juego')}>
          <Text style={styles.buttonText}>Ir a Juego 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Score')}>
          <Text style={styles.buttonText}>Ver Puntuaciones 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Puntuaciones')}>
          <Text style={styles.buttonText}>Ver Puntuaciones 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={() => salir()}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  nick: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },button1: {
    backgroundColor: '#CB4335',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
