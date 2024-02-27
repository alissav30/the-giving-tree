import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import NavBar from './components/NavBar.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import theme from './themes.js'; 
import { PaperProvider } from 'react-native-paper';


export default function App() {
  return (
    <PaperProvider theme={theme}>
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <NavBar />
      </NavigationContainer>
    </SafeAreaProvider>
    </PaperProvider>
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
