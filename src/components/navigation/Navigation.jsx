import { AppBar, Toolbar, Typography, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import './Navigation.css'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Filters from './components/Filters'

/**
 * Navigation component
 * @returns React Component
 */
const Navigation = () => {
  const navigate = useNavigate() // Hook react-routes
  const [activeMenu, setActiveMenu] = useState(false)
  const [filters, setFilters] = useState('')
  const name = useRef('')

  /**
   * Navigation to the Search Result Section
   */
  const search = () => {
    setActiveMenu(false)
    navigate(`/search?n=${window.btoa(name.current)}${filters}`)
  }

  return (
    <AppBar
      position='static'
      // color='default'
      elevation={5}
      sx={{ padding: '0 1rem' }}
      color='primary'
    >
      <Toolbar>
        {/* logo */}
        <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }} onClick={() => navigate('/')}>
          RickAppMorty
        </Typography>
        {/* input to type the title search */}
        <TextField
          id='standard-search'
          type='text'
          autoComplete='off'
          variant='outlined'
          size='small'
          sx={{ width: '90%', maxWidth: '20rem' }}
          color='secondary'
          onChange={(event) => { name.current = event.target.value }}
        />
        {/* search icon */}
        <span onClick={() => search()} style={{ zIndex: '9', margin: '0 1rem' }}>
          <SearchIcon
            fontSize='large'
          />
        </span>
        {/* filters icon */}
        <span onClick={() => setActiveMenu(!activeMenu)} style={{ zIndex: '9', margin: '0 1rem' }}>
          <TuneIcon
            fontSize='large'
          />
        </span>
        <Filters
          activeMenu={activeMenu}
          setFilters={setFilters}
        />
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
