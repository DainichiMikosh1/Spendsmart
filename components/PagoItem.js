import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const PagoItem = ({ nombre, cantidad }) => (
  <View style={styles.pagoObjeto}>
    <Icon name={nombre} size={30} color="#84FA7F" />
    <Text style={styles.pagoObjetoTxt}>{nombre}</Text>
    <Text style={styles.pagoObjetoTxt}>{cantidad}</Text>
  </View>
);

export default PagoItem;
