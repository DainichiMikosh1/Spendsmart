import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAccountScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      Alert.alert("Cuenta Creada", "Tu cuenta ha sido creada exitosamente.", [
        { text: "OK", onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.titleLog}>¡Crea tu cuenta ahora!</Text>

      <Text style={styles.subTitle}>Correo Electrónico</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={form.email}
          style={styles.inputText}
          onChangeText={email => setForm({ ...form, email })}
          placeholder="Ingresa tu correo"
          placeholderTextColor="#C7C7C7"
        />
      </View>
      <Text style={styles.subTitle}>Contraseña</Text>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry
          value={form.password}
          style={styles.inputText}
          onChangeText={password => setForm({ ...form, password })}
          placeholder="Crea tu contraseña"
          placeholderTextColor="#C7C7C7"
        />
      </View>

      <TouchableOpacity
        style={styles.customButton}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Crear Cuenta</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.textG}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateAccountScreen;
