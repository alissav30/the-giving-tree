import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text, Modal, Portal, PaperProvider, ToggleButton} from 'react-native-paper';
import { inputReducer, State } from '../utils';

const Donate = () => {
  const [selectedButton1, setSelectedButton1] = useState(null);
  const [selectedButton2, setSelectedButton2] = useState(null);
  const [selectedButton3, setSelectedButton3] = useState(null);

  const [isRecurringSelected, setIsRecurringSelected] = useState(false);

  const handlePress1 = (buttonIndex1) => {
    setSelectedButton1(buttonIndex1);
    setIsRecurringSelected(buttonIndex1 === 1);
  };
  const isButtonSelected1 = (buttonIndex1) => {
    return selectedButton1 === buttonIndex1;
  };

  const handlePress2 = (buttonIndex2) => {
    setSelectedButton2(buttonIndex2);
  };
  const isButtonSelected2 = (buttonIndex2) => {
    return selectedButton2 === buttonIndex2;
  };

  const handlePress3 = (buttonIndex3) => {
    setSelectedButton3(buttonIndex3);
  };
  const isButtonSelected3 = (buttonIndex3) => {
    return selectedButton3 === buttonIndex3;
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
          mode={isButtonSelected1(0) ? 'contained' : 'outlined'}
          onPress={() => handlePress1(0)}
          style={styles.button}
        >
          One-Time
        </Button>
        <Button
          mode={isButtonSelected1(1) ? 'contained' : 'outlined'}
          onPress={() => handlePress1(1)}
          style={styles.button}
        >
          Recurring
        </Button>  
      </View>

      {isRecurringSelected && (
          <>
             <Text variant="titleSmall">
              How often would you like to donate?
            </Text>
            <View style={styles.row}>
              <Button
                mode={isButtonSelected3(3) ? 'contained' : 'outlined'}
                onPress={() => handlePress3(3)}
                style={styles.button}
              >
                Daily
              </Button>
              <Button
                mode={isButtonSelected3(4) ? 'contained' : 'outlined'}
                onPress={() => handlePress3(4)}
                style={styles.button}
              >
                Weekly
              </Button>
              <Button
                mode={isButtonSelected3(5) ? 'contained' : 'outlined'}
                onPress={() => handlePress3(5)}
                style={styles.button}
              >
                Monthly
              </Button>
            </View>
          </>
        )}

      <Text variant="titleSmall">
        Choose an amount:
      </Text>
      <View style={styles.row}>
        <Button
          mode={isButtonSelected2(3) ? 'contained' : 'outlined'}
          onPress={() => handlePress2(3)}
          style={styles.button}
        >
          $25
        </Button>
        <Button
          mode={isButtonSelected2(4) ? 'contained' : 'outlined'}
          onPress={() => handlePress2(4)}
          style={styles.button}
        >
          $50
        </Button>
        <Button
          mode={isButtonSelected2(5) ? 'contained' : 'outlined'}
          onPress={() => handlePress2(5)}
          style={styles.button}
        >
          $100
        </Button>
      </View>

      <TextInput
        mode="outlined"
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
       <Text variant="titleSmall">
        Payment Method:
      </Text>
      <TextInput
        mode="outlined"
        placeholder="**** **** **** 1234   01/26"
        editable={false}
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
  modal: {
    backgroundColor: 'white',
    padding: 20,
    height: 320,
    width: 300,
  },
});

export default Donate;
