import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Button, TextInput, Text, Modal, Portal, PaperProvider } from 'react-native-paper';
import { inputReducer, State } from '../utils';

const Donate = ( { navigation } ) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  // Used to display the big Thank You message
  const handleConfirm = () => {
    setConfirmationVisible(true);
  };

  //handles one-time vs recurring buttons
  const [isRecurringSelected, setIsRecurringSelected] = useState(true);
  const [selectedButton1, setSelectedButton1] = useState(1);
  const handlePress1 = (buttonIndex1) => {
    setSelectedButton1(buttonIndex1);
    setIsRecurringSelected(buttonIndex1 === 1);
  };
  const isButtonSelected1 = (buttonIndex1) => {
    return selectedButton1 === buttonIndex1;
  };

  // handles daily vs weekly vs monthly buttons
  const [selectedButton2, setSelectedButton2] = useState(null);
  const handlePress2 = (buttonIndex2) => {
    setSelectedButton2(buttonIndex2);
  };
  const isButtonSelected2 = (buttonIndex2) => {
    return selectedButton2 === buttonIndex2;
  };

  // handles $25 vs $50 vs $100 buttons
  const [selectedButton3, setSelectedButton3] = useState(3);
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

  // Disable the amount buttons if there's text in the TextInput
  const isButtonDisabled = () => {
    return outlinedText.trim() !== '';
  };

  // Diable 'Give Now!' button if a dollar amount isn't specified
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
      <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        {isConfirmationVisible ? (
          <View style={styles.tqcontainer}>
          <Text style={styles.tqtext} variant="headlineSmall">
              Thank you for your donation to
          </Text>
          <Text style={styles.tqtext}  variant="displayMedium">
              Ocean Alliance
          </Text>
          <Image
              source={require('../assets/ocean_alliance_logo.png')}  // Replace with the actual path to your image
              style={styles.tqlogo}
          />
          <Button
          mode="contained"
          buttonColor="#599884"
          onPress={() => alert('Navigate to the TREE')}
          >
              <Text style={styles.tqtext} variant="headlineSmall">
                  VIEW YOUR TREE
              </Text>
          </Button>
        </View>
        ) : (
          <>
            <Portal>
              <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                <Text variant="titleLarge">Confirm Your Donation</Text>
                <View style={styles.modalTextBox}>
                  <Text style={styles.smallMargin}>To: Ocean Alliance</Text>
                  <Text style={styles.smallMargin}>Amount: {getAmountText()} </Text>
                  <Text style={styles.smallMargin}>Frequency: {getDonationDescription()}</Text>
                </View>
                <View style={styles.row}>
                  <Button mode="contained" style={styles.smallMargin} onPress={handleConfirm}>
                    CONFIRM
                  </Button>
                  <Button mode="outlined" onPress={hideModal} style={[styles.smallMargin, { marginRight: 10 }]}>
                    CANCEL
                  </Button>
                </View>
              </Modal>
            </Portal>
            <Text variant="titleMedium">Your Donation To</Text>
            <Text variant="displayMedium" style={styles.input}>
              Ocean Alliance
            </Text>
            <View style={styles.row}>
              <Button
                mode={isButtonSelected1(0) ? 'contained' : 'outlined'}
                onPress={() => handlePress1(0)}
                style={styles.smallMargin}
              >
                One-Time
              </Button>
              <Button
                mode={isButtonSelected1(1) ? 'contained' : 'outlined'}
                onPress={() => handlePress1(1)}
                style={styles.smallMargin}
              >
                Recurring
              </Button>
            </View>
            {isRecurringSelected && (
              <>
                <Text variant="titleSmall">How often would you like to donate?</Text>
                <View style={styles.row}>
                  <Button
                    mode={isButtonSelected3(3) ? 'contained' : 'outlined'}
                    onPress={() => handlePress3(3)}
                    style={styles.smallMargin}
                  >
                    Daily
                  </Button>
                  <Button
                    mode={isButtonSelected3(4) ? 'contained' : 'outlined'}
                    onPress={() => handlePress3(4)}
                    style={styles.smallMargin}
                  >
                    Weekly
                  </Button>
                  <Button
                    mode={isButtonSelected3(5) ? 'contained' : 'outlined'}
                    onPress={() => handlePress3(5)}
                    style={styles.smallMargin}
                  >
                    Monthly
                  </Button>
                </View>
              </>
            )}
            <Text variant="titleSmall">Choose an amount:</Text>
            <View style={styles.row}>
              <Button
                mode={isButtonSelected2(3) ? 'contained' : 'outlined'}
                onPress={() => handlePress2(3)}
                style={styles.smallMargin}
                disabled={isButtonDisabled()}
              >
                $25
              </Button>
              <Button
                mode={isButtonSelected2(4) ? 'contained' : 'outlined'}
                onPress={() => handlePress2(4)}
                style={styles.smallMargin}
                disabled={isButtonDisabled()}
              >
                $50
              </Button>
              <Button
                mode={isButtonSelected2(5) ? 'contained' : 'outlined'}
                onPress={() => handlePress2(5)}
                style={styles.smallMargin}
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
                const numericText = text.replace(/[^0-9]/g, '');
                inputActionHandler('outlinedText', numericText);
              }}
              keyboardType="numeric"
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
          </>
        )}
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    marginBottom: 20,

  },
  backButtonText: {
    alignSelf: 'flex-start',
    color: '#5A6F72',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  modal: {
    backgroundColor: 'white',
    padding: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginVertical: 10,
  },
  bigbutton: {
    margin: 10,
  },
  whiteText: {
    color: 'white',
  },
  smallMargin: {
    margin: 5,
  },
  modalTextBox: {
    padding: 16,
  },
  confirmationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Customize the styles for the confirmation view
  },
  tqcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A6F72',
    padding: 28, // Adjust the padding to add space around the elements
    width: '100%',
  },
  tqtext: {
    color: 'white',
    marginBottom: 10, // Add margin bottom to create space between text elements
  },
  tqlogo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  }
});

export default Donate;
