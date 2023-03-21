import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components/native';
import { View, ScrollView } from 'react-native';
import { ImageBackground } from 'react-native';

const Previsions = ({ city = 'Paris,FR' }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const apiKey = '1ce839b740d507e20f1a1c61d62e3d64';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=metric`;

    axios.all([
      axios.get(apiUrl),
      axios.get(forecastApiUrl)
    ]).then(responseArr => {
      setWeatherData(responseArr[0].data);
      setForecastData(responseArr[1].data);
    }).catch(err => console.log(err));
  }, [city]);

  if (!weatherData || !forecastData) {
    return <StyledText>Loading weather data...</StyledText>;
  }

  const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const { name, wind, humidity, pressure } = weatherData;

  const filteredForecastData = forecastData.list.filter(item => {
    return item.dt_txt.includes('12:00:00');
  }).map(item => {
    const date = new Date(item.dt * 1000);
    const dayOfWeek = daysOfWeek[date.getDay()];
    return {
      dayOfWeek,
      weather: item.weather[0],
      main: item.main,
      wind,
      pressure,
      humidity
    };
  });

  return (
    <View>
      <BackgroundImage source={{ uri: 'https://tse1.mm.bing.net/th?id=OIP.OmcD3mCgpi5qQMskIRAbhQHaE7&pid=Api&P=0' }}>
        <StyledTitle>{name}</StyledTitle>
        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
        <StyledView2 >
          {filteredForecastData.map((item, index) => (
            <StyledForecastItem key={index}>
              <StyledText1>{item.dayOfWeek}</StyledText1>
              <StyledImage source={{ uri: `https://openweathermap.org/img/w/${item.weather.icon}.png` }} />
              <StyledTemperature>{Math.round(item.main.temp)}°C</StyledTemperature>
              <StyledDescription>{item.weather.description}</StyledDescription>
              <StyledText>{item.main.humidity}%</StyledText>
              <StyledText>{item.main.pressure}mbar</StyledText>
              <StyledText>{item.wind.speed} km/h</StyledText>
            </StyledForecastItem>
          ))}
        </StyledView2>
        </ScrollView>
      </BackgroundImage>
    </View>
  );
};

const BackgroundImage = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  opacity: 0.9;
`;

const StyledText = styled.Text`
  font-size: 18px;
  margin: 15px 7px;
  font-weight: bold;
`;

const StyledText1 = styled.Text`
  font-size: 18px;
  margin: 15px 7px;
  font-weight: bold;
  color: black;
`;

const StyledView2 = styled.View`
  margin: 10px;
  flex-direction: row;
`;

const StyledTitle = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: black;
  align-self: center;
  margin: 30px 0px;
`;

const StyledDescription = styled.Text`
  font-size: 18px;
  margin: 15px 7px;
  font-weight: bold;
`;

const StyledTemperature = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin: 15px 2px;
  color: black;
`;

const StyledImage = styled.Image`
    width: 50px; 
    height: 50px;
    margin: 15px 2px;
`;

const StyledForecastItem = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export default Previsions;
