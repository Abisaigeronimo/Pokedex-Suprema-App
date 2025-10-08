import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type PokemonDetailScreenRouteProp = RouteProp<RootStackParamList, 'PokemonDetail'>;

type Props = {
  route: PokemonDetailScreenRouteProp;
};

const PokemonDetailScreen = ({ route }: Props) => {
  const { pokemonId } = route.params;

  // Datos de ejemplo
  const pokemon = {
    id: pokemonId,
    name: 'Pikachu',
    types: ['electric'],
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    height: 4,
    weight: 60,
    description: 'Cuando varios Pikachu se juntan, su electricidad puede causar tormentas eléctricas.',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.header, { backgroundColor: '#F8D030' }]}>
          <Text style={styles.pokemonName}>{pokemon.name}</Text>
          <Text style={styles.pokemonId}>#{String(pokemon.id).padStart(3, '0')}</Text>
          <Image source={{ uri: pokemon.image }} style={styles.pokemonImage} />
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Acerca de</Text>
          <Text style={styles.description}>{pokemon.description}</Text>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{pokemon.height / 10} m</Text>
              <Text style={styles.statLabel}>Altura</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{pokemon.weight / 10} kg</Text>
              <Text style={styles.statLabel}>Peso</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  pokemonName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textTransform: 'capitalize',
  },
  pokemonId: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 16,
  },
  pokemonImage: {
    width: 200,
    height: 200,
  },
  content: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F7F7F7',
    padding: 16,
    borderRadius: 12,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
});

export default PokemonDetailScreen;