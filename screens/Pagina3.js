import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Pagina3 = () => (
  <View style={styles.pageContainer}>
    <Text style={styles.pageText}>HOLA desde Página 3</Text>
  </View>
);

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#090E14',
  },
  pageText: {
    color: '#84FA7F',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Pagina3;