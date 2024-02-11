import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserProfile = ({ profileImage, name }) => {
  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: profileImage }} style={styles.profileImage} /> */}
      <Image source={require('../../assets/profile.jpg')} style={styles.profileImage}/>
      <Text style={styles.name}>{name}</Text>
    </View>
    

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 50, 
    marginRight: 25,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#599884'
  }
});

export default UserProfile;
