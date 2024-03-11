import React, { useState } from 'react';
import { View, Button, TouchableOpacity, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'; // Import Button from react-native
import { DataTable, Searchbar } from 'react-native-paper';
import { database } from '../../firebase.js'; // Adjust this path as necessary
import { ref, onValue } from "firebase/database";


const DonationTable = () => {
    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState([6, 5, 2]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const [donations, setDonations] = React.useState([]);
    const [showRecurring, setShowRecurring] = React.useState(false); // New state for the filter
    const [NotRecurring, setNotRecurring] = React.useState(false); // New state for the filter
    const [activeButton, setActiveButton] = useState(null);
    const [searchQuery, setSearchQuery] = React.useState('');




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

    // const handleShowAll = (buttonNumber) => {
    //     setShowRecurring(false);
    //     setActiveButton(buttonNumber);

    //   };
    
    //   const handleNotRecurring = (buttonNumber) => {
    //     setShowRecurring(true);
    //     setActiveButton(buttonNumber);

    //   };

    //   const handleShowRecurring = (buttonNumber) => {
    //     setShowRecurring(true);
    //     setActiveButton(buttonNumber);

    //   };

    // Filter the donations based on the showRecurring state
    // const filteredDonations = showRecurring
    //     ? donations.filter((donation) => donation.recurring === 'No')
    //     : donations;
    
    

 

    const getButtonStyle = (buttonNumber) => {
        const isActive = buttonNumber === activeButton;

        return {
            backgroundColor: isActive ? '#949DA9' : 'white', // Active or default background color
            color: isActive ? 'white' : 'black', // Active or default text color
            borderColor: '#949DA9',
            
        };
    };

    const [filterType, setFilterType] = React.useState('all'); // New state for the filter type

    const handleShowAll = (buttonNumber) => {
        setFilterType('all');
        setActiveButton(buttonNumber);
    };

    const handleNotRecurring = (buttonNumber) => {
        setFilterType('notRecurring');
        setActiveButton(buttonNumber);
    };

    const handleRecurring = (buttonNumber) => {
        setFilterType('recurring');
        setActiveButton(buttonNumber);
    };

    // Filter the donations based on the filterType state
    const filteredDonations = donations.filter((donation) => {
        const nonprofitName = donation.nonprofit.toLowerCase(); // Convert to lowercase for case-insensitive search

        // if (filterType === 'notRecurring') {
        //     return donation.recurring === 'No';
        // } else if (filterType === 'recurring') {
        //     return donation.recurring !== 'No';
        // }
        // // 'all' filter or default case
        // return true;

        if (nonprofitName.includes(searchQuery.toLowerCase()) || searchQuery === '') {
            if (filterType === 'notRecurring') {
                return donation.recurring === 'No';
            } else if (filterType === 'recurring') {
                return donation.recurring !== 'No';
            } else {
                // Handle other filter types or no filter
                return true;
            }
        } else {
            return false; // Nonprofit name doesn't match the search query
        }
    });

    console.log(filteredDonations);
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, filteredDonations.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage, showRecurring]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        // Add any additional logic you need for search
    };
    const handleFocus = () => {
        // Prevent the keyboard from dismissing on focus
        // You can add more logic here if needed
      };
    
    const SearchBar = () => {
      
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Searchbar
            placeholder="Search"
            onChangeText={handleSearch}
            onFocus={handleFocus}
            value={searchQuery}
            style={{backgroundColor: '#FFFFFF'}}
          />
          </TouchableWithoutFeedback>

        );
      };


    return (
        <View>
            {/* <TouchableOpacity onPress={() => setShowRecurring(!showRecurring)}>
                <Text>{showRecurring ? 'Show All' : 'Show Recurring'}</Text>

            </TouchableOpacity> */}

            <View style={styles.container}>
                <TouchableOpacity 
                    style={[styles.button, getButtonStyle(1)]}
                    onPress={() => handleShowAll(1)}>
                    <Text style={{ color: getButtonStyle(1).color, textAlign: 'center', fontSize: 12 }}>Show All</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, getButtonStyle(2)]}
                    onPress={() => handleNotRecurring(2)}>
                    <Text style={{ color: getButtonStyle(2).color, textAlign: 'center', fontSize: 12 }}>Not Recurring</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, getButtonStyle(3)]}
                    onPress={() =>handleRecurring(3)}>
                    <Text style={{ color: getButtonStyle(3).color, textAlign: 'center', fontSize: 12 }}>Recurring</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <SearchBar />
            </View>


            <DataTable>
                <DataTable.Header style={{backgroundColor: '#D3D3D3'}}>
                    <DataTable.Title style={{ flex: 2, backgroundColor: '#D3D3D3'}}>Date</DataTable.Title>
                    <DataTable.Title style={{ flex: 3, backgroundColor: '#D3D3D3' }}>Nonprofit</DataTable.Title>
                    <DataTable.Title style={{ flex: 2, backgroundColor: '#D3D3D3'}}>Recurring</DataTable.Title>
                    <DataTable.Title style={{ flex: 1, backgroundColor: '#D3D3D3'}} numeric>$</DataTable.Title>
                </DataTable.Header>


                {filteredDonations.slice(from, to).map((donation) => (
                    <DataTable.Row key={donation.key}>
                        <DataTable.Cell style={{ flex: 2 }}>{donation.date}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 3 }}>{donation.nonprofit}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2 }}>{donation.recurring}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1  }}numeric>${donation.amount}</DataTable.Cell>
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
        padding: 10,
        marginBottom: 30,
      }
});

export default DonationTable;


