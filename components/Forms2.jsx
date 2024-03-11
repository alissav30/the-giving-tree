import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, StatusBar, ScrollView } from 'react-native';
import { Button, TextInput, Text, Modal, Portal, PaperProvider} from 'react-native-paper';
import { inputReducer, State } from '../utils';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import DonationTable from '../utils/Forms/DonationTable';
import FilterButtons from '../utils/Forms/FilterButtons';

const Forms2 = ({ navigation }) => {

    const [isDonationHistory, setDonationHistory] = useState(true);

    const handleToggle = () => {
        setDonationHistory(!isDonationHistory);
    };

 

    const navigateToTurboTax = () => {
        navigation.navigate('TurboTax');
    };

    const navigateToTaxPDF = () => {
        navigation.navigate('FormPDF');
    };

   

    const DonationHistory = ( ) => (
        <View>
            <DonationTable />
        </View>
      );



      const FormBox = ( year ) => { /* Did not work, so had to paste multiple boxes :(*/ 
        const navigateToTurboTax = () => {
            navigation.navigate('TurboTax');
        };

        const navigateToTaxPDF = () => {
            navigation.navigate('FormPDF');
        };
        <View style={styles.formBoxcontainer}>
            <Text style={styles.formBoxyearText}>{year}</Text>
            <View style={styles.formBoxiconContainer}>
            <TouchableOpacity>
                <IconButton
                    icon="download"
                    iconColor="#599884"
                    size={30}
                    onPress={() => navigateToTurboTax}
                    />
            </TouchableOpacity>
            <TouchableOpacity>
                <IconButton
                        icon="square-edit-outline"
                        iconColor="#599884"
                        size={30}
                        onPress={() => navigateToTurboTax}
                />
            </TouchableOpacity>
            </View>
        </View>
      };

      const PastTaxForms = () => (
        <ScrollView>
            <View style={styles.containerForm}>
                <View style={styles.row}>
                <View style={styles.row}>
                <View style={styles.formBoxcontainer}>
                    <Text style={styles.formBoxyearText}>{2023}</Text>
                    <View style={styles.formBoxiconContainer}>
                        <TouchableOpacity onPress={navigateToTaxPDF}>
                            <IconButton
                                icon="download"
                                iconColor="#599884"
                                size={30}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToTurboTax}>
                            <IconButton
                                    icon="square-edit-outline"
                                    iconColor="#599884"
                                    size={30}
                            />
                        </TouchableOpacity>
                    </View> 
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.formBoxcontainer}>
                    <Text style={styles.formBoxyearText}>{2022}</Text>
                    <View style={styles.formBoxiconContainer}>
                        <TouchableOpacity onPress={navigateToTaxPDF}>
                            <IconButton
                                icon="download"
                                iconColor="#599884"
                                size={30}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToTurboTax}>
                            <IconButton
                                    icon="square-edit-outline"
                                    iconColor="#599884"
                                    size={30}
                            />
                        </TouchableOpacity>
                    </View> 
                </View>
            </View>
                </View>
                <View style={styles.row}>
                <View style={styles.row}>
                <View style={styles.formBoxcontainer}>
                    <Text style={styles.formBoxyearText}>{2021}</Text>
                    <View style={styles.formBoxiconContainer}>
                        <TouchableOpacity onPress={navigateToTaxPDF}>
                            <IconButton
                                icon="download"
                                iconColor="#599884"
                                size={30}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToTurboTax}>
                            <IconButton
                                    icon="square-edit-outline"
                                    iconColor="#599884"
                                    size={30}
                            />
                        </TouchableOpacity>
                    </View> 
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.formBoxcontainer}>
                    <Text style={styles.formBoxyearText}>{2020}</Text>
                    <View style={styles.formBoxiconContainer}>
                        <TouchableOpacity onPress={navigateToTaxPDF}>
                            <IconButton
                                icon="download"
                                iconColor="#599884"
                                size={30}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToTurboTax}>
                            <IconButton
                                    icon="square-edit-outline"
                                    iconColor="#599884"
                                    size={30}
                            />
                        </TouchableOpacity>
                    </View> 
                </View>
            </View>

                </View>
                <View style={styles.row}>
                <View style={styles.row}>
                <View style={styles.formBoxcontainer}>
                    <Text style={styles.formBoxyearText}>{2019}</Text>
                    <View style={styles.formBoxiconContainer}>
                        <TouchableOpacity onPress={navigateToTaxPDF}>
                            <IconButton
                                icon="download"
                                iconColor="#599884"
                                size={30}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToTurboTax}>
                            <IconButton
                                    icon="square-edit-outline"
                                    iconColor="#599884"
                                    size={30}
                            />
                        </TouchableOpacity>
                    </View> 
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.formBoxcontainer}>
                    <Text style={styles.formBoxyearText}>{2018}</Text>
                    <View style={styles.formBoxiconContainer}>
                        <TouchableOpacity onPress={navigateToTaxPDF}>
                            <IconButton
                                icon="download"
                                iconColor="#599884"
                                size={30}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToTurboTax}>
                            <IconButton
                                    icon="square-edit-outline"
                                    iconColor="#599884"
                                    size={30}
                            />
                        </TouchableOpacity>
                    </View> 
                </View>
            </View>
                </View>
                <View style={styles.row}>
                <View style={styles.row}>
                <View style={styles.formBoxcontainer}>
                    <Text style={styles.formBoxyearText}>{2017}</Text>
                    <View style={styles.formBoxiconContainer}>
                        <TouchableOpacity onPress={navigateToTaxPDF}>
                            <IconButton
                                icon="download"
                                iconColor="#599884"
                                size={30}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToTurboTax}>
                            <IconButton
                                    icon="square-edit-outline"
                                    iconColor="#599884"
                                    size={30}
                            />
                        </TouchableOpacity>
                    </View> 
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.formBoxcontainer}>
                    <Text style={styles.formBoxyearText}>{2016}</Text>
                    <View style={styles.formBoxiconContainer}>
                        <TouchableOpacity onPress={navigateToTaxPDF}>
                            <IconButton
                                icon="download"
                                iconColor="#599884"
                                size={30}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToTurboTax}>
                            <IconButton
                                    icon="square-edit-outline"
                                    iconColor="#599884"
                                    size={30}
                            />
                        </TouchableOpacity>
                    </View> 
                </View>
            </View>
                </View>
            </View>
        </ScrollView>
      );

   

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
      
    );
};

const styles = StyleSheet.create({
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
     
      formBoxcontainer: {
        width: 150,
        height: 150,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      formBoxyearText: {
        fontSize: 25,
        fontWeight: 'bold',
      },
      formBoxiconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end', 
        position: 'absolute', 
        bottom: 0,
        // marginHorizontal: -50
    
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

export default Forms2;
