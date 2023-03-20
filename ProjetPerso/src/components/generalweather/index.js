import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';

const GeneralWeather = ({ city = 'Paris,FR' }) => {
  const navigation = useNavigation();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiKey = '1ce839b740d507e20f1a1c61d62e3d64';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
    axios({
        method: 'GET',
        url: apiUrl
    }).then(response => {
      console.log(response.data)
      setWeatherData(response.data);
    }).catch(err => console.log(err))
  }, [city]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerShown: false,
    });
  }, []);

  if (!weatherData) {
    return <Text>Loading weather data...</Text>;
  }

  const { weather, main, wind} = weatherData;
  const { description, icon } = weather[0];
  const { feels_like, humidity, pressure } = main;

  return (
    <View>
        <StyledScrollView>
            <StyledView>
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
    </View>
  );
};

const StyledText = styled.Text`
  font-size: 25px;
  padding:  5px 0px;
`;

const StyledText2 = styled.Text`
  font-size: 35px;
  color: black;
  font-weight: bold;
`;

const StyledView= styled.View`
  align-items: center;
  margin-bottom: 50px;
`;

const StyledScrollView= styled.ScrollView`
  margin-bottom: 100px;
`;

const StyledView3= styled.View`
  margin: 30px 5px;
  background-color: antiquewhite;
  padding: 10px 20px;
  border-radius: 25px;
`;

const StyledView2= styled.View`
  margin: 25px 30px;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledView4= styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StyledImage = styled.Image`
    width: 100px;
    height: 100px;
`;

 export default GeneralWeather;
