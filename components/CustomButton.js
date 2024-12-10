// CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para agregar íconos opcionales

const CustomButton = ({ title, iconName, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <Ionicons name={iconName} size={24} color="#00FF9D" />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1F24',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    width: '48%', // Para que dos tarjetas estén en fila
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    color: '#C9D1D9',
  },
});

export default CustomButton;
