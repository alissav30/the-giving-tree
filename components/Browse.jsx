import React, { useState } from 'react';
import { ScrollView, View, Image, StyleSheet, Text, Dimensions } from 'react-native';
import { Searchbar, Button, Card, Title } from 'react-native-paper';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const Browse = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSlide, setActiveSlide] = useState(0); // State to keep track of the active slide

    const carouselItems = [
        require('../assets/bail_project_ad.png'),
        require('../assets/dreamcatchers_ad.png'),
        require('../assets/stand_ad.png')
    ];

    const categories = ["Disease", "Animals", "Women's Rights", "Disaster Relief", "Housing", "Education", "Hunger Relief", "Other"];

    const navigateToOrgsByCause = (cause) => {
        navigation.navigate('OrgsByCause', { cause });
    };

    const recommendedOrgs = [
        { id: 1, name: 'Org 1', icon: require('../assets/aspca_icon.png') },
        { id: 2, name: 'Org 2', icon: require('../assets/aspca_icon.png') },
        { id: 3, name: 'Org 3', icon: require('../assets/aspca_icon.png') },
    ];

    const renderCarouselItem = ({ item }) => (
        <View style={styles.carouselItem}>
            <Image source={item} style={styles.carouselImage} />
        </View>
    );

    return (
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
                        {category}
                    </Button>
                ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>Recommended Organizations</Text>
            <View style={styles.recommendedOrgsContainer}>
                {recommendedOrgs.map((org) => (
                    <Card key={org.id} style={styles.orgCard}>
                        <Card.Content>
                            <Title>{org.name}</Title>
                        </Card.Content>
                        <Card.Cover source={org.icon} style={styles.orgImage} resizeMode="contain" />
                    </Card>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    searchBar: {
        marginHorizontal: 10,
        marginBottom: 20,
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
    },
    orgImage: {
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
