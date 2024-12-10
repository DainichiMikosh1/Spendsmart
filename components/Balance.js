// Balance.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icono opcional

const Balance = () => {
  return (
    <View style={styles.balanceContainer}>
      <View style={styles.row}>
        <Text style={styles.balanceAmount}>$3,242.32</Text>
        <Ionicons name="ellipsis-horizontal" size={24} color="#C9D1D9" />
      </View>
      <Text style={styles.bankText}>BBVA</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceContainer: {
    backgroundColor: '#1A1F24',
    padding: 25,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00FF9D',
  },
  bankText: {
    marginTop: 5,
    fontSize: 16,
    color: '#C9D1D9',
  },
});

export default Balance;
