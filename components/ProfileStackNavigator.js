import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';


import Forms2 from './Forms2';
import TurboTax from '../utils/Forms/TurboTax';

import Profile from './Profile';
import Setting from './Setting';


const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="ProfileMain">
      <Stack.Screen name="ProfileMain" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="SettingMain" component={Setting} options={{ headerShown: false }}/>


    </Stack.Navigator>

    </NavigationContainer>
    
  );
};

export default ProfileStackNavigator;
