import * as React from 'react';
import { Appbar } from 'react-native-paper';

const SettingAppBar = () => (
  <Appbar.Header style={{ backgroundColor: '#5A6F72' }}>
    <Appbar.Content 
        title="Settings" 
        titleStyle={{ color: '#F9FFFD', fontSize: 30 }} 
    />
  </Appbar.Header>
);

export default SettingAppBar;
