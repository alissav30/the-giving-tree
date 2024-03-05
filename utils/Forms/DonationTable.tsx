import React, { useState } from 'react';
import { View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native'; // Import Button from react-native
import { DataTable } from 'react-native-paper';
import { database } from '../../firebase.js'; // Adjust this path as necessary
import { ref, onValue } from "firebase/database";

const DonationTable = () => {
    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState([6, 5, 2]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const [donations, setDonations] = React.useState([]);
    const [showRecurring, setShowRecurring] = React.useState(false); // New state for the filter


    React.useEffect(() => {
        const donationsRef = ref(database, 'donations');
        onValue(donationsRef, (snapshot) => {
            const data = snapshot.val();
            const donationList = Object.keys(data).map((key) => ({
                key: key,
                date: data[key].date,
                nonprofit: data[key].orgName,
                recurring: data[key].recurring,
                amount: data[key].donateAmt,
            })).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort donations from most recent to least recent

            setDonations(donationList);
        });
    }, []);

    const handleShowAll = () => {
        setShowRecurring(false);
      };
    
      const handleShowRecurring = () => {
        setShowRecurring(true);
      };

    // Filter the donations based on the showRecurring state
    const filteredDonations = showRecurring
        ? donations.filter((donation) => donation.recurring === 'No')
        : donations;
    
    console.log(filteredDonations);
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, filteredDonations.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage, showRecurring]);

    const [activeButton, setActiveButton] = useState(null);
    const getButtonStyle = (buttonNumber) => {
        const isActive = buttonNumber === activeButton;

        return {
            backgroundColor: isActive ? '#949DA9' : 'white', // Active or default background color
            color: isActive ? 'white' : 'black', // Active or default text color
            borderColor: '#949DA9',
            
        };
    };

    return (
        <View>
            {/* <TouchableOpacity onPress={() => setShowRecurring(!showRecurring)}>
                <Text>{showRecurring ? 'Show All' : 'Show Recurring'}</Text>

            </TouchableOpacity> */}

            <View style={styles.container}>
                <TouchableOpacity onPress={handleShowAll}>
                    <Text>Show All</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleShowRecurring}>
                    <Text>Not Recurring</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleShowRecurring}>
                    <Text>Recurring</Text>
                </TouchableOpacity>
            </View>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Date</DataTable.Title>
                    <DataTable.Title>Nonprofit</DataTable.Title>
                    <DataTable.Title>Recurring</DataTable.Title>
                    <DataTable.Title numeric>Amount</DataTable.Title>
                </DataTable.Header>

                {filteredDonations.slice(from, to).map((donation) => (
                    <DataTable.Row key={donation.key}>
                        <DataTable.Cell>{donation.date}</DataTable.Cell>
                        <DataTable.Cell>{donation.nonprofit}</DataTable.Cell>
                        <DataTable.Cell>{donation.recurring}</DataTable.Cell>
                        <DataTable.Cell numeric>${donation.amount}</DataTable.Cell>
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(donations.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${donations.length}`}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    showFastPaginationControls
                    selectPageDropdownLabel={'Rows per page'}
                />
            </DataTable>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      padding: 20, 
    },
});

export default DonationTable;


