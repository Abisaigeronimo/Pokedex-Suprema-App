import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Pokemon } from '../types/pokemon.types';

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress: () => void;
}

const TYPE_COLORS: { [key: string]: string } = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onPress }) => {
  const backgroundColor = TYPE_COLORS[pokemon.types[0]] || '#A8A878';

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={styles.cardInfo}>
          <Text style={styles.pokemonId}>
            #{String(pokemon.id).padStart(3, '0')}
          </Text>
          <Text style={styles.pokemonName}>{pokemon.name}</Text>
          <View style={styles.typesContainer}>
            {pokemon.types.map((type) => (
              <View key={type} style={styles.typeTag}>
                <Text style={styles.typeText}>{type}</Text>
              </View>
            ))}
          </View>
        </View>
        <Image source={{ uri: pokemon.image }} style={styles.pokemonImage} />
      </View>
      <View style={styles.cardBackground}>
        <View style={styles.pokeball} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    maxWidth: '47%',
    overflow: 'hidden',
    position: 'relative',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  cardInfo: {
    flex: 1,
  },
  pokemonId: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  typesContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  typeTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  typeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  pokemonImage: {
    width: 80,
    height: 80,
    position: 'absolute',
    right: -8,
    bottom: -8,
  },
  cardBackground: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 100,
    height: 100,
    overflow: 'hidden',
  },
  pokeball: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
    right: -30,
    bottom: -30,
  },
});

export default PokemonCard;
