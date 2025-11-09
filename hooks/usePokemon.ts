import { useState, useEffect, useCallback } from 'react';
import { Pokemon } from '../types/pokemon.types';
import PokeApiService from '../services/pokeApi.service';

interface UsePokemonReturn {
  pokemonList: Pokemon[];
  filteredPokemon: Pokemon[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loadMore: () => void;
  refresh: () => void;
}

const LIMIT = 20;

export const usePokemon = (): UsePokemonReturn => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);

  // Cargar Pokemon iniciales
  useEffect(() => {
    loadInitialPokemon();
  }, []);

  // Filtrar Pokemon cuando cambia la búsqueda
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPokemon(pokemonList);
    } else {
      const filtered = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pokemon.id.toString().includes(searchQuery)
      );
      setFilteredPokemon(filtered);
    }
  }, [searchQuery, pokemonList]);

  const loadInitialPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PokeApiService.getPokemonList(LIMIT, 0);
      setPokemonList(data);
      setFilteredPokemon(data);
      setOffset(LIMIT);
    } catch (err) {
      setError('Error al cargar los Pokémon');
      console.error('Error loading Pokemon:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (loadingMore || searchQuery.trim() !== '') return;

    try {
      setLoadingMore(true);
      const data = await PokeApiService.getPokemonList(LIMIT, offset);
      setPokemonList((prev) => [...prev, ...data]);
      setOffset((prev) => prev + LIMIT);
    } catch (err) {
      console.error('Error loading more Pokemon:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, searchQuery, offset]);

  const refresh = useCallback(() => {
    setOffset(0);
    setPokemonList([]);
    loadInitialPokemon();
  }, []);

  return {
    pokemonList,
    filteredPokemon,
    loading,
    loadingMore,
    error,
    searchQuery,
    setSearchQuery,
    loadMore,
    refresh,
  };
};