import React from 'react';
import Weather from './src/components/meteo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Previsions from './src/components/previsions';
import Recherche from './src/components/recherche';
import MenuButton from './src/components/menu';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Weather} />
        <Stack.Screen name="Retour" component={Previsions} />
        <Stack.Screen name="Re" component={Recherche} />
        <Stack.Screen name="Menu" component={MenuButton} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
