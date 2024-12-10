import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: '#090E14', 
        alignItems: 'center',
        padding:20
    },
    chipContainer: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    chipText: {
        color: '#C7C7C7',
        fontSize: 14,
        fontFamily: 'Roboto',
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: 0.10,
        textAlign: 'center',
    },
    buttonText: {
        color: '#080D13',         // Color del texto
        fontSize: 16,          // Tamaño de la fuente
        fontFamily: 'Inter',    // Fuente
        fontWeight: '500',     // Peso de la fuente
        textAlign: 'center',    // Alineación centrada
    }
    ,
    customButton:{
        width:'80%',
        justifyContent:'center',
        justifyContent: 'center', 
        alignItems: 'center',   
        display: 'flex',  
        backgroundColor: '#84FA7F', 
        borderRadius:5,
        padding:5,
        marginTop:15,
    },
    titleLog:{
        color: 'white',
        fontSize: 20,
        fontFamily: 'Inter',
        fontWeight: '900',
        wordWrap: 'break-word',
        margin:15,
    },
    inputContainer: {
        width: '80%',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#090E14', 
        borderRadius: 8,
        borderWidth: 3,
        borderColor: 'rgba(45, 56, 74, 0.34)',
        justifyContent: 'flex-start',
        alignItems: 'flex-start', 
        marginBottom:17,
        marginTop:12,
    },
    inputText: {
        width: '100%', // Asegura que el TextInput ocupe todo el ancho del contenedor.
        color: 'white',
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '400',
        lineHeight: 16,
        textAlign: 'left',
    }
    ,
    subTitle:{
        color: '#C7C7C7',
        fontSize: 14,
        fontFamily: 'Roboto',
        fontWeight: '500',
        lineHeight: 20,
        letterSpacing: 0.10,
        wordWrap: 'break-word'
    },
    logoLog:{
        width: '45%', 
        height: '20%',
        borderRadius: 102,
        margin:25,
    },
    textG:{
        color: '#84FA7F', 
        fontSize: 12, 
        fontFamily: 'Inter', 
        fontWeight: '400', 
        wordWrap: 'break-word',
        margin:5,
    },
    pagosContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#2D384A80',
        borderRadius: 40,
        padding:20
      },
      pagoObjeto: {
        width: '100%',
        height: 100, 
        backgroundColor: 'rgba(110, 174, 216, 0.28)', 
        borderRadius: 30,
        padding: 15,
        marginVertical: 5,
        flexDirection: 'row',  // Espacia uniformemente los elementos
        alignItems: 'center', // Centra verticalmente el contenido
        alignSelf: 'center',
    },
      pagoObjetoTxt:{
        color:'#fff',
        fontSize:14,
        fontWeight:'800',
        textAlign:'center',
        marginLeft:15,
      },
      titleCategorias:{
        color: 'white',
        fontSize: 20,
        fontFamily: 'Inter',
        fontWeight: '900',
        wordWrap: 'break-word',
        margin:15,
        textAlign:'center'
      }
    });

export default styles;
