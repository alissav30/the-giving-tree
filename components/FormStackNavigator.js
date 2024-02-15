import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Forms from './Forms';
import TurboTax from '../utils/Forms/TurboTax';
import FormBox from '../utils/Forms/FormBox';



const Stack = createNativeStackNavigator();

const FormStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="FormMain">
        <Stack.Screen name="FormMain" component={Forms} options={{ headerShown: false }} />
        <Stack.Screen name="FormBox" component={FormBox} options={{ headerShown: false}} />
        <Stack.Screen name="TurboTax" component={TurboTax} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default FormStackNavigator;