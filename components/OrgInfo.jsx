import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions } from 'react-native';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import app from '../firebase.js'; // Adjust this path to your Firebase config file
import organizationsData from '../organizations.json';

const { width: screenWidth } = Dimensions.get('window');

const OrgInfo = ({ navigation, route }) => {
    const { orgKey } = route.params;
    const [orgInfo, setOrgInfo] = useState(null);

    useEffect(() => {
        const orgData = organizationsData.organizations[orgKey];
        if (orgData) {
            const storage = getStorage(app);
            const fetchImages = async () => {
                const logoUrl = await getDownloadURL(ref(storage, orgData.logo_url)).catch(() => '');
                const imagesUrls = await Promise.all(
                    orgData.other_pictures.map(picture =>
                        getDownloadURL(ref(storage, picture)).catch(() => '')
                    )
                );
                setOrgInfo({
                    ...orgData,
                    logo: { uri: logoUrl },
                    images: imagesUrls.map(url => ({ uri: url })),
                });
            };
            fetchImages();
        }
    }, [orgKey]);

    const renderCarouselItem = ({ item }) => (
        <Image source={item} style={styles.carouselImage} />
    );

    const renderStars = (count) => (
        Array.from({ length: count }, (_, i) => <Icon key={i} name="star" size={20} color="#FFD700" />)
    );

    if (!orgInfo) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Loading...</Text></View>;

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Image source={orgInfo.logo} style={styles.logo} resizeMode="contain" />
            <Title style={styles.title}>{orgInfo.organization_name}</Title>
            <Paragraph style={styles.mission}>{orgInfo.organization_mission_statement}</Paragraph>
            <Button
                mode="outlined"
                onPress={() => Linking.openURL(orgInfo.website_url)}
                style={styles.visitButton}
            >
                Visit our site
            </Button>
            <View style={styles.carouselContainer}>
                <Carousel
                    data={orgInfo.images}
                    renderItem={renderCarouselItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth - 60}
                />
            </View>
            <View style={styles.ratingsContainer}>
                <Text style={styles.ratingTitle}>Ratings</Text>
                <View style={styles.starsContainer}>
                    <Text>Financial Need: </Text>{renderStars(orgInfo.financial_need)}
                </View>
                <View style={styles.starsContainer}>
                    <Text>Dollar Impact: </Text>{renderStars(orgInfo.dollar_impact)}
                </View>
                <View style={styles.starsContainer}>
                    <Text>Local Contribution: </Text>{renderStars(orgInfo.local_contribution)}
                </View>
            </View>
            <Button
            mode="contained"
            onPress={() => navigation.navigate('Donate', { orgId: orgKey, organization_name: orgInfo.organization_name })}
            style={styles.donateButton}
        >
            Donate Now
        </Button>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 20,
        alignItems: 'center',
    },
    backButton: {
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginTop: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    mission: {
        fontSize: 16,
        textAlign: 'left',
        marginVertical: 10,
        marginLeft: '5%',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginVertical: 10,
    },
    visitButton: {
        marginVertical: 10,
        width: '50%',
        marginLeft: '5%',
    },
    donateButton: {
        backgroundColor: '#007bff',
        marginTop: 20,
    },
    carouselWrapper: {
        marginVertical: 20,
    },
    carouselImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    ratingItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    ratingLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    starsContainer: {
        flexDirection: 'row',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OrgInfo;
