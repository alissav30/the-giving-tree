import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, Text } from 'react-native';
import { WebView } from "react-native-webview";

export default function FormPDF({navigation}) {
    const source = {
        uri: 'https://firebasestorage.googleapis.com/v0/b/thegivingtree-fa759.appspot.com/o/faketaxform.pdf?alt=media&token=311e2d80-cf7c-4078-80f7-75cbea3c6aa1'
    };
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

