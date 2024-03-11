import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Browse from './Browse';
import OrgsByCause from './OrgsByCause';
import OrgInfo from './OrgInfo';
import Donate from "./Donate";
import Trees from './Trees';
import OrgWebView from '../utils/OrgWebView';


const Stack = createNativeStackNavigator();

const handleNavigateToTrees = () => {
  // Update the global state to switch tabs

  setNavBarIndex(0);
  navigation.navigate("Trees")
};

const BrowseStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BrowseMain">
      <Stack.Screen name="BrowseMain" component={Browse} options={{ headerShown: false }} />
      <Stack.Screen name="OrgsByCause" component={OrgsByCause} options={{ headerShown: false }}/>
      <Stack.Screen name="OrgInfo" component={OrgInfo} options={{ headerShown: false }}/>
      <Stack.Screen name="Donate" component={Donate} options={{ headerShown: false }} />
      <Stack.Screen name="OrgWebView" component={OrgWebView} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Trees" component={Trees} options={{ headerShown: false }}/> */}
    </Stack.Navigator>
  );
};

export default BrowseStackNavigator;
