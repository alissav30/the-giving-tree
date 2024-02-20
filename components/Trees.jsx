import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, { Circle, Path } from 'react-native-svg';

const Trees = () => {
  const treeImages = [
    require('../assets/tree_person_1.png'),
    require('../assets/tree_person_2.png'),
    require('../assets/tree_person_3.png'),
    require('../assets/tree_person_4.png'),
    require('../assets/tree_person_5.png'),
  ];
  const progress = 50;

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
        <View key={patch.key} style={[styles.circlePatch, index >= 5 ? styles.greyPatch : {}, styles[patch.side + 'Patch']]}>
                {index < 5 ? (
            <Image source={treeImages[index % treeImages.length]} style={styles.treePerson} />
            ) : null}
            {index === 5 ? (
            <Icon name="tree" style={styles.treeIcon} />
            ) : index > 5 ? (
            <Icon name="lock" style={styles.lockIcon} />
            ) : null}
            {index === 5 && (
            <>
                <Svg height="100" width="100" style={styles.svgContainer}>
                <Circle cx="50" cy="50" r="40" stroke="#ccc" strokeWidth="5" fill="none" />
                <Path
                    d={describeArc(50, 50, 40, 0, 360 * progress / 100)}
                    fill="none"
                    stroke="#599884"
                    strokeWidth="7"
                />
                </Svg>
                <View style={styles.textContainer}>
                <Text style={styles.messageSide}>
                    Donate <Text style={{ fontWeight: 'bold' }}>$5.00</Text> more to unlock this tree!
                </Text>
                </View>
            </>
            )}
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
    backgroundColor: 'brown',
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
  },
  messageSide: {
    maxWidth: 90, // Ensure the text fits and doesn't run off the screen
    textAlign: 'center',
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
