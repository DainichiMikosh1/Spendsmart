import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const darkMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#212121' }],
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#212121' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#2e2e2e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{ color: '#2e2e2e' }],
  },
];

const Mapa = () => {
  const [location, setLocation] = useState(null);
  const [banks, setBanks] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // Solicitar permisos de ubicación
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado');
        return;
      }

      // Obtener la ubicación actual del usuario
      let userLocation = await Location.getCurrentPositionAsync({});
      const userCoords = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setLocation(userCoords);

      // Realizar llamada a la API de Overpass para obtener bancos cercanos
      const query = `
        [out:json];
        node["amenity"="bank"](around:8000,${userCoords.latitude},${userCoords.longitude});
        out;
      `;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Verificar si hay resultados
        if (data.elements && data.elements.length > 0) {
          const nearbyBanks = data.elements.map(bank => ({
            id: bank.id,
            latitude: bank.lat,
            longitude: bank.lon,
            name: bank.tags.name || 'Banco',
          }));
          setBanks(nearbyBanks);
          console.log("Bancos encontrados:", nearbyBanks);
        } else {
          setErrorMsg("No se encontraron bancos cercanos.");
          console.log("No se encontraron bancos en la ubicación.");
        }
      } catch (error) {
        console.error("Error al obtener bancos cercanos:", error);
        setErrorMsg("Error al obtener bancos cercanos.");
      }
    })();
  }, []);

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.pageText}>Bancos cercanos</Text>
      {location ? (
        <MapView
          style={styles.map}
          customMapStyle={darkMapStyle}
          initialRegion={location}
          showsUserLocation={true}
          followUserLocation={true}  // Asegura que el mapa sigue la ubicación del usuario
        >
          {banks.map((bank) => {
            console.log(`Renderizando banco: ${bank.name} en lat: ${bank.latitude}, lon: ${bank.longitude}`);  // Agregar log
            return (
              <Marker
                key={bank.id}
                coordinate={{
                  latitude: bank.latitude,
                  longitude: bank.longitude,
                }}
                title={bank.name}
                description="Banco cercano"
                pinColor="#84FA7F"
              />
            );
          })}
        </MapView>
      ) : (
        <Text style={{ color: 'white' }}>{errorMsg || 'Cargando ubicación...'}</Text>
      )}
    </View>
  );
};

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
  map: {
    width: '90%',
    height: '80%',
  },
});

export default Mapa;
