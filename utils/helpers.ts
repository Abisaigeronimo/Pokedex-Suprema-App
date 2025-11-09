/**
 * Formatea el ID del Pokémon con ceros a la izquierda
 * @param id - ID del Pokémon
 * @returns ID formateado (ej: 001, 025, 150)
 */
export const formatPokemonId = (id: number): string => {
  return String(id).padStart(3, '0');
};

/**
 * Capitaliza la primera letra de un string
 * @param str - String a capitalizar
 * @returns String capitalizado
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Formatea el nombre del Pokémon (reemplaza guiones y capitaliza)
 * @param name - Nombre del Pokémon
 * @returns Nombre formateado
 */
export const formatPokemonName = (name: string): string => {
  return name
    .split('-')
    .map((word) => capitalize(word))
    .join(' ');
};

/**
 * Convierte decímetros a metros
 * @param height - Altura en decímetros
 * @returns Altura en metros
 */
export const heightToMeters = (height: number): string => {
  return (height / 10).toFixed(1);
};

/**
 * Convierte hectogramos a kilogramos
 * @param weight - Peso en hectogramos
 * @returns Peso en kilogramos
 */
export const weightToKilograms = (weight: number): string => {
  return (weight / 10).toFixed(1);
};

/**
 * Calcula el porcentaje de una estadística
 * @param stat - Valor de la estadística
 * @param max - Valor máximo (por defecto 255)
 * @returns Porcentaje
 */
export const getStatPercentage = (stat: number, max: number = 255): number => {
  return Math.min((stat / max) * 100, 100);
};

/**
 * Obtiene el color de fondo según el tipo de Pokémon
 * @param type - Tipo del Pokémon
 * @param colors - Objeto de colores por tipo
 * @returns Color hexadecimal
 */
export const getTypeColor = (
  type: string,
  colors: { [key: string]: string }
): string => {
  return colors[type.toLowerCase()] || '#A8A878';
};

/**
 * Calcula el total de estadísticas
 * @param stats - Objeto con las estadísticas
 * @returns Total de estadísticas
 */
export const calculateTotalStats = (stats: {
  [key: string]: number;
}): number => {
  return Object.values(stats).reduce((total, stat) => total + stat, 0);
};

/**
 * Limpia el texto de flavor text de la API
 * @param text - Texto a limpiar
 * @returns Texto limpio
 */
export const cleanFlavorText = (text: string): string => {
  return text.replace(/\f/g, ' ').replace(/\n/g, ' ').replace(/  +/g, ' ').trim();
};

/**
 * Obtiene el ID del Pokémon desde una URL de la API
 * @param url - URL de la API
 * @returns ID del Pokémon
 */
export const getPokemonIdFromUrl = (url: string): number => {
  const matches = url.match(/\/(\d+)\//);
  return matches ? parseInt(matches[1], 10) : 0;
};

/**
 * Valida si un string es un número
 * @param value - Valor a validar
 * @returns true si es un número válido
 */
export const isValidNumber = (value: string): boolean => {
  return !isNaN(Number(value)) && value.trim() !== '';
};

/**
 * Debounce function para optimizar búsquedas
 * @param func - Función a ejecutar
 * @param delay - Tiempo de espera en ms
 * @returns Función con debounce
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};