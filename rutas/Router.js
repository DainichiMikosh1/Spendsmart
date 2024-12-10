import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import HomePage from '../screens/HomePage';
import MisPagos from '../screens/MisPagos'; 

const Stack = createNativeStackNavigator();

const Router = () => {

    return(
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }} mode="modal">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name='CreateAccount' component={CreateAccountScreen}/>
            <Stack.Screen name="Home" component={HomePage} /> 
            <Stack.Screen name="MisPagos" component={MisPagos} />
        </Stack.Navigator>
    )
}

export default Router;