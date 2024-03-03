import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import {
  Button,
  TextInput,
  Text,
  DataTable, 
  Modal,
  Portal,
  PaperProvider,
  Surface,
  Avatar, 
  Divider,
} from "react-native-paper";

const Profile = ({ navigation }) => {

  const navigateToSettingPage = () => {
    // Your click event handling logic goes here
    navigation.navigate('SettingMain');
  };

  const [items, setItems] = React.useState([
    {
      key: 1,
      name: 'Red Cross',
      date: '2/14/2024',
      amount: '$25',
    },
    {
      key: 2,
      name: 'Ocean Alliance',
      date: '2/14/2024',
      amount: '$15',
    },
    {
      key: 3,
      name: 'Ocean Alliance',
      date: '2/28/2024',
      amount: '$15',
    },
    {
      key: 4,
      name: 'Red Cross',
      date: '3/14/2024',
      amount: '$25',
    },
    {
      key: 5,
      name: 'Ocean Alliance',
      date: '3/14/2024',
      amount: '$15',
    },
    {
      key: 6,
      name: 'Ocean Alliance',
      date: '3/28/2024',
      amount: '$15',
    },
    {
      key: 7,
      name: 'Red Cross',
      date: '3/14/2024',
      amount: '$25',
    },
   ]);

  return (
    <PaperProvider>
    <SafeAreaView>
        <View style={styles.infoContainer}>
          <View style={styles.infoPfpBackground}></View>
          
              {/** Settings Icon */}
              <View style={styles.containerSetting}>
                <TouchableOpacity onPress={navigateToSettingPage}>
                <Image
                  style={styles.imageSetting}
                  source={require('../assets/gear.png')} // Replace with the actual path to your image
               
                />
                </TouchableOpacity>
              </View>

          <Avatar.Image
            style={styles.infoPfp}
            size={80}
            // source={require("../assets/default_pfp.png")}
            source={require("../assets/profile.jpg")}

          />
        </View>
        <Text style={styles.infoUsername} variant="titleMedium">
          Nancy Hoang
        </Text>
        <Text style={styles.infoCaption} variant="titleSmall">
          Member since 2023
        </Text>
        <Text style={styles.headerText} variant="headlineMedium">
          Top Organizations
        </Text>
      <View style={styles.topOrgsContainer}>
        <View style={styles.orgsContainer}>
          <Surface style={styles.orgBox} mode="flat">
            <Image
              source={require("../assets/ocean_alliance_logo.png")}
              style={styles.orgLogo}
            />
          </Surface>
          <Surface style={styles.orgBox} mode="flat">
            <Image
              source={require("../assets/ocean_alliance_logo.png")}
              style={styles.orgLogo}
            />
          </Surface>
          <Surface style={styles.orgBox} mode="flat">
            <Image
              source={require("../assets/ocean_alliance_logo.png")}
              style={styles.orgLogo}
            />
          </Surface>
        </View>
      </View>
      <Divider style={styles.divider} />
      <Text style={styles.headerText} variant="headlineMedium">Upcoming Payments</Text>
      <View style={styles.tableContainer}>
        <ScrollView style={styles.tableCells}>
          <View>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={styles.tableTitle}>Organization</DataTable.Title>
                <DataTable.Title style={styles.tableTitle}>Next Payment</DataTable.Title>
                <DataTable.Title style={styles.tableTitle}>Amount</DataTable.Title>
              </DataTable.Header>
              {items.map((item, index) => (
                <DataTable.Row 
                key={item.key}
                style={{ backgroundColor: index % 2 === 0 ? '#E0F0E3' : 'white' }}
                >
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.date}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.amount}</DataTable.Cell>
                </DataTable.Row>
                
          ))}
            </DataTable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    width: '100%', 
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column', 
  },
  infoPfpBackground: {
    width: '100%', 
    height: '100%',
    backgroundColor: '#E0F0E3',
  },
  infoPfp: {
    backgroundColor: 'white',
    bottom: 40,
    borderColor: 'black',
    height: 95,
    width: 95,
    borderRadius: 200,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  infoTextContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  infoUsername: {
    color: "#185A37",
    fontWeight: 'bold', 
    margin: 10,
    textAlign: 'center',
  }, 
  infoCaption: {
    color: "#185A37",
    bottom: 10,
    textAlign: 'center',
  },
  topOrgsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#185A37",
    margin: 8,
    marginTop: 0,
    textAlign: 'left',
    marginLeft: 20,
  },
  orgsContainer: {
    flexDirection: "row",
  },
  orgBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#DAD7D7",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 20,

  },
  orgLogo: {
    width: 60,
    height: 60,
  },
  tableTitle: {
    justifyContent: 'flex-end',
    width: '100%',
  },
  tableCells : {
    maxHeight: 200,
    width: '100%',
  }, 
  divider: {
    width: '100%',
    margin: 20,
  },
  containerSetting: {
    position: 'absolute', 
    top: 20,
    right: 20

  },
  imageSetting: {
    width: 40,
    height: 40,
    
  }
});

export default Profile;
