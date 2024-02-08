import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Donate from './Donate.tsx'; // Import the new component


const MusicRoute = () => <Text>Music</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

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
    profile: RecentsRoute,
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