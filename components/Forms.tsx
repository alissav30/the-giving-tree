import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, StatusBar, ScrollView, Dimensions } from 'react-native';
import { Button, TextInput, Text, Modal, Portal, PaperProvider} from 'react-native-paper';
import { inputReducer, State } from '../utils';
// import FormBox from '../utils/Forms/FormBox';
import DonationTable from '../utils/Forms/DonationTable';
import FilterButtons from '../utils/Forms/FilterButtons';
import { WebView } from "react-native-webview";
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';






const Forms = ({navigation}) => {

    console.log("Navigation prop in Forms:", navigation);

    const [isDonationHistory, setDonationHistory] = useState(true);

    const handleToggle = () => {
        setDonationHistory(!isDonationHistory);
    };

    const DonationHistory = () => (
        
        <View>
            <FilterButtons />
            <DonationTable />
        </View>
      );
      
      const PastTaxForms = ({ navigation }) => (
        

        <ScrollView>
            <View style={styles.containerForm}>
                <View style={styles.row}>
                    <FormBox year="2023" navigation={navigation}  />
                    <FormBox year="2022" navigation={navigation}  />
                </View>
                <View style={styles.row}>
                    <FormBox year="2021" navigation={navigation} />
                    <FormBox year="2020" navigation={navigation} />
                </View>
                <View style={styles.row}>
                    <FormBox year="2019" navigation={navigation}  />
                    <FormBox year="2018" navigation={navigation}  />
                </View>
                <View style={styles.row}>
                    <FormBox year="2017" navigation={navigation} />
                    <FormBox year="2016" navigation={navigation}  />
                </View>
            </View>
        </ScrollView>
      );


      //added 
      const handleDownload = () => {

        const source = require('../assets/faketaxform.pdf'); 
        return (
            <View style={styles.pdfcontainer}>
                <WebView
                    source={source}
                    style={styles.pdf}/>
            </View>
        )
      };

      const navigateToTurboTax = ({navigation}) => {
        navigation.navigate('TurboTax');
    };

    const FormBox = ({ year, navigation }) => {
        console.log("Navigation prop in FormBox:", navigation);
    return (
        <View style={styles.formContainer}>
        <Text style={styles.yearText}>{year}</Text>
        <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("TurboTax")}>

                <IconButton
                    icon="download"
                    iconColor="#599884"
                    size={30}
                    // onPress={navigation.navigate("TurboTax")}
                    />
            </TouchableOpacity>
            <TouchableOpacity>
                <IconButton
                        icon="square-edit-outline"
                        iconColor="#599884"
                        size={30}
                        onPress={() => handleDownload()}
                />
            </TouchableOpacity>
        </View>
        </View>
    );
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

                {isDonationHistory ? <DonationHistory /> : <PastTaxForms navigation={navigation} />}

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
      formContainer: {
        width: 150,
        height: 150,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,
      },
      yearText: {
        fontSize: 25,
        fontWeight: 'bold',
      },
      iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end', 
        position: 'absolute', 
        bottom: 0,
        // marginHorizontal: -50
      },
      pdfcontainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
      pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});

export default Forms; 