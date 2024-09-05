import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NivelesScreen = ({ navigation }: any) => {
  const startGame = (difficulty: string) => {
    navigation.navigate('Juegos', { difficulty });
  };

  const navigateToWelcome = () => {
    navigation.navigate('Welcome');
  };

  return (
    <ImageBackground source={require('../assets/fondo4.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Seleccione la dificultad:</Text>
        <Image source={require('../assets/icono.webp')} style={{ width: 200, height: 200, marginBottom: 20 }} />
        <View>
          <Button title="Fácil" onPress={() => startGame('easy')} color={"#rgb(38,217,59)"} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button title="Moderado" onPress={() => startGame('medium')} color={"#rgb(255,89,9)"} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button title="Difícil" onPress={() => startGame('hard')} color={"#CB4335"} />
        </View>
        <TouchableOpacity onPress={navigateToWelcome} style={styles.button}>
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Fondo semi-transparente para mejorar legibilidad
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff', // Color del texto
  },
  button: {
    backgroundColor: '#rgb(0, 42, 255)',
    marginTop: 10,
    width: 200, // Ancho del botón
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 12,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default NivelesScreen;
