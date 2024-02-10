import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


const AccountSettings = () => {
  const [pushNotificationEnabled, setPushNotificationEnabled] = useState(true);

  const handleTogglePushNotification = () => {
    setPushNotificationEnabled(!pushNotificationEnabled);
    // [TODO] add logic to update the user's notification preferences in your app's state or backend
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Edit Profile pressed')}>
        <Text style={styles.menuText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Manage Payment Methods pressed')}>
        <Text style={styles.menuText}>Manage Payment Methods</Text>
      </TouchableOpacity>

      <View style={styles.menuItem}>
        <Text style={styles.menuText}>Push Notifications</Text>
        <Switch
          value={pushNotificationEnabled}
          onValueChange={handleTogglePushNotification}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  menuText: {
    fontSize: 18,
  },
});

export default AccountSettings;
