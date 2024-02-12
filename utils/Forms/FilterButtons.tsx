import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const FilterButtons = () => {

    const [activeButton, setActiveButton] = useState(null);
    const handleButtonPress = (buttonNumber) => {
        setActiveButton(buttonNumber);
    };

    const getButtonStyle = (buttonNumber) => {
        const isActive = buttonNumber === activeButton;

        return {
            backgroundColor: isActive ? '#949DA9' : 'white', // Active or default background color
            color: isActive ? 'white' : 'black', // Active or default text color
            borderColor: '#949DA9',
            
        };
    };

    const SearchBar = () => {
        const [searchQuery, setSearchQuery] = React.useState('');
      
        return (
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{backgroundColor: '#FFFFFF'}}

          />
        );
      };


    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.button, getButtonStyle(1)]}
                    onPress={() => handleButtonPress(1)}
                >
                    <Text style={{ color: getButtonStyle(1).color, textAlign: 'center', fontSize: 12 }}>Past 6 Months</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, getButtonStyle(2)]}
                    onPress={() => handleButtonPress(2)}
                >
                    <Text style={{ color: getButtonStyle(2).color, textAlign: 'center', fontSize: 12 }}>Past Year</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, getButtonStyle(3)]}
                    onPress={() => handleButtonPress(3)}
                >
                    <Text style={{ color: getButtonStyle(3).color, textAlign: 'center', fontSize: 12 }}>Recurring</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.searchContainer}>
                    <SearchBar />
                </View>
        </View>
      
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 20, 
  },
  button: {
    // backgroundColor: 'white', 
    padding: 10, 
    borderRadius: 50, 
    borderWidth: 1,
    borderColor: '#949DA9', 
    width: "30%"

  },
  buttonText: {
    color: '#949DA9', 
    textAlign: 'center', 
  },
  searchContainer: {
    padding: 10
  }
});

export default FilterButtons;
