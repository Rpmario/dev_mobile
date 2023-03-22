import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Weather from '../screens/meteo';
import Previsions from '../screens/previsions';
import Recherche from '../screens/recherche';
import MenuButton from '../components/menu';
import Favoris from '../screens/favoris';


const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Weather} />
        <Stack.Screen name="Retour" component={Previsions} />
        <Stack.Screen name="Recherche" component={Recherche} />
        <Stack.Screen name="Menu" component={MenuButton} />
        <Stack.Screen name="Favoris" component={Favoris} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
