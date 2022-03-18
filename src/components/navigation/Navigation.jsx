import { AppBar, Toolbar, Typography, Box, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import CheckBox from '../fields/checkbox/Checkbox'
import Counter from '../fields/counter/Counter'
import './Navigation.css'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navigation = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(false);
  const [seassonSelected, setSeasson] = useState(0);
  const [episodeSelected, setEpisode] = useState(0);
  const [filtersCharacter, setFiltersCharacters] = useState({filter: '', value: false});
  const [filtersGender, setFiltersGender] = useState({filter: '', value: false});
  const name = useRef('');

  const search = () => {
    const filterChar = filtersCharacter.value ? `&s=${window.btoa(filtersCharacter.filter)}` : '';
    const filterGen = filtersGender.value ? `&g=${btoa(filtersGender.filter)}` : '';
    const seasson = seassonSelected > 0 ? seassonSelected <= 9 ? `0${seassonSelected}` : `${seassonSelected}` : ''
    const episode = episodeSelected > 0 ? episodeSelected <= 9 ? `0${episodeSelected}` : `${episodeSelected}` : ''

    const filterSeasson = `&e=${window.btoa('S' + seasson + 'E' + episode)}`

    setActiveMenu(false);
    navigate(`/search?n=${window.btoa(name.current)}${filterChar}${filterGen}${seasson !== '' && episode !== '' ? filterSeasson : ''}` )

  }

  const generateSeassonsArray = ( limit ) => {
    const array = new Array(limit + 1).fill(1, 0)

    return array.map((_, index) => ({value: index, label: index}))
  }

  return (
    <AppBar
      position='static'
      // color='default'
      elevation={5}
      sx={{padding: '0 1rem'}}
      color='primary'
    >
      <Toolbar>
        <Typography variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }} onClick={() => navigate('/')}>
          RickAppMorty
        </Typography>
        <TextField
          id="standard-search"
          type="text"
          autoComplete='off'
          variant="outlined"
          size='small'
          sx={{width: '90%', maxWidth: '20rem'}}
          color='secondary'
          onChange={(event) => name.current = event.target.value}
        />
        <span onClick={() => search()} style={{ zIndex: '9', margin: '0 1rem' }}>
          <SearchIcon
            fontSize='large'
          />
        </span>
        <span onClick={() => setActiveMenu(!activeMenu)} style={{ zIndex: '9', margin: '0 1rem' }}>
          <TuneIcon
            fontSize='large'
          />
        </span>
        <Box
          component='nav'
          className={`menu ${activeMenu && 'active'}`}
          position='fixed'
        >
          <Box
            component='span'
          >
            <Typography
              variant='body2'
              component='p'
              color={'#191C2B'}
              sx={{ my: 1, mx: 1.5 }}
            >
              Characters
            </Typography>
            <Typography
              variant='body2'
              component='p'
              display='inline'
              color={'#191C2B'}
              sx={{ my: 1, mx: 0.1 }}
            >
              Status:
            </Typography>
            <Box>
              <CheckBox
                label='Alive'
                checked={filtersCharacter.filter === 'alive'}
                onChange={(_, value) => value ? setFiltersCharacters({filter: 'alive', value: value}) : setFiltersCharacters({filter: '', value: false})}
                />
              <CheckBox
                label='Dead'
                checked={filtersCharacter.filter === 'dead'}
                onChange={(_, value) => value ? setFiltersCharacters({filter: 'dead', value: value}) : setFiltersCharacters({filter: '', value: false})}
                />
              <CheckBox
                label='Unknow'
                checked={filtersCharacter.filter === 'unknown'}
                onChange={(_, value) => value ? setFiltersCharacters({filter: 'unknown', value: value}) : setFiltersCharacters({filter: '', value: false})}
              />
            </Box>
            <Typography
              variant='body2'
              component='p'
              display='inline'
              color={'#191C2B'}
              sx={{ my: 1 }}
            >
              Gender:
            </Typography>
            <Box>
              <CheckBox
                label='Female'
                checked={filtersGender.filter === 'female'}
                onChange={(_, value) => value ? setFiltersGender({filter: 'female', value: value}) : setFiltersGender({filter: '', value: false})}
                />
              <CheckBox
                label='Male'
                checked={filtersGender.filter === 'male'}
                onChange={(_, value) => value ? setFiltersGender({filter: 'male', value: value}) : setFiltersGender({filter: '', value: false})}
                />
              <CheckBox
                label='Genderless'
                checked={filtersGender.filter === 'genderless'}
                onChange={(_, value) => value ? setFiltersGender({filter: 'genderless', value: value}) : setFiltersGender({filter: '', value: false})}
                />
              <CheckBox
                label='Unknow'
                checked={filtersGender.filter === 'unknown'}
                onChange={(_, value) => value ? setFiltersGender({filter: 'unknown', value: value}) : setFiltersGender({filter: '', value: false})}
              />
            </Box>
          </Box>
          <span className='divider' />
          <Box
            component='span'
            sx={{ width: '100%' }}
          >
            <Typography
              variant='body2'
              component='p'
              color={'#191C2B'}
              sx={{ my: 1, mx: 1.5 }}
            >
              Episodes
            </Typography>
            <Box
              display='flex'
              sx={{ justifyContent: 'space-around' }}
            >
              <Counter
                label='Season:'
                options={generateSeassonsArray(10)}
                value={seassonSelected}
                onChange={(_, value) => setSeasson(value.props.value)}
                />
              <Counter
                label='Episode:'
                options={generateSeassonsArray(seassonSelected === 1 ? 11 : 10)}
                value={episodeSelected}
                onChange={(_, value) => setEpisode(value.props.value)}
              />
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
