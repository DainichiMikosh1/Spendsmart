import React from 'react';
import { View, TouchableOpacity  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BotonRegreso = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Icon name="arrow-back" size={30} color="#929292" />
      </TouchableOpacity>
    </View>
  );
};

export default BotonRegreso;
