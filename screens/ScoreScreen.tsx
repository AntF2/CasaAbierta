import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Button } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { db } from '../config/config';

const ScoreScreen = ({ navigation }: { navigation: any }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ id: string, nick: string, score: number, timestamp: number }[]>([]);

  useEffect(() => {
    const fetchData = () => {
      const dbRef = ref(db, 'puntuaciones');
      onValue(dbRef, (snapshot) => {
        const dataFromDB = snapshot.val();
        if (dataFromDB) {
          const dataArray = Object.keys(dataFromDB).map(key => ({ id: key, ...dataFromDB[key] }));
          setData(dataArray);
          setLoading(false);
        } else {
          setData([]);
          setLoading(false);
        }
      });
    };

    fetchData();

    return () => {
      // Cleanup function
    };
  }, []);

  const handleNavigateLevels = () => {
    navigation.navigate('Niveles');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground source={require('../assets/fondo5.jpg')} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          {data.map(item => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.nick}>Nick: {item.nick}</Text>
              <Text style={styles.score}>Score: {item.score}</Text>
              <Text style={styles.timestamp}>Timestamp: {new Date(item.timestamp).toLocaleString()}</Text>
            </View>
          ))}
          <TouchableOpacity onPress={handleNavigateLevels} style={styles.button}>
          <Text style={styles.buttonText}>Volver a Jugar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.buttonText}>Ir a Inicio</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nick: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  score: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ScoreScreen;
