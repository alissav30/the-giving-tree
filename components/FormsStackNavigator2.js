import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Browse from './Browse';
import OrgsByCause from './OrgsByCause';
import OrgInfo from './OrgInfo';
import Donate from "./Donate";
import Forms2 from './Forms2';
import TurboTax from '../utils/Forms/TurboTax';
import Forms from './Forms';
import FormBox from '../utils/Forms/FormBox';
import FormPDF from '../utils/Forms/FormPDF';

const Stack = createNativeStackNavigator();

const FormsStackNavigator2 = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="BrowseMain">
      <Stack.Screen name="BrowseMain" component={Forms2} options={{ headerShown: false }} />
      <Stack.Screen name="TurboTax" component={TurboTax} options={{ headerShown: false }}/>
      <Stack.Screen name="FormMain" component={Forms} options={{ headerShown: false }} />
      <Stack.Screen name="FormBox" component={FormBox} options={{ headerShown: false}} />
      <Stack.Screen name="FormPDF" component={FormPDF} options={{ headerShown: false}} />


    </Stack.Navigator>

    </NavigationContainer>
    
  );
};

export default FormsStackNavigator2;
