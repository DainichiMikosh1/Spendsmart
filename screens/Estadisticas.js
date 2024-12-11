import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 40; // para ajustar un poco los márgenes

const Estadisticas = () => {

  // Datos estáticos de ejemplo para las gráficas
  const lineChartData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        data: [200, 180, 250, 300, 220, 270], // Gasto mensual simulado
        color: () => `rgba(132, 250, 127, 1)`, // color de la línea
        strokeWidth: 2
      }
    ],
    legend: ["Gastos Mensuales (USD)"]
  };

  const barChartData = {
    labels: ["Alim.", "Serv.", "Suscr.", "Ocio", "Trans."],
    datasets: [
      {
        data: [80, 120, 45, 75, 90], // Distribución de gastos
      }
    ]
  };

  const pieChartData = [
    { name: "Alimentación", amount: 300, color: "#84FA7F", legendFontColor: "#C9D1D9", legendFontSize: 13 },
    { name: "Servicios", amount: 200, color: "#2D384A", legendFontColor: "#C9D1D9", legendFontSize: 13 },
    { name: "Suscripciones", amount: 100, color: "#66BB6A", legendFontColor: "#C9D1D9", legendFontSize: 13 },
    { name: "Ocio", amount: 150, color: "#4CAF50", legendFontColor: "#C9D1D9", legendFontSize: 13 },
    { name: "Transporte", amount: 180, color: "#1B5E20", legendFontColor: "#C9D1D9", legendFontSize: 13 }
  ];

  // Datos estáticos para tabla (ej: últimas transacciones)
  const recentTransactions = [
    { date: "2024-12-01", description: "Pago Spotify", amount: "-$9.99" },
    { date: "2024-11-29", description: "Supermercado", amount: "-$65.00" },
    { date: "2024-11-28", description: "Gas", amount: "-$30.00" },
    { date: "2024-11-27", description: "Ingreso Nómina", amount: "+$1200.00" },
    { date: "2024-11-25", description: "Transporte Uber", amount: "-$15.00" },
  ];

  return (
    <ScrollView style={styles.pageContainer} contentContainerStyle={{paddingBottom: 40}}>
      <Text style={styles.pageTitle}>Estadísticas Financieras</Text>
      <Text style={styles.sectionTitle}>Evolución de Gastos Mensuales</Text>
      <LineChart
        data={lineChartData}
        width={screenWidth}
        height={220}
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

      <Text style={styles.sectionTitle}>Distribución de Gastos por Categoría</Text>
      <PieChart
        data={pieChartData}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: "#090E14",
          backgroundGradientFrom: "#090E14",
          backgroundGradientTo: "#090E14",
          color: (opacity = 1) => `rgba(132, 250, 127, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(201,209,217,${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        style={styles.chartStyle}
      />

      <Text style={styles.sectionTitle}>Gastos Mensuales por Categoría</Text>
      <BarChart
        style={styles.chartStyle}
        data={barChartData}
        width={screenWidth}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: "#090E14",
          backgroundGradientFrom: "#090E14",
          backgroundGradientTo: "#090E14",
          color: (opacity = 1) => `rgba(132, 250, 127, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(201,209,217,${opacity})`,
        }}
        verticalLabelRotation={30}
      />

      <Text style={styles.sectionTitle}>Transacciones Recientes</Text>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeaderRow}>
          <Text style={styles.tableHeaderText}>Fecha</Text>
          <Text style={styles.tableHeaderText}>Descripción</Text>
          <Text style={styles.tableHeaderText}>Monto</Text>
        </View>
        {recentTransactions.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.date}</Text>
            <Text style={styles.tableCell}>{item.description}</Text>
            <Text style={[styles.tableCell, {color: item.amount.startsWith('-') ? '#FA7F7F' : '#84FA7F' }]}>
              {item.amount}
            </Text>
          </View>
        ))}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#090E14',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  pageTitle: {
    color: '#84FA7F',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  sectionTitle: {
    color: '#C9D1D9',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  chartStyle: {
    borderRadius: 10,
    marginVertical: 10
  },
  tableContainer: {
    backgroundColor: '#2D384A',
    borderRadius: 10,
    padding: 10,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#84FA7F',
    paddingBottom: 10,
    marginBottom: 10,
  },
  tableHeaderText: {
    flex: 1,
    color: '#84FA7F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tableCell: {
    flex: 1,
    color: '#C9D1D9',
    fontSize: 14,
  },
});

export default Estadisticas;