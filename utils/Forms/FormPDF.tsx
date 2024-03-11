import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Text } from 'react-native';
import { WebView } from "react-native-webview";

export default function FormPDF({navigation}) {
    const source = require('../../assets/faketaxform.pdf')
    return (
        <View style={styles.container}>
            <WebView
                source={source}
                style={styles.pdf}/>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate('BrowseMain')} 
            >
                <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    backButton: {
        marginBottom: 20,
    },
    backButtonText: {
        color: '#5A6F72',
        fontSize: 18,
    },
});

