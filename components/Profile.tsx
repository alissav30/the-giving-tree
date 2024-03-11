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
    donateAmt: number; // Assuming amount is a string like "$25", adjust if your structure is different
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
  }

  interface MonthlyTotal {
    month: string;
    total: number;
  }

  const calculateMonthlyTotals = (donations, monthsBack = 6) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normalize now to start of today to avoid hour-based discrepancies
    const monthlyTotals = Array.from({ length: monthsBack }).map((_, i) => ({
      month: new Date(now.getFullYear(), now.getMonth() - i, 1).toISOString().substr(0, 7),
      total: 0,
    })); // Keep chronological order
  
    donations.forEach(donation => {
      if (!isNaN(donation.donateAmt)) {
        const donationDate = new Date(donation.date);
        const endOfThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the current month
  
        // Determine the start date for calculations (6 months ago or the donation date, whichever is later)
        const startDate = new Date(now.getFullYear(), now.getMonth() - monthsBack + 1, 1);
        const effectiveStartDate = startDate > donationDate ? startDate : donationDate;
  
        // Calculate occurrences for recurring donations
        if (donation.recurring !== 'No') {
          const occurrences = calculateOccurrences(donation.recurring, effectiveStartDate, endOfThisMonth, donationDate);
          occurrences.forEach(occurrence => {
            const occurrenceMonth = occurrence.toISOString().substr(0, 7);
            const index = monthlyTotals.findIndex(month => month.month === occurrenceMonth);
            if (index !== -1) {
              monthlyTotals[index].total += donation.donateAmt;
            }
          });
        } else {
          // Handle one-time donations
          const donationMonth = donationDate.toISOString().substr(0, 7);
          const index = monthlyTotals.findIndex(month => month.month === donationMonth);
          if (index !== -1) {
            monthlyTotals[index].total += donation.donateAmt;
          }
        }
      } else {
        console.error("Found NaN in donation amounts", donation);
      }
    });
  
    return monthlyTotals;
  };
  
  // Helper function to calculate occurrences of recurring donations
  const calculateOccurrences = (recurringType, startDate, endDate, originalDate) => {
    let occurrences = [];
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      if (recurringType === 'Weekly') {
        const weeksSinceDonation = Math.floor((currentDate - originalDate) / (7 * 24 * 60 * 60 * 1000));
        if (weeksSinceDonation >= 0) {
          occurrences.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 7);
      } else if (recurringType === 'Monthly') {
        const monthsSinceDonation = (currentDate.getFullYear() - originalDate.getFullYear()) * 12 + currentDate.getMonth() - originalDate.getMonth();
        if (monthsSinceDonation >= 0) {
          occurrences.push(new Date(currentDate));
        }
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else if (recurringType === 'Annually') {
        const yearsSinceDonation = currentDate.getFullYear() - originalDate.getFullYear();
        if (yearsSinceDonation >= 0 && currentDate.getMonth() === originalDate.getMonth()) {
          occurrences.push(new Date(currentDate));
        }
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      }
    }
  
    return occurrences;
  };
  
  
  const calculateUpcomingPayments = (donations) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normalize the current date to the start of the day
  
    const oneMonthFromNow = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    console.log("donation in calc upcoming payments", donations);
  
    return donations
      .filter(donation => donation.recurring !== "No" && new Date(donation.date) <= oneMonthFromNow)
      .map(donation => {
        // Calculate the next payment date based on the recurring type
        let nextPaymentDate = new Date(donation.date);
        while (nextPaymentDate < now) {
          if (donation.recurring === 'Weekly') {
            nextPaymentDate.setDate(nextPaymentDate.getDate() + 7);
          } else if (donation.recurring === 'Monthly') {
            nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
          } else if (donation.recurring === 'Annually') {
            nextPaymentDate.setFullYear(nextPaymentDate.getFullYear() + 1);
          }
        }
  
        // Only include if the next payment date is within the next month
        if (nextPaymentDate <= oneMonthFromNow) {
          return { ...donation, nextPaymentDate: nextPaymentDate.toLocaleDateString() };
        }
  
        return null;
      })
      .filter(payment => payment !== null) // Filter out any nulls from the mapping step
      .sort((a, b) => {
        const [monthA, dayA, yearA] = a.nextPaymentDate.split('/').map(num => parseInt(num, 10));
        const [monthB, dayB, yearB] = b.nextPaymentDate.split('/').map(num => parseInt(num, 10));
        
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
      
        return dateA - dateB;
      })
      .map(payment => ({
        ...payment,
        amount: `${payment.donateAmt}`, // Format amount as a string with a dollar sign
      }));
  };
   

  const calculateTopOrganizations = (donationsArray: Donation[]): OrganizationSummary[] => {
    console.log("donationsArray", donationsArray);
    
    // Aggregate donation counts per organization
    const orgDonations: Record<string, OrganizationData> = donationsArray.reduce((acc, donation) => {
      const { orgName } = donation;
      if (acc[orgName]) {
        acc[orgName].count += 1;
      } else {
        acc[orgName] = { count: 1 };
      }
      return acc;
    }, {});
  
    // Sort organizations by the count of donations, take top 3
    console.log("orgDonations", orgDonations);
    const sortedOrgs = Object.entries(orgDonations)
      .map(([name, data]) => ({
        name,
        count: data.count,
      }))
      .sort((a, b) => b.count - a.count) // Sort by count of donations only
      .slice(0, 3); // Take top 3
    
      console.log("sortedOrgs", sortedOrgs)
  
    return sortedOrgs;
  };
  

  

