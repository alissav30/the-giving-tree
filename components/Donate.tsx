import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button, TextInput, Text, Modal, Portal, PaperProvider } from 'react-native-paper';
import { inputReducer, State } from '../utils';
import { database } from '../firebase.js';
import { ref, set, push } from "firebase/database";
import organizationsData from '../organizations.json';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase.js'; 
import { useNavigationContext } from '../NavigationContext';
import theme from '../themes';

const Donate = ({ navigation, route }) => {
    const { setCurrentTab } = useNavigationContext();
    const { orgId } = route.params; // Receive orgId from navigation
    const [orgName, setOrgName] = useState('');
    const [logoUrl, setLogoUrl] = useState('');

    const handleNavigateToTrees = () => {
        // Update the global state to switch tabs
        setCurrentTab('trees');
      };
  
    useEffect(() => {
        const fetchOrgDetailsAndLogo = async () => {
            const orgData = organizationsData.organizations[orgId];
            if (orgData) {
                setOrgName(orgData.organization_name);
    
                const storage = getStorage(app);
                const logoPath = orgData.logo_url;
                const logoRef = storageRef(storage, logoPath);
                try {
                    const url = await getDownloadURL(logoRef);
                    setLogoUrl(url); 
                } catch (error) {
                    console.log('Error fetching logo URL:', error);
                    setLogoUrl(''); 
                }
            }
        };
    
        fetchOrgDetailsAndLogo();
    }, [orgId]);
    
    
    
  
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const writeDonationData = (orgName, donateAmt, date, recurring) => {
    console.log(`Writing donation data: ${orgName}, ${donateAmt}, ${date}, ${recurring}`);
    const donationRef = push(ref(database, 'donations'));
    const amount = parseFloat(donateAmt.replace(/[^0-9.-]+/g, '')); // Removes any non-numeric characters before conversion

    
    set(donationRef, {
      orgName,
      donateAmt: amount,
      date,
      recurring,
    }).then(() => console.log("Donation data written successfully."))
      .catch((error) => console.error("Error writing donation data: ", error));
  };

  const handleConfirm = () => {
    // Example date and recurring flag setup
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0]; // For "YYYY-MM-DD" format
    let recurring = "No"; // Default to "No"
  
    if (isRecurringSelected) {
        if (selectedButton3 === 3) recurring = "Daily";
        else if (selectedButton3 === 4) recurring = "Weekly";
        else if (selectedButton3 === 5) recurring = "Monthly";
    }
    const donateAmt = getAmountText(); // This should fetch the donation amount text
  
    // Call writeDonationData with the donation details
    writeDonationData(orgName, donateAmt, formattedDate, recurring);
  
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
      return "One-Time";
    } else if (isButtonSelected1(1)) {
      let frequency = "";
      if (isButtonSelected3(3)) {
        frequency = "Weekly";
      } else if (isButtonSelected3(4)) {
        frequency = "Monthly";
      } else if (isButtonSelected3(5)) {
        frequency = "Annually";
      }
      return `${frequency}`;
    }
    // Default to a generic description
    return "Select donation type";
  };

  // To get the Amount Text for the confirmation message  
  const getAmountText = () => {
    // If there's text in the TextInput, use it as the amount
    if (outlinedText.trim() !== '') {
      return `$${outlinedText}`;
    } else {
      // Otherwise, use the selected button value
      if (isButtonSelected2(3)) {
        return "25.00";
      } else if (isButtonSelected2(4)) {
        return "50.00";
      } else if (isButtonSelected2(5)) {
        return "100.00";
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <PaperProvider theme={theme}>
          <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            {isConfirmationVisible ? (
              <View style={styles.tqcontainer}>
                <Text style={[styles.tqtext, { textAlign: 'left', marginRight: 20 }]} variant="headlineSmall">
                    Thank you for your donation to
                </Text>
                <Text style={[styles.tqtext, { textAlign: 'left' }]} variant="displaySmall">
                    {orgName}
                </Text>    
                {/* Logo Image */}
                <Image
                  source={{ uri: logoUrl }} // Use the fetched logo URL
                  style={styles.tqlogo}
                />
                <Button
                    mode="contained"
                    buttonColor="#599884" 
                    style={{marginTop: 20}}
                    onPress={() => handleNavigateToTrees}
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
                  <Text style={styles.smallMargin}>To: {orgName}</Text>
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
            <Text variant="displaySmall" style={styles.input}>
              {orgName}
            </Text>
            <View style={styles.row}>
              <Button
                mode={isButtonSelected1(0) ? 'contained' : 'outlined'}
                onPress={() => handlePress1(0)}
                style={styles.button2}
              >
                One-Time
              </Button>
              <Button
                mode={isButtonSelected1(1) ? 'contained' : 'outlined'}
                onPress={() => handlePress1(1)}
                style={styles.button2}
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
                    style={styles.button}
                  >
                    Weekly
                  </Button>
                  <Button
                    mode={isButtonSelected3(4) ? 'contained' : 'outlined'}
                    onPress={() => handlePress3(4)}
                    style={styles.button}
                  >
                    Monthly
                  </Button>
                  <Button
                    mode={isButtonSelected3(5) ? 'contained' : 'outlined'}
                    onPress={() => handlePress3(5)}
                    style={styles.button}
                  >
                    Annually
                  </Button>
                </View>
              </>
            )}
            <Text variant="titleSmall">Choose an amount:</Text>
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
            <View style={styles.wide}>
            <TextInput
                mode="outlined"
                placeholder="Enter custom amount"
                value={outlinedText}
                onChangeText={(text) => {
                    const numericText = text.replace(/[^0-9]/g, '');
                    // Replace 'inputActionHandler' with the correct function to update 'outlinedText'
                    inputActionHandler('outlinedText', numericText);
                }}
                keyboardType="numeric"
                returnKeyType="done" // Specifies the return key as 'Done'
                onSubmitEditing={Keyboard.dismiss} // Dismisses the keyboard when 'Done' is pressed
                left={<TextInput.Icon name="currency-usd" />}
                right={outlinedText.trim() !== '' && (
                    <TextInput.Icon name="close-circle" onPress={() => inputActionHandler('outlinedText', '')} />
                )}
            />
            </View>
            <Text variant="titleSmall" style={styles.input}>
              Payment Method:
            </Text>
            <View style={styles.wide}>
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
            </View>
            <View style={styles.bottomrow}>
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
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    margin: 40,
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
    width: '100%'
  },
  bottomrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
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
    height: 54,
    justifyContent: 'center',
  },
  whiteText: {
    color: 'white',
    

  },
  smallMargin: {
    margin: 4,
  },
  button: {
    margin: 4,
    width: '33%'
  },
  button2: {
    margin: 4,
    width: '50%',
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
    paddingHorizontal: 28,
    width: '100%',
    maxHeight: 650,
    borderRadius: 40,
  },
  tqtext: {
    color: 'white',
    marginBottom: 15, // Add margin bottom to create space between text elements
  },
  tqlogo: {
    width: 200, // Increase logo width
    height: 150, // Increase logo height
    resizeMode: 'contain',
    marginVertical: 15, // Increase space around the logo
  },  
  wide: {
    width: '100%'
  },
});

export default Donate;
