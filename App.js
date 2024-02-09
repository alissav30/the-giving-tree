import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavBar from './components/NavBar.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';



export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavBar/>
    </SafeAreaProvider>
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
