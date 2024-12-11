import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(- (screenWidth * 3/4))).current; 

  const openMenu = () => {
    setMenuVisible(true); 
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: - (screenWidth * 3/4),
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setMenuVisible(false);
    });
  };

  useEffect(() => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [menuVisible]);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={openMenu}>
          <Ionicons name="menu" size={28} color="#C9D1D9" />
        </TouchableOpacity>
        <Text style={styles.title}>SpendSmart</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={28} color="#C9D1D9" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeMenu}
      >
        <View style={styles.overlay}>
          {/* Primero el menú, a la izquierda */}
          <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
            <Text style={styles.menuTitle}>Menú</Text>
            <TouchableOpacity style={styles.menuItem} onPress={() => { /* Navegar a configuración */ }}>
              <Ionicons name="settings-outline" size={22} color="#C9D1D9" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Configuración</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => { /* Navegar a acerca de */ }}>
              <Ionicons name="information-circle-outline" size={22} color="#C9D1D9" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Acerca de</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => { /* Lógica Cerrar Sesión */ }}>
              <Ionicons name="log-out-outline" size={22} color="#C9D1D9" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </Animated.View>
          
          {/* Luego el overlay tocable, que ocupa el resto de la pantalla y cierra el menú al tocar */}
          <TouchableOpacity style={styles.overlayTouchable} onPress={closeMenu}/>
        </View>
      </Modal>
    </>
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
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  overlayTouchable: {
    flex: 1,
  },
  menuContainer: {
    width: (screenWidth * 3) / 4,
    backgroundColor: '#0D1117',
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C9D1D9',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuItemIcon: {
    marginRight: 10,
  },
  menuItemText: {
    color: '#C9D1D9',
    fontSize: 16,
  },
});

export default Header;