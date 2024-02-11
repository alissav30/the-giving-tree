import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Donate from './Donate.tsx'; 
import Profile from './Profile.tsx';
//import ThankYou from './ThankYou.tsx';

const MusicRoute = () => <Text>Music</Text>;


const NotificationsRoute = () => <Text>Notifications</Text>;

const NavBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'tree', title: 'Tree', focusedIcon: 'tree', unfocusedIcon: 'tree-outline'},
    { key: 'browse', title: 'Browse', focusedIcon: 'folder-search', unfocusedIcon: 'folder-search-outline' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account-circle', unfocusedIcon: 'account-circle-outline' },
    { key: 'forms', title: 'Forms', focusedIcon: 'file-document-multiple', unfocusedIcon: 'file-document-multiple-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    tree: MusicRoute,
    browse: Donate,
    profile: Profile,
    forms: NotificationsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default NavBar;