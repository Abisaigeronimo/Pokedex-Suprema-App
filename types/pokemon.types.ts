// Tipo básico de Pokemon en la lista
export interface PokemonListItem {
  name: string;
  url: string;
}

// Respuesta de la API de lista de Pokemon
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

// Información básica de Pokemon para la tarjeta
export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
}

// Estadísticas del Pokemon
export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

// Detalles completos del Pokemon
export interface PokemonDetail {
  id: number;
  name: string;
  types: string[];
  image: string;
  height: number;
  weight: number;
  stats: PokemonStats;
  abilities: string[];
  species: string;
}

// Respuesta de la API de detalles de Pokemon
export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  species: {
    name: string;
    url: string;
  };
}

// Respuesta de la API de especies (para descripción)
export interface PokemonSpeciesResponse {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
}