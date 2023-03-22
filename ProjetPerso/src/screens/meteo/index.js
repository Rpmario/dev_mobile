import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Header from '../../components/header';
import MenuButton from '../../components/menu';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permission d\'accès à la localisation',
        message:
          'L\'application a besoin d\'accéder à votre localisation.',
        buttonNeutral: 'Plus tard',
        buttonNegative: 'Annuler',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permission d\'accès à la localisation accordée');
      Geolocation.getCurrentPosition(
        position => {
          console.log('test', position);

          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`)
            .then(response => response.json())
            .then(data => {
              console.log('ma ville', data.address.city);
            });
        },
        error => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    } else {
      console.log('Permission d\'accès à la localisation refusée');
    }
  } catch (err) {
    console.warn(err);
  }
}

requestLocationPermission();


const Weather = ({route}) => {
  const navigation = useNavigation();
  const [weatherData, setWeatherData] = useState(null);

  if (route.params?.city) {
    var city = route.params?.city;
  } else {
    var city = "Paris";
  }
  useEffect(() => {

  requestLocationPermission();

  

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
    return <StyledViewf>
            <ActivityIndicator size="large" color="blue" />
            <StyledText>Loading weather data...</StyledText>
          </StyledViewf>;
  }

  const { name, weather, main, sys, wind} = weatherData;
  const { description, icon } = weather[0];
  const { feels_like, humidity, pressure } = main;

  return (
    <View>
        <Header title='MétéRio' />
        <BackgroundImage source={{ uri: 'https://tse3.explicit.bing.net/th?id=OIP.Me0fvmoRD9Xzq4nqf346RQHaE7&pid=Api&P=0' }}>
            <StyledScrollView>
                <StyledView2>
                    <StyledText2
                        onPress={() => navigation.navigate('Recherche')}
                    >
                        +
                    </StyledText2>
                    <StyledText>{name} ({sys.country})</StyledText>
                    <MenuButton />
                </StyledView2>
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
                <Button onPress={() => navigation.navigate('Retour')}>
                  <StyledTextb>Voir les prévisions sur 5 jours</StyledTextb>
                </Button>
            </StyledScrollView>
        </BackgroundImage>
    </View>
  );
};

const StyledViewf = styled.View`
  align-items: center;
  margin-top: 300px;
`;

const BackgroundImage = styled(ImageBackground)`
  width: 100%;
  height: 100%;
`;

const StyledText = styled.Text`
  font-size: 25px;
  padding:  5px 0px;
  color: black;
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
  margin: 30px 7px;
  background-color: rgba(135, 206, 235, 0.5);
  padding: 10px 20px;
  border-radius: 20px;
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

const StyledTextb = styled.Text`
    font-size: 23px;
    font-weight: 700;
    align-self: center;
    padding: 9px 10px;
    color: antiquewhite;
`;

const Button = styled.TouchableOpacity`
  position: relative;
  background-color: blue;
  border-radius: 20px;
  margin: 0px 7px;
`;

 export default Weather;
