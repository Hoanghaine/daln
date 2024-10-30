import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#3C5EAB',
    },
    secondary: {
      main: '#65AD45',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',

    h1: {
      fontSize: '48px',
      fontWeight: 'bold',
      letterSpacing: '-1%',
    },
    h2: {
      fontSize: '40px',
      fontWeight: 'bold',
      letterSpacing: '-0.5%',
    },
    h3: {
      fontSize: '32px',
      fontWeight: 500, // Medium
    },
    h4: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    subtitle1: {
      fontSize: '20px',
      fontWeight: 700, // Medium
    },
    subtitle2: {
      fontSize: '18px',
      fontWeight: 600, // Medium
    },
    body1: {
      fontSize: '20px',
      fontWeight: 300, // Light
    },
    body2: {
      fontSize: '16px',
      fontWeight: 300, // Light
    },
    caption: {
      fontSize: '13px',
      fontWeight: 300, // Light
    },
  },
  // Optional: Custom text colors (though it may not be common practice to put these in the 'text' section)
  // text: {
  //   primary: '#3C5EAB',
  //   secondary: '#65AD45',
  //   thirdly: '#65AD45',
  //   four: '#FFC107',
  // },
})

export default theme
