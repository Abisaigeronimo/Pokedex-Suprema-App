import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PokemonDetailScreen from './screens/PokemonDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  PokemonDetail: { pokemonId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#DC0A2D',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Pokédex' }}
        />
        <Stack.Screen 
          name="PokemonDetail" 
          component={PokemonDetailScreen}
          options={{ title: 'Detalles del Pokémon' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}