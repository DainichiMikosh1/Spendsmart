import React from 'react';
import {  ScrollView, Text} from 'react-native';
import PagoItem from './PagoItem';
import styles from '../styles/styles';
import BotonRegreso from './BotonRegreso';

const ListaPagos = ({pagos,tituloPago}) => (
  <ScrollView style={styles.pagosContainer}>
    <BotonRegreso/>
    <Text style={styles.titleCategorias}>{tituloPago}</Text>
    {pagos.map((pago)=>(
          <PagoItem nombre={pago.nombre} cantidad={pago.cantidad}/>
        ))}
  </ScrollView>
);

export default ListaPagos;