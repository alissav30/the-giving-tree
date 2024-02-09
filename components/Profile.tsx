import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Button, TextInput, Text, Modal, Portal, PaperProvider } from 'react-native-paper';
import { inputReducer, State } from '../utils';

const Profile = () => {
    return (
        <PaperProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.topOrgsContainer}>
                    <Text style={styles.headerText} variant="displaySmall">Top Organizations</Text>
                </View>
            </SafeAreaView>
        </PaperProvider>
    )
};

const styles = StyleSheet.create ({
    container: {
        flex: 1, 
        alignItems: 'center',
    }, 
    topOrgsContainer: {
        alignItems: 'center', 
        justifyContent: 'center'
    }, 
    headerText: {
        color: '#185A37'
    }
});

export default Profile; 