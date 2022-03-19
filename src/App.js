import { Container } from '@mui/material'
import Navigation from './components/navigation/Navigation'
import { Routes, Route } from 'react-router-dom'
import { routes } from './routes/routes'
import back from './assets/images/831780.png'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './enviroments/theme'

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
