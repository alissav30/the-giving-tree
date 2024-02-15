// For setting colors

import { DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#5A6F72', // Dark green
    accent: '#599884',  // Brighter green
    background: '#ecf0f1', // Set your background color
  },
};

export default theme;
