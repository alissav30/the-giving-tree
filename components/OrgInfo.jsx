import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const OrgInfo = ({ navigation, route }) => {
    const { orgId, cause } = route.params;

    const renderStars = (value) => {
        let stars = [];
        for (let i = 0; i < 3; i++) {
            stars.push(
                <Icon
                    key={i}
                    name={i < value ? 'star' : 'star-outline'}
                    size={20}
                    color="#5A6F72"
                />
            );
        }
        return <View style={styles.starsContainer}>{stars}</View>;
    };

    const renderCarouselItem = ({ item, index }) => (
        <Image source={item} style={styles.carouselImage} />
    );

    const renderBadgeItem = ({ item }) => (
        <View style={styles.badgeItem}>
            <Text style={styles.badgeText}>{item.metric}</Text>
            {renderStars(item.value)}
        </View>
    );

    const orgInfo = {
        name: `Organization ${orgId}`,
        mission: "This is a placeholder mission statement for the organization.",
        website: "https://example.org",
        images: [
            require('../assets/aspca_icon.png'),
            require('../assets/aspca_icon.png'),
        ],
        ratings: [
            { metric: "Financial Need", value: 1 },
            { metric: "Dollar Impact", value: 2 },
            { metric: "Most in Need", value: 3 },
        ],
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Title style={styles.title}>{orgInfo.name}</Title>
            <Paragraph style={styles.mission}>{orgInfo.mission}</Paragraph>
            <Button
                mode="outlined"
                onPress={() => Linking.openURL(orgInfo.website)}
                style={styles.visitButton}
                textColor='#ffffff'
            >
                Visit our site
            </Button>

            <Carousel
                data={orgInfo.images}
                renderItem={renderCarouselItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth - 150}
                containerCustomStyle={styles.carouselContainer}
            />

            <Carousel
                data={orgInfo.ratings}
                renderItem={renderBadgeItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth * 0.3} // Adjust width for ratings carousel
                activeSlideAlignment={'center'}
                containerCustomStyle={styles.carouselContainer}
            />

            <Button
                mode="contained"
                onPress={() => navigation.navigate('Donate', { orgId: orgId })}
                style={styles.donateButton}
                buttonColor="#599884"
            >
                Donate Now
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        paddingTop: 55,
        backgroundColor: '#F5F5F5',
    },
    backButton: {
        marginBottom: 5,
    },
    backButtonText: {
        color: '#5A6F72',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    mission: {
        fontSize: 16,
        marginVertical: 10,
        textAlign: 'center',
    },
    visitButton: {
        alignSelf: 'center',
        backgroundColor: "#599884",
        borderWidth: 1,
    },
    carouselContainer: {
        marginVertical: 20,
    },
    carouselImage: {
        width: '100%',
        height: 200,
    },
    badgesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    badgeItem: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10, // More rounded edges
        padding: 10,
        borderWidth: 1,
        borderColor: '#5A6F72', // Color scheme for badges
    },
    badgeText: {
        marginBottom: 5,
        color: '#5A6F72', // Color scheme for badge text
    },
    starsContainer: {
        flexDirection: 'row',
    },
    donateButton: {
        alignSelf: 'center',
        marginTop: 20,
    },
});

export default OrgInfo;
