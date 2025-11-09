import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { PokemonDetail } from '../types/pokemon.types';
import PokeApiService from '../services/pokeApi.service';

type PokemonDetailScreenRouteProp = RouteProp<RootStackParamList, 'PokemonDetail'>;

type Props = {
  route: PokemonDetailScreenRouteProp;
};

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

const STAT_LABELS: { [key: string]: string } = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defensa',
  specialAttack: 'At. Esp.',
  specialDefense: 'Def. Esp.',
  speed: 'Velocidad',
};

const PokemonDetailScreen = ({ route }: Props) => {
  const { pokemonId } = route.params;
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPokemonDetail();
  }, [pokemonId]);

  const loadPokemonDetail = async () => {
    try {
      setLoading(true);
      const data = await PokeApiService.getPokemonDetail(pokemonId);
      setPokemon(data);
    } catch (error) {
      console.error('Error loading Pokemon detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatBar = ({ label, value }: { label: string; value: number }) => {
    const percentage = (value / 255) * 100;
    const backgroundColor = pokemon ? TYPE_COLORS[pokemon.types[0]] : '#A8A878';

    return (
      <View style={styles.statRow}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
        <View style={styles.statBarContainer}>
          <View
            style={[
              styles.statBarFill,
              { width: `${percentage}%`, backgroundColor },
            ]}
          />
        </View>
      </View>
    );
  };

  if (loading || !pokemon) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#DC0A2D" />
        <Text style={styles.loadingText}>Cargando detalles...</Text>
      </View>
    );
  }

  const backgroundColor = TYPE_COLORS[pokemon.types[0]] || '#A8A878';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}> 
      <ScrollView>
        {/* Header con imagen */}
        <View style={[styles.header, { backgroundColor }]}>
          <View style={styles.headerInfo}>
            <Text style={styles.pokemonName}>{pokemon.name}</Text>
            <Text style={styles.pokemonId}>
              #{String(pokemon.id).padStart(3, '0')}
            </Text>
          </View>
          <View style={styles.typesContainer}>
            {pokemon.types.map((type: string) => (
              <View key={type} style={styles.typeTag}>
                <Text style={styles.typeText}>{type}</Text>
              </View>
            ))}
          </View>
          <Image source={{ uri: pokemon.image }} style={styles.pokemonImage} />
          <View style={styles.pokeballBackground}>
            <View style={styles.pokeball} />
          </View>
        </View>

  {/* Contenido */}
  <View style={[styles.content, styles.contentCard]}>
          {/* Descripción */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Acerca de</Text>
            <Text style={styles.description}>{pokemon.species}</Text>
          </View>

          {/* Altura y Peso */}
          <View style={styles.physicalStats}>
            <View style={styles.physicalStat}>
              <Text style={styles.physicalStatValue}>
                {(pokemon.height / 10).toFixed(1)} m
              </Text>
              <Text style={styles.physicalStatLabel}>Altura</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.physicalStat}>
              <Text style={styles.physicalStatValue}>
                {(pokemon.weight / 10).toFixed(1)} kg
              </Text>
              <Text style={styles.physicalStatLabel}>Peso</Text>
            </View>
          </View>

          {/* Habilidades */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <View style={styles.abilitiesContainer}>
              {pokemon.abilities.map((ability, index) => (
                <View key={index} style={styles.abilityTag}>
                  <Text style={styles.abilityText}>
                    {ability.replace('-', ' ')}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Estadísticas Base */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Estadísticas Base</Text>
            <View style={styles.statsContainer}>
              <StatBar
                label={STAT_LABELS.hp}
                value={pokemon.stats.hp}
              />
              <StatBar
                label={STAT_LABELS.attack}
                value={pokemon.stats.attack}
              />
              <StatBar
                label={STAT_LABELS.defense}
                value={pokemon.stats.defense}
              />
              <StatBar
                label={STAT_LABELS.specialAttack}
                value={pokemon.stats.specialAttack}
              />
              <StatBar
                label={STAT_LABELS.specialDefense}
                value={pokemon.stats.specialDefense}
              />
              <StatBar
                label={STAT_LABELS.speed}
                value={pokemon.stats.speed}
              />
            </View>
          </View>

          {/* Total de Stats */}
          <View style={styles.totalStats}>
            <Text style={styles.totalStatsLabel}>Total</Text>
            <Text style={styles.totalStatsValue}>
              {Object.values(pokemon.stats).reduce((a, b) => a + b, 0)}
            </Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 24,
    paddingBottom: 40,
    position: 'relative',
    overflow: 'hidden',
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    zIndex: 2,
  },
  pokemonName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textTransform: 'capitalize',
  },
  pokemonId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  typesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
    zIndex: 2,
  },
  typeTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  pokemonImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    zIndex: 2,
  },
  pokeballBackground: {
    position: 'absolute',
    right: -50,
    top: -50,
    width: 250,
    height: 250,
    overflow: 'hidden',
  },
  pokeball: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    padding: 24,
  },
  contentCard: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  physicalStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 24,
    backgroundColor: '#F7F7F7',
    padding: 16,
    borderRadius: 12,
  },
  physicalStat: {
    alignItems: 'center',
  },
  physicalStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  physicalStatLabel: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#DDD',
  },
  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  abilityTag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  abilityText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  statsContainer: {
    gap: 12,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    width: 80,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    width: 30,
  },
  statBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  totalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  totalStatsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalStatsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#DC0A2D',
  }, 

});

export default PokemonDetailScreen;