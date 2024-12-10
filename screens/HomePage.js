import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import PagoModal from '../components/PagoModal'; 
import Balance from '../components/Balance';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import Pagina1 from './Pagina1';
import Pagina2 from './Pagina2';
import Pagina3 from './Pagina3';
import Mapa from './Mapa';
import { db } from '../firebaseConfig';

const Tab = createBottomTabNavigator();

const HomePage = ({ navigation, route }) => {
  const { usuario } = route.params;

  const handlePress = (tituloPago) => {
    navigation.navigate('MisPagos', { usuario, tituloPago });
  };

  return (
    <NavigationContainer independent={true} style={{backgroundColor: '#090E14'}}>
      <View style={{ flex: 1,paddingTop:10,backgroundColor:'#090E14' }}>
        <Header />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName;
              let iconColor = focused ? '#84FA7F' : '#2D384A';

              switch (route.name) {
                case 'Home':
                  iconName = 'home-outline';
                  break;
                case 'Pagina1':
                  iconName = 'list-outline';
                  break;
                case 'Pagina2':
                  iconName = 'pie-chart-outline';
                  break;
                case 'Mapa':
                  iconName = 'map';
                  break;
                case 'Pagina3':
                  iconName = 'rocket-outline';
                  break;
                default:
                  iconName = 'help-outline';
              }

              return <Icon name={iconName} size={25} color={iconColor} />;
            },
            tabBarStyle: {
              backgroundColor: '#090E14',
              borderTopWidth: 0,
            },
            tabBarShowLabel: false,
          })}
        >
          <Tab.Screen name="Home" options={{ headerShown: false }}>
            {() => (
              <MainHomePage 
                navigation={navigation} 
                usuario={usuario} 
                handlePress={handlePress} 
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Pagina1" component={Pagina1} options={{ headerShown: false }} />
          <Tab.Screen name="Pagina2" component={Pagina2} options={{ headerShown: false }} />
          <Tab.Screen name="Mapa" component={Mapa} options={{ headerShown: false }} />
          <Tab.Screen name="Pagina3" component={Pagina3} options={{ headerShown: false }} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};

const MainHomePage = ({ navigation, usuario, handlePress }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pagos, setPagos] = useState([]);
  const [pagosServicio, setPagosServicio] = useState([]);
  const [pagosProducto, setPagosProducto] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const userEmail = currentUser.email;
      const pagosCollection = collection(db, 'pagos');
      const q = query(pagosCollection, where('userEmail', '==', userEmail));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const pagosData = snapshot.docs.map((doc) => doc.data());
        const pagosPorServicio = pagosData.filter((pago) => pago.tipo === 'Suscripcion');
        const pagosPorProducto = pagosData.filter((pago) => pago.tipo === 'Servicio');

        setPagos(pagosData);
        setPagosServicio(pagosPorServicio);
        setPagosProducto(pagosPorProducto);
      }, (error) => {
        console.log('Error al obtener los pagos: ', error);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Balance />
      <TouchableOpacity style={styles.card}>
        <Text style={styles.sectionTitle}>Pagos de Suscripciones</Text>
        <View style={styles.row}>
          {pagosServicio.map((pago, index) => (
            <CustomButton
              key={index}
              title={pago.nombre}
              iconName={pago.icono}
              onPress={() => handlePress(pago.nombre)}
            />
          ))}
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.sectionTitle}>Pagos de Servicios</Text>
        <View style={styles.row}>
          {pagosProducto.map((pago, index) => (
            <CustomButton
              key={index}
              title={pago.nombre}
              iconName={pago.icono}
              onPress={() => handlePress(pago.nombre)}
            />
          ))}
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addPaymentButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addPaymentButtonText}>Agregar Pago</Text>
      </TouchableOpacity>

      <PagoModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#090E14',
    paddingBottom: 30,
    paddingTop: 60,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#C9D1D9',
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#2D384A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    width: '100%',
  },
  addPaymentButton: {
    marginTop: 20,
    backgroundColor: '#84FA7F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addPaymentButtonText: {
    color: '#090E14',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomePage;
