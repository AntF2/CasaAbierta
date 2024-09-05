import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const JuegoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const difficulty = route.params?.difficulty || 'easy';

  const [score, setScore] = useState(0);
  const [time, setTime] = useState(300);
  const [flies, setFlies] = useState([] as Fly[]);

  useEffect(() => {
    const generateFlies = () => {
      const newFlies: Fly[] = [];

      for (let i = 0; i < difficultyLevel[difficulty].flyCount; i++) {
        newFlies.push({
          id: i,
          x: Math.random() * (windowWidth - 50),
          y: Math.random() * (windowHeight - 50),
          speedX: (Math.random() - 0.5) * 15,
          speedY: (Math.random() - 0.5) * 15,
        });
      }

      setFlies(newFlies);
    };

    generateFlies();
  }, [difficulty]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          updateFlyPositions();
          return prevTime - 1;
        } else {
          clearInterval(timer);
          navigation.navigate('GameOver', { score });
          return 0;
        }
      });
    }, 1000 / 20);

    return () => clearInterval(timer);
  }, [navigation, score]);

  const handleFlyClick = (flyId: number) => {
    setScore((prevScore) => prevScore + 1);
    setFlies((prevFlies) => prevFlies.filter((fly) => fly.id !== flyId));
  };

  const updateFlyPositions = () => {
    setFlies((prevFlies) =>
      prevFlies.map((fly) => ({
        ...fly,
        x: fly.x + fly.speedX,
        y: fly.y + fly.speedY,
        speedX: (fly.x + fly.speedX > windowWidth - 50 || fly.x + fly.speedX < 0) ? -fly.speedX : fly.speedX,
        speedY: (fly.y + fly.speedY > windowHeight - 50 || fly.y + fly.speedY < 0) ? -fly.speedY : fly.speedY,
      }))
    );
  };

  const restartGame = () => {
    setScore(0);
    setTime(300);
  };

  useEffect(() => {
    restartGame();
  }, [difficulty]);

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: 'https://i.pinimg.com/originals/cf/79/79/cf7979b62b0ef1bf0c0a658c75b2b785.jpg' }} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Text style={styles.timeText}>Tiempo restante: {time} segundos</Text>
          <Text style={styles.scoreText}>Puntuación: {score}</Text>
          {flies.map((fly) => (
            <TouchableOpacity
              key={fly.id}
              style={[styles.fly, { left: fly.x, top: fly.y }]}
              onPress={() => handleFlyClick(fly.id)}
            >
              <Image
                source={{ uri: 'https://static.vecteezy.com/system/resources/previews/009/827/037/non_2x/cartoon-grasshopper-insect-illustration-isolated-on-white-background-vector.jpg' }}
                style={styles.flyImage}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ImageBackground>
    </View>
  );
};

const windowWidth = 300;
const windowHeight = 500;

const difficultyLevel = {
  easy: { flyCount: 20 },
  medium: { flyCount: 35 },
  hard: { flyCount: 50 },
};

interface Fly {
  id: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  timeText: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  fly: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: 25,
  },
  flyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default JuegoScreen;
