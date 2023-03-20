import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';

  
const Header = () => {
  
  return (  
    <View style={
      {
        backgroundColor:'blue'
      }
    }>
      <StyledText>MétéRio</StyledText>
    </View>
  );
};

const StyledText = styled.Text`
  color: white;
  align-self: center;
  font-size: 25px;
  padding:  5px 0px;
`;

export default Header;
