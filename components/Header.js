import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <Ionicons name="menu" size={28} color="#C9D1D9" />
      </TouchableOpacity>
      <Text style={styles.title}>SpendSmart</Text>
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={28} color="#C9D1D9" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop:20,
    height: 60,
    backgroundColor: '#0D1117',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    elevation: 4,
    borderColor: '#1F2A34',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#C9D1D9', 
  },
});

export default Header;

