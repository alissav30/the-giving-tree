// SquareTextBox.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import TurboTax from './TurboTax';
import { WebView } from "react-native-webview";

import { StackNavigationProp } from '@react-navigation/stack';
import FormStackNavigator from '../../components/FormStackNavigator';


// type FormBoxScreenNavigationProp = StackNavigationProp<FormStackNavigator, 'FormMain'>;



const FormBox = ({ year, navigation }) => {
    // const navigation = useNavigation();

    const handleDownload = () => {
        const source = require('../../assets/faketaxform.pdf'); 
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
    


  return (
    <View style={styles.container}>
      <Text style={styles.yearText}>{year}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("TurbTox")}>
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

const styles = StyleSheet.create({
  container: {
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

export default FormBox;
