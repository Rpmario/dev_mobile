import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Header from '../../components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Favoris = () => {

  const navigation = useNavigation();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const cities = await AsyncStorage.getItem('cities');
        if (cities) {
          setFavorites(JSON.parse(cities));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getFavorites();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerShown: true,
    });
  }, []);

  const handleRemoveFavorite = async (index) => {
    const newFavorites = [...favorites];
    newFavorites.splice(index, 1);
    setFavorites(newFavorites);
    try {
      await AsyncStorage.setItem('cities', JSON.stringify(newFavorites));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Header title='Mes favoris' />
      <ScrollView>
        {favorites.map((favorite, index) => (
            <View2 key={index}>
            <Button
            onPress={() =>
                navigation.navigate('Home', {
                city: favorite,
                })}>
                <ButtonText>{favorite}</ButtonText>
            </Button>
            <Button2 onPress={() => handleRemoveFavorite(index)}>
                <Image source={require('../../images/delete.png')} />
            </Button2>
            </View2>
        ))}
      </ScrollView>
    </View>
  );
};

const Button = styled.TouchableOpacity`
  background-color: #3498db;
  padding: 7px 0px;
  border-radius: 5px;
  margin: 5px 10px;
  width: 80%;
`;

const Button2 = styled.TouchableOpacity`
  padding: 7px 0px;
  border-radius: 5px;
  margin: 5px 10px;
  width: 20%;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
  text-transform: capitalize;
`;

const Image = styled.Image`
  width: 30px;
  height: 30px;
`;

const View2 = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ScrollView = styled.ScrollView`
  margin: 20px 5px 50px 5px;
`;

export default Favoris;
