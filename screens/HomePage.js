import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View, Dimensions } from 'react-native';
import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import PagoModal from '../components/PagoModal'; 
import Balance from '../components/Balance';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import Estadisticas from './Estadisticas';  
import Mapa from './Mapa';
import { db } from '../firebaseConfig';

import { LineChart } from 'react-native-chart-kit';

const windowWidth = Dimensions.get('window').width;
const Tab = createBottomTabNavigator();

const HomePage = ({ navigation, route }) => {
  const { usuario } = route.params;

  const handlePress = (tituloPago) => {
    navigation.navigate('MisPagos', { usuario, tituloPago });
  };

  return (
    <NavigationContainer independent={true} style={{backgroundColor: '#090E14'}}>
      <View style={{ flex: 1, paddingTop:10, backgroundColor:'#090E14' }}>
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
                case 'Estadisticas':
                  iconName = 'pie-chart-outline';
                  break;
                case 'Mapa':
                  iconName = 'map';
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
          <Tab.Screen name="Estadisticas" component={Estadisticas} options={{ headerShown: false }} />
          <Tab.Screen name="Mapa" component={Mapa} options={{ headerShown: false }} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};

const MainHomePage = ({ navigation, usuario, handlePress }) => {
  const [modalVisible, setModalVisible] = useState(false);
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

        setPagosServicio(pagosPorServicio);
        setPagosProducto(pagosPorProducto);
      }, (error) => {
        console.log('Error al obtener los pagos: ', error);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const recentTransactions = [
    { date: "2024-12-01", description: "Spotify", amount: "-$9.99" },
    { date: "2024-11-29", description: "Supermercado", amount: "-$65.00" },
    { date: "2024-11-28", description: "Gas", amount: "-$30.00" },
    { date: "2024-11-27", description: "Nómina", amount: "+$1200.00" },
    { date: "2024-11-25", description: "Uber", amount: "-$15.00" },
  ];

  const financialGoals = [
    { goal: "Fondo de Emergencia", progress: "30%", details: "Has ahorrado $300 de $1000" },
    { goal: "Vacaciones", progress: "50%", details: "Has ahorrado $500 de $1000" },
    { goal: "Laptop nueva", progress: "10%", details: "Has ahorrado $100 de $1000" },
  ];

  const tips = [
    "Revisa tus gastos semanalmente para evitar sorpresas.",
    "Automatiza transferencias a tu cuenta de ahorros.",
    "Compara precios antes de contratar nuevos servicios.",
    "Establece metas de ahorro realistas y medibles.",
  ];

  const lineChartData = {
    labels: ["Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    datasets: [
      {
        data: [200, 180, 250, 300, 220, 270], 
        color: () => `rgba(132, 250, 127, 1)`, 
        strokeWidth: 2
      }
    ],
    legend: ["Gastos Mensuales (USD)"]
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Balance />

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Resumen Mensual</Text>
        <Text style={styles.infoText}>Gasto Total Este Mes: $450</Text>
        <Text style={styles.infoText}>Ahorro Total Este Mes: $150</Text>
        
        {/* Contenedor centrado */}
        <View style={{alignItems: 'center'}}>
          <LineChart
            data={lineChartData}
            width={windowWidth - 40} // Usar el width total menos el padding
            height={180}
            chartConfig={{
              backgroundColor: "#090E14",
              backgroundGradientFrom: "#090E14",
              backgroundGradientTo: "#090E14",
              color: (opacity = 1) => `rgba(132, 250, 127, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(201,209,217,${opacity})`,
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#84FA7F"
              }
            }}
            style={styles.chartStyle}
            bezier
          />
        </View>
      </View>

      <View style={styles.card}>
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
      </View>

      <View style={styles.card}>
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
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Transacciones Recientes</Text>
        {recentTransactions.map((item, index) => (
          <View key={index} style={styles.transactionRow}>
            <Text style={[styles.transactionText, {flex: 1}]}>{item.date}</Text>
            <Text style={[styles.transactionText, {flex: 2}]}>{item.description}</Text>
            <Text style={[styles.transactionText, {flex: 1, color: item.amount.startsWith('-') ? '#FA7F7F' : '#84FA7F' }]}>{item.amount}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Metas Financieras</Text>
        {financialGoals.map((goal, index) => (
          <View key={index} style={styles.goalRow}>
            <Text style={styles.goalTitle}>{goal.goal}</Text>
            <Text style={styles.goalProgress}>{goal.progress} - {goal.details}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Consejos Financieros</Text>
        {tips.map((tip, index) => (
          <Text key={index} style={styles.tipText}>• {tip}</Text>
        ))}
      </View>

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
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#C9D1D9',
    marginBottom: 15,
  },
  infoText: {
    color: '#C9D1D9',
    fontSize: 16,
    marginBottom: 5
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    justifyContent: 'flex-start'
  },
  card: {
    backgroundColor: '#2D384A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    width: '100%',
  },
  transactionRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  transactionText: {
    color: '#C9D1D9',
    fontSize: 14,
  },
  goalRow: {
    marginBottom: 10,
  },
  goalTitle: {
    color: '#84FA7F',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  goalProgress: {
    color: '#C9D1D9',
    fontSize: 14,
  },
  tipText: {
    color: '#C9D1D9',
    fontSize: 14,
    marginBottom: 5,
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
  chartStyle: {
    borderRadius: 10,
    marginVertical: 10
  },
});

export default HomePage;