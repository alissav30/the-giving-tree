import React, { useState, useRef } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import { Searchbar, Button, Card, Title, Text } from 'react-native-paper';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const Browse = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSlide, setActiveSlide] = useState(0);
    const carouselRef = useRef(null);
    const carouselItems = [
        require('./assets/bail_project_ad.png'),
        require('./assets/dreamcatchers_ad.png'),
        require('./assets/stand_ad.png')
    ];

    const renderCarouselItem = ({item, index}) => {
        return (
            <View style={styles.carouselItem}>
                <Image source={item} style={styles.carouselImage} />
            </View>
        );
    };

    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <Searchbar
                placeholder="Search"
                onChangeText={query => setSearchQuery(query)}
                value={searchQuery}
                style={styles.searchBar}
            />

            {/* Carousel */}
            <View>
                <Carousel
                  ref={carouselRef}
                  data={carouselItems}
                  renderItem={renderCarouselItem}
                  sliderWidth={screenWidth}
                  itemWidth={screenWidth}
                  onSnapToItem={(index) => setActiveSlide(index)}
                />
                <Pagination
                  dotsLength={carouselItems.length}
                  activeDotIndex={activeSlide}
                  containerStyle={styles.paginationContainer}
                  dotStyle={styles.paginationDot}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                />
            </View>

            {/* Additional content (e.g., filter buttons, organizations) goes here */}
        </View>
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
    carouselItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselImage: {
        width: '100%',
        height: 200,
    },
    paginationContainer: {
        paddingTop: 10,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
    },
});

export default Browse;
