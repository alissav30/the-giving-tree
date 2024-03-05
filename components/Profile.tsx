import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
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
import { LineChart } from "react-native-chart-kit"; 
import { ref, query, orderByChild, limitToLast, get, onValue } from "firebase/database";
import { database } from '../firebase.js'; 
import organizationsData from '../organizations.json';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';


interface Donation {
    orgName: string;
    amount: number; // Assuming amount is a string like "$25", adjust if your structure is different
    date: string; // Assuming date is a string, adjust if your structure is different
    recurring: string;
  }
  
  interface OrganizationData {
    count: number;
    totalAmount: number;
    lastDonation: string;
  }
  
  interface OrganizationSummary {
    name: string;
    count: number;
    totalAmount: number;
    lastDonation: string;
  }

  interface MonthlyTotal {
    month: string;
    total: number;
  }

  const calculateMonthlyTotals = (donations: Donation[], monthsBack = 12): MonthlyTotal[] => {
    const now = new Date();
    const monthlyTotals: MonthlyTotal[] = Array.from({ length: monthsBack }).map((_, i) => ({
      month: new Date(now.getFullYear(), now.getMonth() - i, 1).toISOString().substr(0, 7),
      total: 0,
    })).reverse();
  
    donations.forEach(donation => {
        if (!isNaN(donation.amount)) {
        const donationDate = new Date(donation.date);
        const index = donationDate.getMonth() - now.getMonth() + (donationDate.getFullYear() - now.getFullYear()) * 12;
        if (index >= 0 && index < monthsBack) {
            monthlyTotals[index].total += donation.amount; // Directly use donation.amount as it's already a number
            // Extend here to handle recurring payments as needed
        } else {
            console.error("Found NaN in donation amounts", donation);
          }      
      }
    });
  
    return monthlyTotals;
  };
  
  

  const calculateUpcomingPayments = (donations) => {
    // Assuming `donations` includes a `recurring` field with values like "Weekly", "Monthly", "Annually"
    const now = new Date();
    return donations.filter(donation => donation.recurring !== "No")
      .map(donation => {
        // Calculate next payment date based on `donation.date` and `donation.recurring`
        // This is a simplified placeholder logic
        const nextPaymentDate = new Date(donation.date); // Replace with actual calculation
        return { ...donation, nextPaymentDate };
      });
  };

  const calculateTopOrganizations = (donationsArray: Donation[]): OrganizationSummary[] => {
    console.log("donationsArray", donationsArray)
    console.log("is donations array an array", Array.isArray(donationsArray))
    const orgDonations: Record<string, OrganizationData> = donationsArray.reduce((acc, donation) => {
      const { orgName, date } = donation;
      if (acc[orgName]) {
        acc[orgName].count += 1;
        acc[orgName].totalAmount += donation.amount; // donation.amount is already a number here
        acc[orgName].lastDonation = acc[orgName].lastDonation > date ? acc[orgName].lastDonation : date;
      } else {
        acc[orgName] = {
          count: 1,
          totalAmount: donation.amount, // donation.amount is already a number
          lastDonation: date,
        };
      }
      return acc;
    }, {});
  
    const sortedOrgs = Object.entries(orgDonations)
      .map(([name, data]) => ({
        name,
        count: data.count,
        totalAmount: data.totalAmount,
        lastDonation: data.lastDonation,
      }))
      .sort((a, b) => {
        if (b.count !== a.count) {
          return b.count - a.count;
        } else if (b.totalAmount !== a.totalAmount) {
          return b.totalAmount - a.totalAmount;
        } else {
          // Explicitly convert dates to numbers for the subtraction operation
          return +new Date(b.lastDonation) - +new Date(a.lastDonation);
        }
      })
      .slice(0, 3); // Take top 3
    console.log("sortedOrgs", sortedOrgs)
  
    return sortedOrgs;
  };
  

  

