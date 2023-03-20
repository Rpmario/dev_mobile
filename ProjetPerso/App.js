import React from 'react';
// import { View } from 'react-native';
// import Header from './src/components/header';
import Weather from './src/components/meteo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Previsions from './src/components/previsions';
import Recherche from './src/components/recherche';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
      {/* <Header /> */}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Weather} />
        <Stack.Screen name="Retour" component={Previsions} />
        <Stack.Screen name="Re" component={Recherche} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
