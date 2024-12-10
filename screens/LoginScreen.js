import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import styles from '../styles/styles';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;
      Alert.alert("Inicio de Sesión", "Has iniciado sesión exitosamente.");
      navigation.navigate('Home', { usuario: user.email });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      
      <Image
      source={require('../assets/logo.jpg')}
      style={styles.logoLog}/>
      <Text style={styles.titleLog}>¡Bienvenido de nuevo!</Text>
      
      <Text style={styles.subTitle}>Correo electrónico</Text>
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
          placeholder="Ingresa tu contraseña"
          placeholderTextColor="#C7C7C7"
        />
      </View>

      <TouchableOpacity
        style={styles.customButton}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.textG}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={styles.textG}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
