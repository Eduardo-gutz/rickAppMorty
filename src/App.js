import { Container } from '@mui/material'
import Navigation from './components/navigation/Navigation'
import { Routes, Route } from 'react-router-dom'
import { routes } from './routes/routes'
import font from './assets/fonts/get_schwifty.ttf'
import back from './assets/images/831780.png'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: 'schwift',
    body2: {
      fontSize: 16,
      fontFamily: 'Patrick Hand',
      fontWeight: 600,
      letterSpacing: 2
    },
    body1: {
      fontSize: 14,
      fontFamily: 'Patrick Hand',
      fontWeight: 400,
      letterSpacing: 2
    },
    body3: {
      fontSize: 22,
      fontFamily: 'Patrick Hand',
      fontWeight: 600,
      letterSpacing: 2
    },
    body4: {
      fontSize: 18,
      fontFamily: 'Patrick Hand',
      fontWeight: 400,
      letterSpacing: 2
    },
    subtitle1: {
      fontSize: 20,
      fontFamily: 'Patrick Hand',
      fontWeight: 700,
      letterSpacing: 2
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-family: 'schwift';
        src: url('${font}') format('truetype');
        font-style: normal;
        font-weight: normal;
      `
    }
  },
  palette: {
    primary: {
      main: '#477385'
    },
    letter: {
      main: '#3D373C'
    },
    secondary: {
      main: '#2F9331',
      light: '#8BCF21'
    }
  },
})

function App () {
  return (
    <ThemeProvider theme={theme}>
      <div className='container'>
        <img src={back} alt='' className='back' />
        <Navigation />
        <Container>
          <Routes>
            {routes.map((route) =>
              <Route key={route.key} path={route.route} element={route.component} />
            )}
          </Routes>
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default App
