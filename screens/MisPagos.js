import { View, Text, ScrollView, StyleSheet } from 'react-native';
import styles from '../styles/styles';
import ListaPagos from '../components/ListaPagos';

const MisPagos = ({ route }) => {
  const { usuario } = route.params;
  const gastos = [
    { id: 1, nombre: 'apple', cantidad: 395.12, fecha: '12/02/24' },
    { id: 2, nombre: 'spotify', cantidad: 95.12, fecha: '14/03/24' },
    { id: 3, nombre: 'twitch', cantidad: 35.12, fecha: '14/05/24' },
  ];
  

  return (
    <View style={styles.container}>
      <ListaPagos pagos={gastos} tituloPago='Mis pagos'/>
    </View>
  );
};

export default MisPagos;
