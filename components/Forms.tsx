import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Button, TextInput, Text, Modal, Portal, PaperProvider} from 'react-native-paper';
import { inputReducer, State } from '../utils';
import FormBox from '../utils/Forms/FormBox';


const DonationHistory = () => (
    <View>
      <Text>Donation History Content Goes Here</Text>
      {/* Your content for donation history goes here */}
    </View>
  );
  
  const PastTaxForms = () => (
    <View style={styles.containerForm}>
        <View style={styles.row}>
            <FormBox year="2023" />
            <FormBox year="2022" />
        </View>
        <View style={styles.row}>
            <FormBox year="2021" />
            <FormBox year="2020" />
        </View>
        <View style={styles.row}>
            <FormBox year="2019" />
            <FormBox year="2018" />
        </View>
    </View>
  );



const Forms = () => {

    const [isDonationHistory, setDonationHistory] = useState(true);

    const handleToggle = () => {
        setDonationHistory(!isDonationHistory);
    };

    return (
        <SafeAreaView style={styles.container}>
            <PaperProvider>
                <Text style={styles.headerText}>Forms</Text>

                {/** Toggle **/}
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        isDonationHistory && styles.activeButton,
                        
                    ]}
                    onPress={handleToggle}
                    >
                    <Text style={isDonationHistory ? styles.activeText : styles.inactiveText}>
                        Donation History
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        !isDonationHistory && styles.activeButton,
                        
                    ]}
                    onPress={handleToggle}
                    >
                    <Text style={!isDonationHistory ? styles.activeText : styles.inactiveText}>
                        Past Tax Forms
                    </Text>
                    </TouchableOpacity>
                </View>

                {isDonationHistory ? <DonationHistory /> : <PastTaxForms />}

            </PaperProvider>
        </SafeAreaView>
     
    )
};

const styles = StyleSheet.create ({
    container: {
        flex: 1, 
        backgroundColor: '#F5F5F5'
    }, 
    headerText: {
        color: 'black', 
        textAlign: 'center',
        fontSize: 30,
    },
    toggleContainer: {
        flexDirection: 'row',
        borderRadius: 50,
        overflow: 'hidden',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#949DA9'
      },
      toggleButton: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#949DA9',
        borderRadius: 50,

      },
      activeButton: {
        backgroundColor: '#5A6F72', 
      },
      activeText: {
        color: 'white', 
      },
      inactiveText: {
        color: 'white', 
      },
      containerForm: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      row: {
        flexDirection: 'row',
        marginBottom: 10,
      },
});

export default Forms; 