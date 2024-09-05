import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { db } from '../config/config';
import { ref, push, serverTimestamp } from 'firebase/database';

const GameOverScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const score = route.params?.score || 0;
  const [nick, setNick] = useState('');

  const handlePlayAgain = () => {
    if (nick.trim() === '') {
      alert('Por favor, ingresa tu nick antes de guardar la puntuación.');
      return;
    }

    const scoresRef = ref(db, 'puntuaciones');
    push(scoresRef, {
      score: score,
      timestamp: serverTimestamp(),
      nick: nick
    });

    navigation.navigate("Score");
 // Reemplaza con el nombre real de tu pantalla de selección de dificultad
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameOverText}>Juego terminado</Text>
      <Text style={styles.scoreText}>Puntuación final: {score}</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nick"
        value={nick}
        onChangeText={(text) => setNick(text)}
        placeholderTextColor="#888"
      />
      <View style={styles.buttonContainer}>
        <Button title="Guardar Score" onPress={handlePlayAgain} color="#D4AC0D" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  gameOverText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  scoreText: {
    fontSize: 22,
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#555',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#000',
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default GameOverScreen;