const Profile = ({ navigation }) => {
  const [topOrganizations, setTopOrganizations] = useState([]);
  const [monthlyDonations, setMonthlyDonations] = useState([]);
  const [upcomingPayments, setUpcomingPayments] = useState([]);
  const [orgLogos, setOrgLogos] = useState<Record<string, string>>({});

  const navigateToSettingPage = () => {
    navigation.navigate('SettingMain');
  };


  useEffect(() => {
    const fetchAndUpdateData = async () => {
      try {
        const donationsSnapshot = await get(ref(database, 'donations'));
        if (donationsSnapshot.exists()) {
          console.log("gets into donations snapshot");
          const donationsData = donationsSnapshot.val();
          const donationsArray = donationsData && typeof donationsData === 'object'
            ? Object.keys(donationsData).map(key => ({
                ...donationsData[key],
              }))
            : [];
    
          // Process the donations data
          const topOrgs = calculateTopOrganizations(donationsArray);
          const monthlyTotals = calculateMonthlyTotals(donationsArray);
          const upcomingPaymentsData = calculateUpcomingPayments(donationsArray);
    
          // Update state with the processed data
          setTopOrganizations(topOrgs);
          setMonthlyDonations(monthlyTotals);
          setUpcomingPayments(upcomingPaymentsData);
  
          // Fetch logos for top organizations
          fetchLogosForTopOrganizations(topOrgs);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching or processing data: ", error);
      }
    };
  
    fetchAndUpdateData();
  }, []);
  
  const fetchLogosForTopOrganizations = async (topOrgs) => {
    const storage = getStorage();
    const logoPromises = topOrgs.map(organization => {
      const orgDetails = organizationsData.organizations[organization.name.replace(/\s+/g, '')]; // Adjust based on your key naming convention
      if (orgDetails && orgDetails.logo_url) {
        return getDownloadURL(storageRef(storage, orgDetails.logo_url))
          .then((logoUrl) => ({ name: organization.name, logoUrl }))
          .catch(() => ({ name: organization.name, logoUrl: 'fallback-logo-url' })); // Provide a fallback logo URL
      }
      return Promise.resolve({ name: organization.name, logoUrl: 'fallback-logo-url' });
    });
  
    Promise.all(logoPromises).then(results => {
      const logos = results.reduce((acc, { name, logoUrl }) => {
        acc[name] = logoUrl;
        return acc;
      }, {});
      setOrgLogos(logos); // Assuming you have a state [orgLogos, setOrgLogos] to hold the logos
    });
  };
  
  


  // Inside your Profile component, right before the return statement
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const labels = monthlyDonations.map(item => {
    const monthIndex = parseInt(item.month.substring(5), 10) - 1; // Converts "YYYY-MM" format to index
    return monthNames[monthIndex];
    }).reverse(); // Assuming the most recent month is last, reverse if necessary

    const dataValues = monthlyDonations.map(item => item.total).reverse(); // Ensure this matches the order of labels

  

  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.infoContainer}>
                <View style={styles.infoPfpBackground}></View>
                
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
            Your Favorite Organizations
          </Text>
          <View style={styles.topOrgsContainer}>
        <View style={styles.orgsContainer}>
            {topOrganizations.map((organization, index) => {
            // Directly use the URL from the orgLogos state. Ensure a fallback URL is set during the logo fetching process.
            const logoUrl = orgLogos[organization.name] || 'https://firebasestorage.googleapis.com/v0/b/thegivingtree-fa759.appspot.com/o/aim_logo.png?alt=media&token=617bd7b1-3175-40ce-ac9f-cb41fd049eda'; // Provide a valid URL for a default logo

            // Access organization details from your organizations data for additional info like the organization's name
            const orgDetails = organizationsData.organizations[organization.name.replace(/\s+/g, '')]; // Adapt key matching as needed
            //console.log("Organization Details: ", orgDetails);

            return (
                <Surface key={index} style={styles.orgBox} mode="flat">
                <Image
                    source={{ uri: logoUrl }}
                    style={styles.orgLogo}
                />
                {/* Display the organization's name. Fall back to a generic name if not found. */}
                <Text style={styles.orgName}>{orgDetails ? orgDetails.organization_name : 'Organization'}</Text>
                </Surface>
            );
            })}
        </View>
        </View>


        {/* Donations Graph Section */}
        <Text style={styles.headerText} variant="headlineMedium">
        Donation History
        </Text>
        {/*<LineChart
        data={{
            labels: labels,
            datasets: [
            {
                data: dataValues,
            },
            ],
        }}
        width={Dimensions.get("window").width - 16} // Adjust as needed
        height={220} // Adjust as needed
        yAxisLabel="$"
        yAxisSuffix="K" // Use "K" if your values are in thousands, otherwise adjust or remove
        yAxisInterval={1} // Adjust as needed
        chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // Adjust as needed
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
            borderRadius: 16,
            },
            propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
            },
        }}
        bezier
        style={{
            marginVertical: 8,
            borderRadius: 16,
        }}
        />*/}

          {/* Upcoming Payments Section */}
          <Text style={styles.headerText} variant="headlineMedium">Upcoming Payments</Text>
          <View style={styles.tableContainer}>
        {/*<ScrollView style={styles.tableCells}>
            <View>
            <DataTable>
                <DataTable.Header>
                <DataTable.Title style={styles.tableTitle}>Organization</DataTable.Title>
                <DataTable.Title style={styles.tableTitle}>Next Payment</DataTable.Title>
                <DataTable.Title style={styles.tableTitle}>Amount</DataTable.Title>
                </DataTable.Header>
                {upcomingPayments.map((payment, index) => (
                <DataTable.Row 
                    key={index} // Assuming each payment doesn't have a unique identifier; otherwise, use it here
                    style={{ backgroundColor: index % 2 === 0 ? '#E0F0E3' : 'white' }}
                >
                    <DataTable.Cell>{payment.orgName}</DataTable.Cell>
                    <DataTable.Cell>{payment.nextPaymentDate}</DataTable.Cell>
                    <DataTable.Cell numeric>${payment.amount}</DataTable.Cell>
                </DataTable.Row>
                ))}
            </DataTable>
            </View>
        </ScrollView>*/}
        </View>
        </ScrollView>
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
    padding: 10, // Adjust padding to ensure text isn't touching the borders

  },
  orgLogo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
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
