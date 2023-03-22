import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const MenuButton = () => {
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Container>
      <Button onPress={toggleMenu}>
        <StyledText>...</StyledText>
      </Button>
      {showMenu && (
        <Menu>
          <MenuItem onPress={() => navigation.navigate('Favoris')}>
            <Image source={require('../../images/favori.png')}/>
          </MenuItem>
          <MenuItem onPress={() => console.log('Share pressed')}>
          <Image source={require('../../images/partager.png')}/>
          </MenuItem>
        </Menu>
      )}
    </Container>
  );
};

const Container = styled.View`
  position: relative;
  z-index: 200;
`;

const Image = styled.Image`
  width: 30px;
  height: 30px;
`;

const Button = styled.TouchableOpacity`
  position: relative;
`;

const StyledText = styled.Text`
  font-size: 35px;
  color: black;
  font-weight: bold;
  transform: rotate(90deg);
`;

const Menu = styled.View`
  position: absolute;
  top: 42px;
  right: 0px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const MenuItem = styled.TouchableOpacity`
  padding: 10px;
`;

export default MenuButton;
