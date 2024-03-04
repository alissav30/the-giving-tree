import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, { Circle, Path } from 'react-native-svg';
import { database } from '../firebase.js';
import { ref, onValue } from "firebase/database";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';


const TreeExplosionAnimation = ({ isVisible }) => {
    const scale = useSharedValue(0);
    const opacity = useSharedValue(1);
  
    const animatedStyles = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
      // Additional styling for the explosion animation
    }));
  
    useEffect(() => {
      if (isVisible) {
        scale.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.exp) });
        opacity.value = withTiming(0, { duration: 500 });
      }
    }, [isVisible]);
  
    return <Animated.View style={[styles.explosionAnimation, animatedStyles]} />;
  };

const Trees = () => {
  const treeImages = [
    require('../assets/tree_person_1.png'),
    require('../assets/tree_person_2.png'),
    require('../assets/tree_person_3.png'),
    require('../assets/tree_person_4.png'),
    require('../assets/tree_person_5.png'),
  ];

  const [isNewTreeEarned, setIsNewTreeEarned] = useState(false);
    const prevTreeIndexRef = useRef();

    useEffect(() => {
    const newTreeIndex = Math.floor(donationsCount / 5);
    const prevTreeIndex = prevTreeIndexRef.current;

    if (newTreeIndex > prevTreeIndex) {
        setIsNewTreeEarned(true);
        setTimeout(() => setIsNewTreeEarned(false), 500); // Reset after animation
    }

    prevTreeIndexRef.current = newTreeIndex;
    }, [donationsCount]);

  const [donationsCount, setDonationsCount] = useState(0);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const donationsRef = ref(database, 'donations');

    onValue(donationsRef, (snapshot) => {
      const donations = snapshot.val();
      let count = 0;

      Object.values(donations).forEach((donation) => {
        const donationYear = new Date(donation.date).getFullYear();
        if (donationYear === currentYear) {
          if (donation.recurring === 'No') {
            count += 1;
          } else if (donation.recurring === 'Weekly') {
            const weeks = Math.floor((new Date() - new Date(donation.date)) / (7 * 24 * 60 * 60 * 1000));
            count += weeks;
          } else if (donation.recurring === 'Monthly') {
            const months = new Date().getMonth() - new Date(donation.date).getMonth() + 
                           (12 * (new Date().getFullYear() - new Date(donation.date).getFullYear()));
            count += months;
          }
        }
      });

      setDonationsCount(count);
    });
  }, []);

  const treeIndex = Math.min(Math.floor(donationsCount / 5), treeImages.length - 1);
  const progress = donationsCount % 5;
  const totalNeeded = 5;
  const message = `${progress}/${totalNeeded} donations made`;

  // Adjusted patches array to use dynamic progress and trees
  const patches = Array.from({ length: 15 }).map((_, index) => {
    const sideSequence = ['right', 'center', 'left', 'center']; // Enhanced for a more natural flow
    const side = sideSequence[index % 4];
    return { key: index, side };
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/the_giving_tree_logo.png')}
          style={styles.logo}
        />
      </View>

      {patches.map((patch, index) => (
        <View key={patch.key} style={[styles.circlePatch, styles[patch.side + 'Patch']]}>
          {index <= treeIndex ? (
            <>
            <Image source={treeImages[index % treeImages.length]} style={styles.treePerson} />
            {isNewTreeEarned && <TreeExplosionAnimation isVisible={isNewTreeEarned} />}
            </>
          ) : null}
          {index === treeIndex + 1 ? (
            <>
              <Icon name="tree" style={styles.treeIcon} />
              <Svg height="100" width="100" style={styles.svgContainer}>
                <Circle cx="50" cy="50" r="40" stroke="#ccc" strokeWidth="5" fill="none" />
                <Path
                  d={describeArc(50, 50, 40, 0, 360 * (progress / totalNeeded))}
                  fill="none"
                  stroke="#599884"
                  strokeWidth="7"
                />
              </Svg>
              <View style={styles.textContainer}>
                <Text style={styles.messageSide}>{message}</Text>
              </View>
            </>
          ) : index > treeIndex + 1 ? (
            <Icon name="lock" style={styles.lockIcon} />
          ) : null}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
    marginTop: 15,
  },
  circlePatch: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75, // Maintains the circular shape
    width: 130, // Circle size
    height: 115, // Circle size
    backgroundColor: '#4E4C4D', 
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 8, height: 14 }, // Adjust for a more pronounced depth
    shadowOpacity: 0.5, // Shadow visibility
    shadowRadius: 10, // Shadow blur radius
    elevation: 10, 
    overflow: 'visible', 
  },
  textContainer: {
    position: 'absolute',
    left: '115%', // Position to the side of the circle
    top: '25%', // Align with the center of the circle
  },
  
  greyPatch: {
    backgroundColor: '#D3D3D3', // Grey color for the patches from the 4th onwards
  },
  leftPatch: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  centerLeftPatch: {
    alignSelf: 'center',
    marginLeft: -60,
  },
  centerRightPatch: {
    alignSelf: 'center',
    marginRight: -60,
  },
  svgContainer: {
    position: 'absolute',
  },
  rightPatch: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  treePerson: {
    width: 110, // Increased width
    height: 150, // Increased height
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 30, // Adjusted to lift the image above the oval
  },
  treeIcon: {
    fontSize: 50,
    color: "#599884",
  },
  lockIcon: {
    fontSize: 30,
    position: 'absolute',
    alignSelf: 'center',
    color: '#C2C2C7', 
  },
  messageSide: {
    maxWidth: 90, // Ensure the text fits and doesn't run off the screen
    textAlign: 'center',
    fontSize: 17,
  },
  progressContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ovalShape: {
    borderRadius: 70, // Adjust to match the oval shape
    width: 140, // Match the width of the patch
    height: 80, // Match the height of the patch
  },
  explosionAnimation: {
    width: 100,
    height: 100,
    backgroundColor: 'yellow', // Example color
    position: 'absolute',
    borderRadius: 50,
  },
});

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }
  
  function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
    var d = [
      'M', start.x, start.y,
      'A', radius, radius, 0, arcSweep, 0, end.x, end.y,
    ].join(' ');
    return d;
  }

export default Trees;
