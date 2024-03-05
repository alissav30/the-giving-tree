import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import NavBar from './components/NavBar.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import theme from './themes.js'; 
import { PaperProvider } from 'react-native-paper';
import { NavigationProvider } from './NavigationContext'; // Import the NavigationProvider


export default function App() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <NavigationProvider>
    <PaperProvider theme={theme}>
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <NavBar selectedIndex={setSelectedIndex} />
      </NavigationContainer>
    </SafeAreaProvider>
    </PaperProvider >
    </NavigationProvider> 

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
