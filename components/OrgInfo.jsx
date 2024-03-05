import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions } from 'react-native';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import app from '../firebase.js'; // Adjust this path to your Firebase config file
import organizationsData from '../organizations.json';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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

    const renderStars = (count) => {
        const totalStars = 3; // Total number of stars you want to render
        const filledStars = Math.min(count, totalStars); // Number of filled stars
        const emptyStars = totalStars - filledStars; // Number of empty stars
      
        // Use Array.from to create an array of JSX elements for both filled and empty stars
        const stars = Array.from({ length: filledStars }, (_, i) => (
          <Icon key={`filled_${i}`} name="star" size={20} color="#185A37" />
        )).concat(
          Array.from({ length: emptyStars }, (_, i) => (
            <Icon key={`empty_${i}`} name="star-outline" size={20} color="#185A37" />
          ))
        );
      
        return stars;
      };

    if (!orgInfo) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Loading...</Text></View>;

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <View style={styles.namegroup}>
                <Title style={styles.title}>{orgInfo.organization_name}</Title>
                <Image source={orgInfo.logo} style={styles.logo} resizeMode="contain" />
            </View>
            <Paragraph style={styles.mission}>{orgInfo.organization_mission_statement}</Paragraph>
            
            <TouchableOpacity onPress={() => Linking.openURL(orgInfo.website_url)} style={styles.visitButton}>
                <Text style={styles.linkText}>Visit their site</Text>
                <Icon name="chevron-right" size={20} color="#185A37" />
            </TouchableOpacity>
           
            <View style={styles.carouselContainer}>
                <Carousel
                    data={orgInfo.images}
                    renderItem={renderCarouselItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth - 60}
                />
            </View>
            <View style={styles.ratingsContainer}>
                <View style={styles.starsContainer}>
                    <Text>Financial Need</Text>
                    <View style={styles.stars}>
                        {renderStars(orgInfo.financial_need)}
                    </View>
                </View>
                <View style={styles.starsContainer}>
                    <Text>Dollar Impact</Text>
                    <View style={styles.stars}>
                        {renderStars(orgInfo.dollar_impact)}
                    </View>
                </View>
                <View style={styles.starsContainer}>
                    <Text>Local Contribution</Text>
                    <View style={styles.stars}>
                        {renderStars(orgInfo.local_contribution)}
                    </View>
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
        paddingTop: 44,
        paddingLeft: 8,
        paddingRight: 8,
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
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 12,
        textAlign: 'center',
        maxWidth: '60%',
    },
    mission: {
        fontSize: 16,
        textAlign: 'left',
        marginVertical: 10,
        margin: '5%',
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginLeft: 12,
    },
    visitButton: {
        flexDirection: 'row',
        marginBottom: 8,
        marginLeft: '5%',
    },
    donateButton: {
        backgroundColor: '#599884',
        marginTop: 12,
        width: 200,
        alignSelf: 'center',
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
    ratingsContainer:{
        flexDirection: 'row',
    },
    starsContainer: {
        backgroundColor:'#E0F0E3',
        padding: 10,
        margin: 3,
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stars: {
        flexDirection: 'row'
        
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    namegroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    linkText: {
        color: '#185A37', // Set the desired link color
        textDecorationLine: 'underline', // Add underline style to mimic a link
        paddingBottom: 12,
        fontWeight: 'bold',
        fontSize: 'large',
      },
});

export default OrgInfo;