const Profile = ({ navigation }) => {
  const [topOrganizations, setTopOrganizations] = useState([]);
  const [monthlyDonations, setMonthlyDonations] = useState([]);
  const [upcomingPayments, setUpcomingPayments] = useState([]);
  const [orgLogos, setOrgLogos] = useState<Record<string, string>>({});
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust number of items per page as needed

  const navigateToSettingPage = () => {
    navigation.navigate('SettingMain');
  };


  useEffect(() => {
    const fetchAndUpdateData = async () => {
      try {
        const donationsSnapshot = await get(ref(database, 'donations'));
        if (donationsSnapshot.exists()) {
        //  console.log("gets into donations snapshot");
          const donationsData = donationsSnapshot.val();
          const donationsArray = donationsData && typeof donationsData === 'object'
            ? Object.keys(donationsData).map(key => ({
                ...donationsData[key],
              }))
            : [];
    
          // Process the donations data
          const topOrgs = calculateTopOrganizations(donationsArray);
          const monthlyTotals = calculateMonthlyTotals(donationsArray);
          console.log("monthlyTotals", monthlyTotals)
          const upcomingPaymentsData = calculateUpcomingPayments(donationsArray);
          console.log("upcomingPaymentsData", upcomingPaymentsData)

          console.log("monthlyTotals", monthlyTotals)
    
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
  
  const numberOfPages = Math.ceil(upcomingPayments.length / itemsPerPage);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, upcomingPayments.length);
  const visiblePayments = upcomingPayments.slice(from, to);
  


  // Inside your Profile component, right before the return statement
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const labels = monthlyDonations.map(item => {
    const monthIndex = parseInt(item.month.substring(5), 10) - 1; // Converts "YYYY-MM" format to index
    return monthNames[monthIndex];
    }).reverse(); 

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
                <Text style={styles.orgText}>{orgDetails ? orgDetails.organization_name : 'Organization'}</Text>
                </Surface>
            );
            })}
        </View>
        </View>

        {/* Donations Graph Section */}
        <Text style={styles.headerText} variant="headlineMedium">
        Donation History
        </Text>
        <View style={styles.chartContainer}>
        <LineChart
            data={{
                labels: labels,
                datasets: [{ data: dataValues }],
            }}
            width={Dimensions.get("window").width - 40} // Reduced width for fitting and centering
            height={220}
            yAxisLabel="$"
            yAxisSuffix="K"
            yAxisInterval={1}
            chartConfig={{
                backgroundColor: "#C2C2C7",
                backgroundGradientFrom: "#5A6F72",
                backgroundGradientTo: "#599884",
                decimalPlaces: 0,
                color: () => "#C2C2C7",
                labelColor: () => "#C2C2C7",
                style: {
                borderRadius: 16,
                //paddingLeft: 16, // Added to provide padding for the Y-axis labels
                },
                propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#C2C2C7",
                },
                fromZero: true,
            }}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16,
                alignSelf: 'center',
            }}
            />
        </View>
          {/* Upcoming Payments Section */}
          {/* Upcoming Payments Section with Pagination */}
            <Text style={styles.headerText} variant="headlineMedium">Upcoming Payments</Text>
            <DataTable>
            <DataTable.Header>
                <DataTable.Title>Organization</DataTable.Title>
                <DataTable.Title>Next Payment</DataTable.Title>
                <DataTable.Title numeric>Amount</DataTable.Title>
            </DataTable.Header>

            {visiblePayments.map((payment, index) => (
                <DataTable.Row key={index}>
                <DataTable.Cell>{payment.orgName}</DataTable.Cell>
                <DataTable.Cell>{payment.nextPaymentDate}</DataTable.Cell>
                <DataTable.Cell numeric>${payment.amount}</DataTable.Cell>
                </DataTable.Row>
            ))}

            <DataTable.Pagination
                page={page}
                numberOfPages={numberOfPages}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${upcomingPayments.length}`}
                showFastPaginationControls
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                selectPageDropdownLabel="Rows per page"
            />
            </DataTable>

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
    backgroundColor: '#599884',
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
    width: 115,
    height: 125,
    borderWidth: 1,
    borderColor: "#DAD7D7",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 7,
    borderRadius: 20,
    paddingTop: 10, // Add padding at the top
  },
  orgLogo: {
    width: 80, // Slightly reduce width for better fit
    height: 60, // Adjust height as needed
    resizeMode: 'contain',
    marginBottom: 5, // Ensure some space between the logo and the text below
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
  },
  orgText: {
    // Assuming this is your style for the text in each organization box
    textAlign: 'center', // Center text horizontally
  },
  chartContainer: {
    borderRadius: 16,
    overflow: 'hidden', // Ensures the chart respects the borderRadius property
  },
});

export default Profile;
