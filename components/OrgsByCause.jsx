import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Button } from 'react-native-paper';

const OrgsByCause = ({ route, navigation }) => {
    const { cause } = route.params;
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('');

    const organizations = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        name: `Organization ${index + 1}`,
        mission: 'This is a filler mission statement for the organization.',
    }));

    const descriptions = {
        "Animals": "Help aid organizations fighting for animals to be free of involvement and suffering in medical research, hunting, and other industries that benefit humans.",
    };

    const handleFilterPress = (filter) => {
        setActiveFilter(filter);
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('BrowseMain')} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Organizations for {cause}</Text>
            <Text style={styles.description}>{descriptions[cause]}</Text>

            <Searchbar
                placeholder="Search Organizations"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchBar}
            />

            <View style={styles.filterContainer}>
                {['Near You', 'Alphabetical', 'Most In Need'].map((filter, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleFilterPress(filter)}
                        style={[
                            styles.filterButton,
                            activeFilter === filter ? styles.filterButtonActive : styles.filterButtonInactive
                        ]}
                    >
                        <Text style={[
                            styles.filterButtonText,
                            activeFilter === filter ? styles.filterButtonTextActive : {}
                        ]}>{filter}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {organizations.map((org, index) => (
                <Card key={index} style={styles.orgContainer}>
                    <View style={styles.cardContent}>
                        <Image source={require('../assets/aspca_icon.png')} style={styles.icon} />
                        <View style={styles.textContainer}>
                            <Title style={styles.orgTitle}>{org.name}</Title>
                            <Paragraph style={styles.mission}>{org.mission}</Paragraph>
                            <Button
                                mode="outlined"
                                onPress={() => navigation.navigate('OrgInfo', { orgId: org.id })}
                                style={styles.learnMoreButton}
                                buttonColor="#599884" // Use your specified color for button text
                                textColor="#ffffff"
                            >
                                Learn More
                            </Button>
                        </View>
                    </View>
                </Card>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        backgroundColor: '#F5F5F5',
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
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    icon: {
        width: 80,
        height: 80,
        marginRight: 16,
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
});

export default OrgsByCause;
