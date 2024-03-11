import React, { useRef } from 'react';
import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';
import { WebView } from "react-native-webview";

export default function OrgWebView({ route, navigation }) {  
    const link = route.params.link;

    const webViewRef = useRef(null);

    const goBack = () => {
        if (webViewRef.current) {
            webViewRef.current.goBack();
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: link }}
                // Add a ref to the WebView to access its methods
                ref={(ref) => (this.webview = ref)}
            />
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()} 
            >
                <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
        
            // <WebView
            //     source={{uri: 'https://myturbotax.intuit.com'}}/>

       
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    backButton: {
        marginBottom: 20,
        alignSelf: 'center',
        justifyContent: "center"
    },
    backButtonText: {
        color: '#5A6F72',
        fontSize: 18,
        alignContent: "center"

    },
});