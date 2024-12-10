import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Importa Firebase Authentication
import { db } from '../firebaseConfig'; // Ajusta la ruta según tu configuración

const PagoModal = ({ visible, onClose }) => {
  const [paymentName, setPaymentName] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentCategory, setPaymentCategory] = useState('');

  // Obtener la instancia de autenticación de Firebase
  const auth = getAuth();
  const currentUser = auth.currentUser; // Obtener el usuario autenticado

  const handleAddPayment = async () => {
    try {
      if (paymentName && paymentAmount && paymentCategory) {
        // Asegúrate de obtener el correo electrónico del usuario
        const userEmail = currentUser?.email; // Obtener el correo electrónico del usuario

        // Verifica que el correo electrónico exista
        if (!userEmail) {
          alert('El usuario no está autenticado o no tiene un correo electrónico disponible');
          return;
        }

        // Agregar el pago a Firestore, incluyendo el userEmail
        await addDoc(collection(db, 'pagos'), {
          nombre: paymentName,
          cantidad: parseFloat(paymentAmount),
          tipo: paymentCategory,
          fecha: new Date(),
          userEmail: userEmail, // Agregar el correo electrónico al pago
        });

        onClose(); // Cierra el modal después de agregar el pago
        setPaymentName('');
        setPaymentAmount('');
        setPaymentCategory('');
        alert('Pago agregado correctamente');
      } else {
        alert('Por favor, completa todos los campos.');
      }
    } catch (error) {
      console.error('Error al agregar pago:', error);
      alert('Hubo un error al agregar el pago.');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Agregar Pago</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del pago"
            placeholderTextColor="#aaa"
            value={paymentName}
            onChangeText={setPaymentName}
          />
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={paymentAmount}
            onChangeText={setPaymentAmount}
          />
          <TextInput
            style={styles.input}
            placeholder="Categoría"
            placeholderTextColor="#aaa"
            value={paymentCategory}
            onChangeText={setPaymentCategory}
          />
          <View style={styles.buttonRow}>
            <Button title="Cancelar" color="#FF6B6B" onPress={onClose} />
            <Button title="Agregar" color="#84FA7F" onPress={handleAddPayment} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PagoModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#2D384A',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C9D1D9',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#090E14',
    borderRadius: 8,
    color: '#C9D1D9',
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: '#C9D1D9',
    borderWidth: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
});
