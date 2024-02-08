import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Button, Text } from 'react-native-paper';

const ThankYou = () => {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.text} variant="headlineSmall">
            Thank you for your donation to
        </Text>
        <Text style={styles.text}  variant="displayMedium">
            Ocean Alliance
        </Text>
        <Image
            source={require('../assets/ocean_alliance_logo.png')}  // Replace with the actual path to your image
            style={styles.logo}
        />
        <Button
        mode="contained"
        buttonColor="#599884"
        onPress={() => alert('Navigate to the TREE')}
        >
            <Text style={styles.text} variant="headlineSmall">
                VIEW YOUR TREE
            </Text>
        </Button>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5A6F72',
        padding: 20, // Adjust the padding to add space around the elements
      },
      text: {
        color: 'white',
        marginBottom: 10, // Add margin bottom to create space between text elements
      },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    }
  });

export default ThankYou;
