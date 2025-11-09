import {
  PokemonListResponse,
  PokemonApiResponse,
  Pokemon,
  PokemonDetail,
  PokemonStats,
  PokemonSpeciesResponse,
} from '../types/pokemon.types';

const BASE_URL = 'https://pokeapi.co/api/v2';

class PokeApiService {
  // Obtener lista de Pokemon con paginación
  async getPokemonList(limit: number = 20, offset: number = 0): Promise<Pokemon[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
      );
      const data: PokemonListResponse = await response.json();

      // Obtener detalles de cada Pokemon en paralelo
      const pokemonPromises = data.results.map((pokemon) =>
        this.getPokemonByUrl(pokemon.url)
      );

      const pokemonDetails = await Promise.all(pokemonPromises);
      return pokemonDetails;
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw error;
    }
  }

  // Obtener Pokemon por URL
  async getPokemonByUrl(url: string): Promise<Pokemon> {
    try {
      const response = await fetch(url);
      const data: PokemonApiResponse = await response.json();

      return this.transformToPokemon(data);
    } catch (error) {
      console.error('Error fetching Pokemon by URL:', error);
      throw error;
    }
  }

  // Obtener Pokemon por ID o nombre
  async getPokemon(idOrName: string | number): Promise<Pokemon> {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
      const data: PokemonApiResponse = await response.json();

      return this.transformToPokemon(data);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      throw error;
    }
  }

  // Obtener detalles completos del Pokemon
  async getPokemonDetail(idOrName: string | number): Promise<PokemonDetail> {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
      const data: PokemonApiResponse = await response.json();

      // Obtener descripción de la especie
      const speciesResponse = await fetch(data.species.url);
      const speciesData: PokemonSpeciesResponse = await speciesResponse.json();

      // Localizar nombre en español si existe
      const spanishName =
        (speciesData.names && speciesData.names.find((n: { language: { name: string }; name: string }) => n.language.name === 'es')?.name) ||
        data.name;

      // Obtener tipos localizados (buscar 'es' en cada endpoint de tipo)
      const typePromises = data.types.map(async (t) => {
        try {
          const tr = await fetch(t.type.url);
          const typeData = await tr.json();
          return (
            typeData.names.find((n: any) => n.language.name === 'es')?.name || t.type.name
          );
        } catch (e) {
          return t.type.name;
        }
      });

      const typesLocalized = await Promise.all(typePromises);

      // Obtener habilidades localizadas
      const abilityPromises = data.abilities.map(async (a) => {
        try {
          const ar = await fetch(a.ability.url);
          const abilityData = await ar.json();
          return (
            abilityData.names.find((n: any) => n.language.name === 'es')?.name ||
            a.ability.name
          );
        } catch (e) {
          return a.ability.name;
        }
      });

      const abilitiesLocalized = await Promise.all(abilityPromises);

      return this.transformToPokemonDetail(
        data,
        speciesData,
        spanishName,
        typesLocalized,
        abilitiesLocalized
      );
    } catch (error) {
      console.error('Error fetching Pokemon detail:', error);
      throw error;
    }
  }

  // Buscar Pokemon por nombre
  async searchPokemon(query: string): Promise<Pokemon[]> {
    try {
      // La PokeAPI no tiene endpoint de búsqueda, así que obtenemos todos
      // En producción, considerarías usar una base de datos local o caché
      const response = await fetch(`${BASE_URL}/pokemon?limit=1000`);
      const data: PokemonListResponse = await response.json();

      // Filtrar por nombre
      const filtered = data.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );

      // Obtener detalles solo de los primeros 20 resultados
      const pokemonPromises = filtered.slice(0, 20).map((pokemon) =>
        this.getPokemonByUrl(pokemon.url)
      );

      return await Promise.all(pokemonPromises);
    } catch (error) {
      console.error('Error searching Pokemon:', error);
      throw error;
    }
  }

  // Transformar respuesta de API a Pokemon
  private transformToPokemon(data: PokemonApiResponse): Pokemon {
    return {
      id: data.id,
      name: data.name,
      types: data.types.map((type) => type.type.name),
      image: data.sprites.other['official-artwork'].front_default,
    };
  }

  // Transformar respuesta de API a PokemonDetail
  private transformToPokemonDetail(
    data: PokemonApiResponse,
    speciesData: PokemonSpeciesResponse,
    spanishName?: string,
    typesLocalized?: string[],
    abilitiesLocalized?: string[]
  ): PokemonDetail {
    // Obtener descripción en español o inglés
    const flavorText = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === 'es' || entry.language.name === 'en'
    );

    const description = flavorText
      ? flavorText.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ')
      : 'No hay descripción disponible.';

    // Mapear estadísticas
    const statsMap: { [key: string]: keyof PokemonStats } = {
      hp: 'hp',
      attack: 'attack',
      defense: 'defense',
      'special-attack': 'specialAttack',
      'special-defense': 'specialDefense',
      speed: 'speed',
    };

    const stats: PokemonStats = {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    };

    data.stats.forEach((stat) => {
      const key = statsMap[stat.stat.name];
      if (key) {
        stats[key] = stat.base_stat;
      }
    });

    return {
      id: data.id,
      name: spanishName || data.name,
      types: typesLocalized || data.types.map((type) => type.type.name),
      image: data.sprites.other['official-artwork'].front_default,
      height: data.height,
      weight: data.weight,
      stats,
      abilities:
        abilitiesLocalized || data.abilities.map((ability) => ability.ability.name),
      species: description,
    };
  }
}

export default new PokeApiService();