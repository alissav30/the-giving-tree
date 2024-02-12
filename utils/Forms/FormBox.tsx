// SquareTextBox.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const FormBox = ({ year }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.yearText}>{year}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
            <IconButton
                icon="download"
                iconColor="#599884"
                size={30}
                onPress={() => console.log('Pressed')}
            />
        </TouchableOpacity>
        <TouchableOpacity>
            <IconButton
                    icon="square-edit-outline"
                    iconColor="#599884"
                    size={30}
                    onPress={() => console.log('Pressed')}
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
});

export default FormBox;
