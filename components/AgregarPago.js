import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const AgregarPago = () => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState('');

  const handleAgregarPago = async () => {
    if (!nombre || !cantidad || !fecha) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      await addDoc(collection(db, 'pagos'), {
        nombre,
        cantidad: parseFloat(cantidad),
        fecha,
      });
      Alert.alert('Éxito', 'El pago ha sido agregado.');
      setNombre('');
      setCantidad('');
      setFecha('');
    } catch (error) {
      console.error('Error al agregar el pago: ', error);
      Alert.alert('Error', 'No se pudo agregar el pago.');
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del pago"
        value={nombre}
        onChangeText={setNombre}
        placeholderTextColor="#C9D1D9"
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
        placeholderTextColor="#C9D1D9"
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha (DD/MM/YYYY)"
        value={fecha}
        onChangeText={setFecha}
        placeholderTextColor="#C9D1D9"
      />
      <Button title="Agregar Pago" onPress={handleAgregarPago} color="#84FA7F" />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 15,
    backgroundColor: '#2D384A',
    borderRadius: 10,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#090E14',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#C9D1D9',
  },
});

export default AgregarPago;
