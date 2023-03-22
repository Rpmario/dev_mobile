import React from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  background-color: #3498db;
  padding: 10px;
  border-radius: 5px;
  margin: 0px 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
`;

const AddCityButton = props => {

  return (
    <Button onPress={props.handlePress}>
      <ButtonText>Ajouter aux favoris</ButtonText>
    </Button>
  );
};

export default AddCityButton;
