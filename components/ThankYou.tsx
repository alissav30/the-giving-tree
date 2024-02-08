import React from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Button, Text } from 'react-native-paper';

const ThankYou = () => {
  return (
    <PaperProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5A6F72' }}>
        <Text style={{ color: 'white' }}>Thank you for your donation to</Text>
        <Text style={{ color: 'white' }} variant="displayMedium">
            Ocean Alliance
        </Text>
        <Text style={{ color: 'white' }}>a logo should be here</Text>
        <Button
            mode="contained"
            buttonColor="#599884"
            onPress={() => alert('Navigate to the TREE')}
          >
            VIEW YOUR TREE GROW
          </Button>
      </View>
    </PaperProvider>
  );
};

export default ThankYou;
