import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import organizationsData from '../organizations.json'; 
import app from '../firebase.js'; // Adjust the path as necessary
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const OrgsByCause = ({ route, navigation }) => {
    const { cause_tuple } = route.params;
    console.log('Cause tuple:', cause_tuple);
    //console.log("check organizationsData",organizationsData)
    //console.log("check organizationsData[PlannedParenthood]",organizationsData.organizations["AmericanFoundationForSuicidePrevention"])
    //console.log("check organizationsData[PlannedParenthood[organization_mission_statement]]",organizationsData["PlannedParenthood"]["organization_mission_statement"])

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOrgs, setFilteredOrgs] = useState([]);
    const [activeFilter, setActiveFilter] = useState('Alphabetical');

    useEffect(() => {
        const fetchImageUrlsAndSort = async (orgs) => {
            const storage = getStorage(app);
            let orgsWithImages = await Promise.all(orgs.map(async (org) => {
                const imageRef = ref(storage, `${org.logo_url}`);
                const imageUrl = await getDownloadURL(imageRef).catch((error) => {
                    console.log('Error fetching image URL:', error);
                    return ''; // Return empty string or a default image URL in case of error
                });
                return { ...org, imageUrl };
            }));

            // Sort organizations based on the active filter before setting them in state
            switch(activeFilter) {
                case 'Alphabetical':
                    orgsWithImages.sort((a, b) => a.organization_name.localeCompare(b.organization_name));
                    break;
                case 'Financial Impact':
                    // Assuming each org has a financial_impact field
                    orgsWithImages.sort((a, b) => b.financial_impact - a.financial_impact);
                    break;

                case 'Local Contribution':
                    orgsWithImages.sort((a, b) => b.local_contribution - a.local_contribution);
                    break;
                case 'Financial Need':
                    orgsWithImages.sort((a, b) => b.financial_need - a.financial_need);
                    break;
                case 'Most In Need':
                    orgsWithImages.sort((a, b) => b.most_in_need - a.most_in_need);
                    break;
            }

            setFilteredOrgs(orgsWithImages);
        };

        const filtered = Object.entries(organizationsData.organizations || {}).filter(([key, org]) =>
            Array.isArray(org.causes) && org.causes.flat().includes(cause_tuple[1])
        ).map(([key, org]) => ({
            key,
            ...org
        }));

        fetchImageUrlsAndSort(filtered);

    }, [cause_tuple, activeFilter]);

    const ButtonFilter = ({ title }) => (
        <TouchableOpacity
            style={[
                styles.filterButton,
                activeFilter === title ? styles.filterButtonActive : styles.filterButtonInactive,
            ]}
            onPress={() => setActiveFilter(title)}
        >
            <Text
                style={[
                    styles.filterButtonText,
                    activeFilter === title ? styles.filterButtonTextActive : {},
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );

    const renderFilterButton = ({ item }) => <ButtonFilter title={item} />;


    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Organizations for {cause_tuple[0]}</Text>

            <FlatList
                horizontal
                data={['Alphabetical', 'Most In Need', 'Financial Need', 'Local Contribution', 'Financial Impact']}
                renderItem={renderFilterButton}
                keyExtractor={item => item}
                contentContainerStyle={styles.filterContainer}
                showsHorizontalScrollIndicator={false}
            />

            <View style={styles.orgsContainer}>
                {filteredOrgs.map((org) => (
                    <Card key={org.key} style={styles.orgContainer}>
                        <View style={styles.cardContent}>
                            <Card.Cover source={{ uri: org.imageUrl }} style={styles.icon} resizeMode="contain"/>
                            <View style={styles.textContainer}>
                                <Title style={styles.orgTitle}>{org.organization_name}</Title>
                                <Paragraph numberOfLines={4} ellipsizeMode="tail" style={styles.mission}>{org.organization_mission_statement}</Paragraph>
                                
                                <Button
                                    mode="outlined"
                                    onPress={() => navigation.navigate('OrgInfo', { orgKey: org.key })}
                                    style={styles.learnMoreButton}
                                >
                                    Learn More
                                </Button>
                            </View>
                        </View>
                    </Card>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#F5F5F5',
    },
    orgsContainer: {
        flex: 1,
    },
    backButton: {
        marginBottom: 20,
    },
    backButtonText: {
        color: '#5A6F72',
        fontSize: 18,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    searchBar: {
        marginBottom: 20,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    filterButton: {
        borderWidth: 1,
        borderColor: '#5A6F72',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    filterButtonInactive: {
        backgroundColor: '#FFFFFF',
    },
    filterButtonActive: {
        backgroundColor: '#5A6F72',
    },
    filterButtonText: {
        color: '#5A6F72',
    },
    filterButtonTextActive: {
        color: '#FFFFFF',
    },
    orgContainer: {
        marginBottom: 20,
        borderRadius: 20, // Increased border radius for more rounded edges
        overflow: 'hidden', // Ensure the child components don't overflow the rounded corners
        backgroundColor: 'white',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        margin: 10,
    },
    icon: {
        width: 100,
        height: 100,
        marginRight: 16,
        backgroundColor: 'white',
    },
    textContainer: {
        flex: 1,
    },
    orgTitle: {
        marginBottom: 4,
        color: '#4E4C4D',
    },
    mission: {
        marginBottom: 10,
    },
    learnMoreButton: {
        marginTop: 4,
    },
    filterContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    filterButton: {
        borderWidth: 1,
        borderColor: '#C2C2C7',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 8,
        backgroundColor: '#FFFFFF', // Default background color
    },
    filterButtonActive: {
        backgroundColor: '#C2C2C7', // Background color when active
    },
    filterButtonText: {
        color: '#4E4C4D', // Default text color
    },
    filterButtonTextActive: {
        color: '#FFFFFF', // Text color when active
    },
});

export default OrgsByCause;
