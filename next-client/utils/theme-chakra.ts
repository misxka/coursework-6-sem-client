import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    blue: {
      50: '#ddf2ff',
      100: '#aed6ff',
      200: '#7dbaff',
      300: '#4a9fff',
      400: '#1a83ff',
      500: '#006ae6',
      600: '#0052b4',
      700: '#003b82',
      800: '#002351',
      900: '#000d21'
    },
    green: {
      50: '#e3fbeb',
      100: '#c2ebcf',
      200: '#a0ddb2',
      300: '#7ccf94',
      400: '#58c177',
      500: '#3ea75d',
      600: '#2e8248',
      700: '#205d33',
      800: '#0f391d',
      900: '#001503'
    }
  }
});

export { theme };
