import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';

const Recherche = () => {
  const navigation = useNavigation();
  const [city, setCity] = useState('Paris,FR');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = '1ce839b740d507e20f1a1c61d62e3d64';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;

  useEffect(() => {
    axios({
        method: 'GET',
        url: apiUrl
    }).then(response => {
      console.log(response.data)
      setWeatherData(response.data);
    }).catch(err => console.log(err))
  }, [apiUrl]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerShown: true,
    });
  }, []);

  if (!weatherData) {
    return (
      <View>
        <StyledTextInput
          onChangeText={setCity}
        />
      </View>
    );
  }

  const { name, weather, main, sys, wind} = weatherData;
  const { description, icon } = weather[0];
  const { feels_like, humidity, pressure } = main;

  return (
    <View>
        <BackgroundImage source={{ uri: 'https://tse1.mm.bing.net/th?id=OIP.MFOCt5v64BQMrPrAKTg4OgHaFj&pid=Api&P=0' }}>
        <View>
            <StyledTextInput
                onChangeText={setCity}
                placeholder="Entrez une ville..."
            />
        </View>
        <StyledScrollView>
            <StyledView>
                <StyledText1>{name} ({sys.country})</StyledText1>
                <StyledText2>{main.temp}°C</StyledText2>
                <StyledImage source={{ uri: `https://openweathermap.org/img/w/${icon}.png` }} /> 
                <StyledText>{description}</StyledText>
            </StyledView>
            <StyledView3>
                <StyledView4>
                    <StyledText>Ressentie </StyledText>
                    <StyledText>{feels_like}°C</StyledText>
                </StyledView4>
                <StyledView4>
                    <StyledText>Temp° Max </StyledText>
                    <StyledText>{main.temp_max}°C</StyledText>
                </StyledView4>
                <StyledView4>
                    <StyledText>Temp° Min </StyledText>
                    <StyledText>{main.temp_min}°C</StyledText>
                </StyledView4>
                <StyledView4>
                    <StyledText>Humidité  </StyledText>
                    <StyledText>{humidity}%</StyledText>
                </StyledView4>
                <StyledView4>
                    <StyledText>Pression  </StyledText>
                    <StyledText>{pressure}mbar</StyledText>
                </StyledView4>
                <StyledView4>
                    <StyledText>Vent  </StyledText>
                    <StyledText>{wind.speed} km/h</StyledText>
                </StyledView4>
            </StyledView3>
        </StyledScrollView>
        </BackgroundImage>
    </View>
  );
};

const BackgroundImage = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  opacity: 0.9;
`;

const StyledTextInput = styled.TextInput`
   border : solid gray 1px;
   margin: 10px;
   padding: 3px 10px;
   border-radius: 15px;
   background-color: aliceblue;
`;

const StyledText = styled.Text`
font-size: 25px;
padding:  5px 0px;
color: black;
`;

const StyledText1 = styled.Text`
font-size: 25px;
padding:  5px 0px;
margin: 20px 0px;
color: white;
font-weight: bold;
`;

const StyledImage = styled.Image`
width: 100px;
height: 100px;
align-self: center;
`;

const StyledText2 = styled.Text`
  font-size: 35px;
  color: black;
  font-weight: bold;
`;

const StyledView= styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

const StyledScrollView= styled.ScrollView`
  margin-bottom: 1px;
`;

const StyledView3= styled.View`
  margin: 70px 5px 30px 0px;
  background-color: rgba(135, 206, 235, 0.5);
  padding: 10px 20px;
  border-radius: 25px;
`;

const StyledView4= styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export default Recherche;
