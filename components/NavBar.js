import React, { useEffect } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Donate from './Donate.tsx'; 
import Profile from './Profile.tsx';
import Setting from './Setting.jsx';
import Trees from './Trees.jsx';
import BrowseStackNavigator from './BrowseStackNavigator'; // Import the stack navigator
import FormsStackNavigator2 from './FormsStackNavigator2.js';
import ProfileStackNavigator from './ProfileStackNavigator.js';
import FormStackNavigator from './FormStackNavigator.js';
import { useNavigationContext } from '../NavigationContext.js';


const MusicRoute = () => <Text>Music</Text>;
const NotificationsRoute = () => <Text>Notifications</Text>;
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['ViewPropTypes will be removed from React Native']);
LogBox.ignoreLogs(['When setting overflow to hidden']);


const NavBar = ({ selectedIndex }) => {
  const [index, setIndex] = React.useState(0);
  const { currentTab, navigateToTab } = useNavigationContext();

  const [routes] = React.useState([
    { key: 'trees', title: 'Trees', focusedIcon: 'tree', unfocusedIcon: 'tree-outline'},
    { key: 'browse', title: 'Browse', focusedIcon: 'folder-search', unfocusedIcon: 'folder-search-outline' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account-circle', unfocusedIcon: 'account-circle-outline' },
    { key: 'forms', title: 'Forms', focusedIcon: 'file-document-multiple', unfocusedIcon: 'file-document-multiple-outline' },
  ]);

  useEffect(() => {
    // Find the index of the currentTab in your routes array
    const tabIndex = routes.findIndex((route) => route.key === currentTab);
    setIndex(tabIndex >= 0 ? tabIndex : 0);
  }, [currentTab]);

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    navigateToTab(routes[newIndex].key);

  };

  // const renderScene = ({ route }) => {
  //   switch (route.key) {
  //     case 'trees':
  //       return <Trees onIndexChange={handleIndexChange} />;
  //     case 'browse':
  //       return <BrowseStackNavigator />;
  //     case 'profile':
  //       return <ProfileStackNavigator />;
  //     case 'forms':
  //       return <FormsStackNavigator2 />;
  //     default:
  //       return null;
  //   }
  // };

  const renderScene = BottomNavigation.SceneMap({
    trees: Trees,
    browse: BrowseStackNavigator,
    profile: ProfileStackNavigator,
    forms: FormsStackNavigator2,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={(newIndex) => {
        setIndex(newIndex);
        handleIndexChange(newIndex);
      }}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#ddebe7' }}
      style={{ backgroundColor: '#ddebe7' }}
      theme={{colors: {secondaryContainer: '#b8d5cc'}}}
    />
  );
};

export default NavBar;