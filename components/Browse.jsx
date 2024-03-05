import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Searchbar, Button, Card, Title, PaperProvider } from 'react-native-paper';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import organizationsData from '../organizations.json'; 
import app from '../firebase.js'; // Adjust the path as necessary
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import theme from '../themes';

const Browse = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSlide, setActiveSlide] = useState(0); // State to keep track of the active slide
    const [recommendedOrgs, setRecommendedOrgs] = useState([]);

    const carouselItems = [
        require('../assets/bail_project_ad.png'),
        require('../assets/dreamcatchers_ad.png'),
        require('../assets/stand_ad.png')
    ];

    const categories = [
        ["Health", "health"],
        ["Animals", "Animals"],
        ["Human Services", "human_services"],
        ["Housing", "housing"],
        ["Natural Disaster Relief", "natural_disaster_relief"],
        ["Hunger Relief", "hunger_relief"],
        ["Education", "education"],
        ["Global Conflict", "global_conflict"],
        ["Current", "current"],
        ["Other", "other"]
    ];

    useEffect(() => {
        const storage = getStorage(app);
        const fetchImageUrls = async () => {
            const recommendedOrgKeys = Object.keys(organizationsData.organizations).slice(0, 3); // Just an example, adjust as needed
            const orgsWithImages = await Promise.all(recommendedOrgKeys.map(async (key) => {
                const org = organizationsData.organizations[key];
                const imageRef = ref(storage, `${org.logo_url}`);
                const imageUrl = await getDownloadURL(imageRef).catch((error) => {
                    console.error('Error fetching image URL:', error);
                    return ''; // Return empty string or a default image URL in case of error
                });
                return {
                    ...org,
                    id: key,
                    imageUrl
                };
            }));
            setRecommendedOrgs(orgsWithImages);
        };

        fetchImageUrls();
    }, []);

    const navigateToOrgsByCause = (category) => {
        navigation.navigate('OrgsByCause', { cause_tuple: category });
    };

    const renderCarouselItem = ({ item }) => (
        <View style={styles.carouselItem}>
            <Image source={item} style={styles.carouselImage} />
        </View>
    );

    return (
        <PaperProvider theme={theme}>
        <ScrollView style={styles.container}>
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchBar}
            />

            {/* Carousel for Ads */}
            <View>
                <Carousel
                    data={carouselItems}
                    renderItem={renderCarouselItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width - 60}
                    onSnapToItem={(index) => setActiveSlide(index)}
                    containerCustomStyle={styles.carouselContainer}
                />
                <Pagination
                    dotsLength={carouselItems.length}
                    activeDotIndex={activeSlide}
                    containerStyle={styles.paginationContainer}
                    dotStyle={styles.paginationDot}
                    inactiveDotStyle={styles.inactiveDot}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>

            <Text style={styles.sectionTitle}>Browse by Causes</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
                {categories.map((category, index) => (
                    <Button
                        key={index}
                        mode="outlined"
                        style={styles.filterButton}
                        onPress={() => navigateToOrgsByCause(category)}
                    >
                        {category[0]}
                    </Button>
                ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>Recommended Organizations</Text>
            <View style={styles.recommendedOrgsContainer}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {recommendedOrgs.map((org) => (
                    
                        <Card key={org.id} style={styles.orgCard}>
                            <TouchableOpacity key={org.id} onPress={() => navigation.navigate('OrgInfo', { orgKey: org.id })}>
                                <Card.Content>
                                    <Title numberOfLines={1} ellipsizeMode="tail" style={styles.orgTitle}>{org.organization_name}</Title>
                                </Card.Content>
                                <Card.Cover source={{ uri: org.imageUrl }} style={styles.orgImage} resizeMode="contain" />
                            </TouchableOpacity> 
                        </Card>
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    orgTitle: {
        fontSize: 15,
        paddingVertical: 15,
        fontWeight: "bold",
    },
    searchBar: {
        marginHorizontal: 10,
        marginBottom: 20,
        backgroundColor: 'white'
    },
    carouselContainer: {
        marginVertical: 20, // Add some vertical margin for spacing
    },
    carouselItem: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    carouselImage: {
        width: '100%',
        height: '100%',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 10,
    },
    filterContainer: {
        marginVertical: 10,
    },
    filterButton: {
        marginHorizontal: 5,
    },
    recommendedOrgsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    orgCard: {
        width: '30%',
        margin: 10,
        backgroundColor: 'white'
    },
    orgImage: {
        backgroundColor: 'white',
        width: '100%', // Ensure the image width matches the card width
        //height: 100, // Adjust the height as needed
        // You can also add resizeMode here if needed, but it's set to "contain" in the Card.Cover props
    },
    paginationContainer: {
        marginTop: -20, // Adjust as necessary
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
});

export default Browse;
