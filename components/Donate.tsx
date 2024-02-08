import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text, Modal, Portal, PaperProvider} from 'react-native-paper';
import { inputReducer, State } from '../utils';

const Donate = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handlePress = (buttonIndex) => {
    setSelectedButton(buttonIndex);
    // Add any additional logic or functionality here
  };

  const isButtonSelected = (buttonIndex) => {
    return selectedButton === buttonIndex;
  };

  const initialState: State = {
    outlinedText: '',
    iconsColor: {
      flatLeftIcon: undefined,
      flatRightIcon: undefined,
      outlineLeftIcon: undefined,
      outlineRightIcon: undefined,
      customIcon: undefined,
    },
  };

  const [state, dispatch] = React.useReducer(inputReducer, initialState);
  const {
    outlinedText,
    iconsColor: {
      flatLeftIcon,
      flatRightIcon,
      outlineLeftIcon,
      outlineRightIcon,
      customIcon,
    },
  } = state;

  const inputActionHandler = (type: keyof State, payload: string) =>
    dispatch({
      type: type,
      payload: payload,
    });

    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

  return (
    <PaperProvider>
    <View style={styles.container}>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} style={styles.modal}>
          <Text variant="titleLarge">Confirm Your Donation</Text>
          <Text>To: Ocean Alliance</Text>
          <Text>Amount: $25 USD</Text>
          <Text>Frequency: Weekly</Text>
          <Button mode="contained" style={styles.button}>
           CONFIRM
          </Button>
        </Modal>
      </Portal>
      <Text variant="titleMedium">
        Your Donation To
      </Text>
      <Text variant="displayMedium">
        Ocean Alliance
      </Text>
      {/* First row of buttons */}
      <View style={styles.row}>
        <Button
          mode={isButtonSelected(0) ? 'contained' : 'outlined'}
          onPress={() => handlePress(0)}
          style={styles.button}
        >
          One-Time
        </Button>
        <Button
          mode={isButtonSelected(1) ? 'contained' : 'outlined'}
          onPress={() => handlePress(1)}
          style={styles.button}
        >
          Recurring
        </Button>
        
      </View>

      {/* Second row of buttons */}
      <Text style={styles.text} variant="titleSmall">
        Choose an amount:
      </Text>
      <View style={styles.row}>
        <Button
          mode={isButtonSelected(3) ? 'contained' : 'outlined'}
          onPress={() => handlePress(3)}
          style={styles.button}
        >
          $25
        </Button>
        <Button
          mode={isButtonSelected(4) ? 'contained' : 'outlined'}
          onPress={() => handlePress(4)}
          style={styles.button}
        >
          $50
        </Button>
        <Button
          mode={isButtonSelected(5) ? 'contained' : 'outlined'}
          onPress={() => handlePress(5)}
          style={styles.button}
        >
          $100
        </Button>
      </View>

      <TextInput
        mode="outlined"
        style={styles.inputContainerStyle}
        placeholder="enter custom amount"
        value={outlinedText}
        onChangeText={(outlinedText) =>
          inputActionHandler('outlinedText', outlinedText)
        }
        left={
          <TextInput.Icon
            icon="currency-usd"
            color={outlineLeftIcon}
            
          />
        }
        maxLength={10}
        
      />
       <Text style={styles.text} variant="titleSmall">
        Payment Method:
      </Text>
      <TextInput
        mode="outlined"
        style={styles.inputContainerStyle}
        placeholder="**** **** **** 1234   01/26"
        value={outlinedText}
        onChangeText={(outlinedText) =>
          inputActionHandler('outlinedText', outlinedText)
        }
        left={
          <TextInput.Icon
            icon="credit-card-outline"
            color={outlineLeftIcon}
            
          />
        }
        maxLength={10}
        
      />
      <View style={styles.row}>
          <Button mode="contained" onPress={showModal} style={styles.button}>
           GIVE NOW!
          </Button>
          <Text variant="titleMedium">
            Weekly Donation $25 USD
          </Text>
      </View>
    </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 5,
  },
  text: {
    marginTop: 20,
    marginBottom: 8,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    height: 320,
    width: 300,
  },
  
});

export default Donate;
