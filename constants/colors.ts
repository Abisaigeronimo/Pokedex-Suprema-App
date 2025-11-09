// Colores por tipo de Pokémon
export const TYPE_COLORS: { [key: string]: string } = {
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

// Colores principales de la app
export const COLORS = {
  primary: '#DC0A2D',
  secondary: '#FFFFFF',
  background: '#F7F7F7',
  text: '#333333',
  textSecondary: '#666666',
  border: '#E0E0E0',
  cardBackground: '#FFFFFF',
  success: '#78C850',
  error: '#F08030',
};

// Etiquetas de estadísticas en español
export const STAT_LABELS: { [key: string]: string } = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defensa',
  specialAttack: 'At. Esp.',
  specialDefense: 'Def. Esp.',
  speed: 'Velocidad',
};

// Etiquetas de tipos en español
export const TYPE_LABELS: { [key: string]: string } = {
  normal: 'Normal',
  fire: 'Fuego',
  water: 'Agua',
  electric: 'Eléctrico',
  grass: 'Planta',
  ice: 'Hielo',
  fighting: 'Lucha',
  poison: 'Veneno',
  ground: 'Tierra',
  flying: 'Volador',
  psychic: 'Psíquico',
  bug: 'Bicho',
  rock: 'Roca',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
  fairy: 'Hada',
};

// Configuración de la API
export const API_CONFIG = {
  BASE_URL: 'https://pokeapi.co/api/v2',
  LIMIT: 20,
  TOTAL_POKEMON: 1010, // Gen 1-9
};