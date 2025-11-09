import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Pokemon } from '../types/pokemon.types';
import PokeApiService from '../services/pokeApi.service';
import LoadingScreen from '../components/LoadingScreen';
import ErrorScreen from '../components/ErrorScreen';
import EmptyState from '../components/EmptyState';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// Colores por tipo
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

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const LIMIT = 20;

  // Cargar Pokemon iniciales
  useEffect(() => {
    loadPokemon();
  }, []);

  // Filtrar Pokemon cuando cambia la búsqueda
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPokemon(pokemonList);
    } else {
      const filtered = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPokemon(filtered);
    }
  }, [searchQuery, pokemonList]);

  const loadPokemon = async () => {
    try {
      setLoading(true);
      const data = await PokeApiService.getPokemonList(LIMIT, 0);
      // Asegurar que no hay duplicados por id
      const unique = dedupeById(data);
      setPokemonList(unique);
      setFilteredPokemon(unique);
      setOffset(LIMIT);
    } catch (error) {
      console.error('Error loading Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePokemon = async () => {
    if (loadingMore || searchQuery.trim() !== '') return;

    try {
      setLoadingMore(true);
      const data = await PokeApiService.getPokemonList(LIMIT, offset);
      setPokemonList((prev) => dedupeById([...prev, ...data]));
      setOffset((prev) => prev + LIMIT);
    } catch (error) {
      console.error('Error loading more Pokemon:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Utility: deduplicar array de Pokemon por id
  const dedupeById = (items: Pokemon[]) => {
    const map = new Map<number, Pokemon>();
    for (const it of items) {
      map.set(it.id, it);
    }
    return Array.from(map.values());
  };

  const renderPokemonCard = ({ item }: { item: Pokemon }) => {
    const backgroundColor = TYPE_COLORS[item.types[0]] || '#A8A878';

    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor }]}
        onPress={() => navigation.navigate('PokemonDetail', { pokemonId: item.id })}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardInfo}>
            <Text style={styles.pokemonId}>#{String(item.id).padStart(3, '0')}</Text>
            <Text style={styles.pokemonName}>{item.name}</Text>
            <View style={styles.typesContainer}>
              {item.types.map((type) => (
                <View key={type} style={styles.typeTag}>
                  <Text style={styles.typeText}>{type}</Text>
                </View>
              ))}
            </View>
          </View>
          <Image source={{ uri: item.image }} style={styles.pokemonImage} />
        </View>
        <View style={styles.cardBackground}>
          <View style={styles.pokeball} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#DC0A2D" />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#DC0A2D" />
        <Text style={styles.loadingText}>Cargando Pokémon...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#DC0A2D" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar Pokémon..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredPokemon}
        renderItem={renderPokemonCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        onEndReached={loadMorePokemon}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
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
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    maxWidth: '47%',
    overflow: 'hidden',
    position: 'relative',
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
  footerLoader: {
    padding: 20,
    alignItems: 'center',
  },
});

export default HomeScreen;