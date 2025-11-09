import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Cargando Pokémon...',
}) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        {/* Pokeball animada */}
        <View style={styles.pokeballContainer}>
          <View style={styles.pokeballTop} />
          <View style={styles.pokeballCenter}>
            <View style={styles.pokeballButton} />
          </View>
          <View style={styles.pokeballBottom} />
        </View>

        <ActivityIndicator size="large" color="#DC0A2D" style={styles.spinner} />
        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  content: {
    alignItems: 'center',
  },
  pokeballContainer: {
    width: 80,
    height: 80,
    marginBottom: 24,
  },
  pokeballTop: {
    width: 80,
    height: 40,
    backgroundColor: '#DC0A2D',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  pokeballCenter: {
    width: 80,
    height: 6,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokeballButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderColor: '#333',
  },
  pokeballBottom: {
    width: 80,
    height: 40,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderWidth: 2,
    borderColor: '#333',
    borderTopWidth: 0,
  },
  spinner: {
    marginVertical: 16,
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    fontWeight: '500',
  },
});

export default LoadingScreen;