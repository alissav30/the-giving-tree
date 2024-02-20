import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Donate from './Donate.tsx'; 
import Profile from './Profile.tsx';
import Setting from './Setting.jsx';
import Trees from './Trees.jsx';
import BrowseStackNavigator from './BrowseStackNavigator'; // Import the stack navigator

const MusicRoute = () => <Text>Music</Text>;
const NotificationsRoute = () => <Text>Notifications</Text>;

const NavBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'trees', title: 'Trees', focusedIcon: 'tree', unfocusedIcon: 'tree-outline'},
    { key: 'browse', title: 'Browse', focusedIcon: 'folder-search', unfocusedIcon: 'folder-search-outline' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account-circle', unfocusedIcon: 'account-circle-outline' },
    { key: 'forms', title: 'Forms', focusedIcon: 'file-document-multiple', unfocusedIcon: 'file-document-multiple-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    trees: Trees,
    browse: BrowseStackNavigator, // Use the stack navigator here
    profile: Profile,
    forms: Setting,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#ddebe7' }}
      style={{ backgroundColor: '#ddebe7' }}
      theme={{colors: {secondaryContainer: '#b8d5cc'}}}
    />
  );
};

export default NavBar;
