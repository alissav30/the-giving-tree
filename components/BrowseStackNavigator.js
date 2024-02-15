import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Browse from './Browse';
import OrgsByCause from './OrgsByCause';
import OrgInfo from './OrgInfo';
import Donate from "./Donate";

const Stack = createNativeStackNavigator();

const BrowseStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BrowseMain">
      <Stack.Screen name="BrowseMain" component={Browse} options={{ headerShown: false }} />
      <Stack.Screen name="OrgsByCause" component={OrgsByCause} options={{ headerShown: false }}/>
      <Stack.Screen name="OrgInfo" component={OrgInfo} options={{ headerShown: false }}/>
      <Stack.Screen name="Donate" component={Donate} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default BrowseStackNavigator;
