import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Button, TextInput, Text, Modal, Portal, PaperProvider } from 'react-native-paper';
import { inputReducer, State } from '../utils';

const Donate = () => {
  const [selectedButton1, setSelectedButton1] = useState(1);
  const [selectedButton2, setSelectedButton2] = useState(null);
  const [selectedButton3, setSelectedButton3] = useState(3);

  const [isRecurringSelected, setIsRecurringSelected] = useState(true);

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


  // To get the Donation Description for the confirmation message  
  const getDonationDescription = () => {
    if (isButtonSelected1(0)) {
      return "One-Time Donation";
    } else if (isButtonSelected1(1)) {
      let frequency = "";
      if (isButtonSelected3(3)) {
        frequency = "Daily";
      } else if (isButtonSelected3(4)) {
        frequency = "Weekly";
      } else if (isButtonSelected3(5)) {
        frequency = "Monthly";
      }
      return `${frequency} Donation`;
    }
    // Default to a generic description
    return "Select donation type";
  };

  // To get the Amount Text for the confirmation message  
  const getAmountText = () => {
    // If there's text in the TextInput, use it as the amount
    if (outlinedText.trim() !== '') {
      return `$${outlinedText} USD`;
    } else {
      // Otherwise, use the selected button value
      if (isButtonSelected2(3)) {
        return "$25.00 USD";
      } else if (isButtonSelected2(4)) {
        return "$50.00 USD";
      } else if (isButtonSelected2(5)) {
        return "$100.00 USD";
      }
      // Default to an empty string
      return "";
    }
  };

  // Disable the amount buttons if there is text in the TextInput
  const isButtonDisabled = () => {
    return outlinedText.trim() !== '';
  };

  const isDonateButtonDisabled = () => {
    return outlinedText.trim() === '' && selectedButton2 === null;
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

  useEffect(() => {
    // This effect will run whenever outlinedText changes
    if (outlinedText.trim() !== '') {
      // If there's text in the TextInput, use it as the amount
      setSelectedButton2(null); // Deselect all buttons
    }
  }, [outlinedText]);

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
    <SafeAreaView style={styles.container}>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal} >
          <Text variant="titleLarge">Confirm Your Donation</Text>
          <View style={styles.modalTextBox}>
            <Text style={styles.modalText}>To: Ocean Alliance</Text>
            <Text style={styles.modalText}>Amount:  {getAmountText()} </Text>
            <Text style={styles.modalText}>Frequency: {getDonationDescription()}</Text>
          </View>
          <Button mode="contained" style={styles.button}>
           CONFIRM
          </Button>
        </Modal>
      </Portal>
      <Text variant="titleMedium">
        Your Donation To
      </Text>
      <Text variant="displayMedium" style={styles.input}>
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
          disabled={isButtonDisabled()}
        >
          $25
        </Button>
        <Button
          mode={isButtonSelected2(4) ? 'contained' : 'outlined'}
          onPress={() => handlePress2(4)}
          style={styles.button}
          disabled={isButtonDisabled()}
        >
          $50
        </Button>
        <Button
          mode={isButtonSelected2(5) ? 'contained' : 'outlined'}
          onPress={() => handlePress2(5)}
          style={styles.button}
          disabled={isButtonDisabled()}
        >
          $100
        </Button>
      </View>

      <TextInput
        mode="outlined"
        placeholder="enter custom amount"
        value={outlinedText}
        onChangeText={(text) => {
          // Use a regular expression to allow only numeric input
          const numericText = text.replace(/[^0-9]/g, '');
          inputActionHandler('outlinedText', numericText);
        }}
        keyboardType="numeric"  // Set keyboardType to 'numeric'
        left={
          <TextInput.Icon
            icon="currency-usd"
            color={outlineLeftIcon}  
          />
        }
        maxLength={10}
        right={
          outlinedText.trim() !== '' && (
            <TextInput.Icon
              icon="close-circle"
              onPress={() => inputActionHandler('outlinedText', '')}
            />
          )
        }
      />
      
       <Text variant="titleSmall" style={styles.input}>
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
          <Button mode="contained" onPress={showModal} style={styles.bigbutton} disabled={isDonateButtonDisabled()}>
            <Text variant="titleLarge" style={styles.whiteText}>
              GIVE NOW!
            </Text>
          </Button>
          <View>
          <Text variant="titleSmall">
            {getDonationDescription()}
          </Text>
          <Text variant="titleMedium">
            {getAmountText()}
          </Text>
          </View>
      </View>
    </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    margin: 5,
  },
  modal: {
    backgroundColor: 'white',
    padding: 40,
    alignSelf: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    alignItems: 'center',
  },
  input: {
    marginVertical: 10, // Add vertical margin to the TextInput
  },
  bigbutton: {
    margin: 10,
  },
  whiteText: {
    color: 'white',
  },
  modalText: {
    margin: 5, 
  },
  modalTextBox: {
    padding: 16, 
  },
});

export default Donate;
