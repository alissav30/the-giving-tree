import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Button, TextInput, Text, Modal, Portal, PaperProvider, App } from 'react-native-paper';
import { inputReducer, State } from '../utils';
import SettingAppBar from '../utils/Settings/SettingAppBar';
import UserProfile from '../utils/Settings/UserProfile';
import AccountSettings from '../utils/Settings/AccountSettings';
import More from '../utils/Settings/More';


const Setting = ({navigation}) => {
    //define user 
    const user = {
        // profileImage: require('../assets/ocean_alliance_logo.png'), 
        name: 'Nancy Hoang',
    };


    return (
        <View style={styles.container}>
            <SettingAppBar />
            <SafeAreaView style={styles.container}>
                <PaperProvider>
                    <View style={styles.menuContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                        {/* Profile picture and name */}
                        <UserProfile profileImage={user.profileImage} name={user.name} />
                        <View style={styles.border}/>
                        <Text style={styles.lightMenuText}>Account Settings</Text>
                        <AccountSettings />
                        <Text style={styles.lightMenuText}>More</Text>
                        <More />
                    </View>
                    <View style={styles.greenSection}></View>
                </PaperProvider>
            </SafeAreaView>
        </View>
    )
};

const styles = StyleSheet.create ({
    container: {
        flex: 1, 
       // alignItems: 'center',
        backgroundColor: '#F5F5F5'
    }, 
    greenSection: {
        width: '100%',
        height: '40%',
        backgroundColor: '#5A6F72',
        
    }, 
    menuContainer: {
        position: 'absolute',
        top: '5%', 
        left: '10%',
        width: '80%',
        height: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 18,

        //shadow 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,  
        elevation: 5, //for android 

       // alignItems: 'center',
        zIndex: 1, 
    },
    menuText: {
        color: '#333',
        fontSize: 18,
    },
    lightMenuText: {
        paddingTop: '5%',
        paddingBottom: '5%',
        color: '#ADADAD',
        fontSize: 18,
        textAlign: 'left'
    },
    border: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '100%',
        paddingTop: '10%'
    },
    headerText: {
        color: '#F9FFFD',
        textAlign: 'center'
    },
    backButton: {
        marginBottom: 0,
        left: -40,
        top: -130,
        position: 'relative'
    },
    backButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default Setting; 