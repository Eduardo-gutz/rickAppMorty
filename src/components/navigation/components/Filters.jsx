import { Typography, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import CheckBox from '../../fields/checkbox/Checkbox'
import Selector from '../../fields/selector/Selector'

/**
 * Filter menu for search
 * @param { boolean } activeMenu Boolean to activate the filter menu
 * @param { function } setFilters Function to send the selected filters ready for the URL
 * @returns React Component
 */
const Filters = ({ activeMenu, setFilters }) => {
  const [seassonSelected, setSeasson] = useState(0)
  const [episodeSelected, setEpisode] = useState(0)
  const [filtersCharacter, setFiltersCharacters] = useState({ filter: '', value: false }) // Character Status Filter
  const [filtersGender, setFiltersGender] = useState({ filter: '', value: false }) // Filter for the character's gender

  useEffect(() => {
    const filterChar = filtersCharacter.value ? `&s=${window.btoa(filtersCharacter.filter)}` : ''
    const filterGen = filtersGender.value ? `&g=${window.btoa(filtersGender.filter)}` : ''
    const seasson = seassonSelected > 0 ? seassonSelected <= 9 ? `0${seassonSelected}` : `${seassonSelected}` : ''
    const episode = episodeSelected > 0 ? episodeSelected <= 9 ? `0${episodeSelected}` : `${episodeSelected}` : ''

    const filterSeasson = `&e=${window.btoa('S' + seasson + 'E' + episode)}`
    setFilters(`${filterChar}${filterGen}${seasson !== '' && episode !== '' ? filterSeasson : ''}`)
  }, [seassonSelected, episodeSelected, filtersCharacter, filtersGender, setFilters])

  const generateSeassonsArray = (limit) => {
    const array = new Array(limit + 1).fill(1, 0)

    return array.map((_, index) => ({ value: index, label: index }))
  }
  return (
    <Box
      component='form'
      className={`menu ${activeMenu && 'active'}`}
      position='fixed'
    >
      <Box
        component='span'
      >
        <Typography
          variant='body2'
          component='p'
          color='#191C2B'
          sx={{ my: 1, mx: 1.5 }}
        >
          Characters
        </Typography>
        <Typography
          variant='body2'
          component='p'
          display='inline'
          color='#191C2B'
          sx={{ my: 1, mx: 0.1 }}
        >
          Status:
        </Typography>
        <Box>
          <CheckBox
            label='Alive'
            checked={filtersCharacter.filter === 'alive'}
            onChange={(_, value) => value ? setFiltersCharacters({ filter: 'alive', value: value }) : setFiltersCharacters({ filter: '', value: false })}
          />
          <CheckBox
            label='Dead'
            checked={filtersCharacter.filter === 'dead'}
            onChange={(_, value) => value ? setFiltersCharacters({ filter: 'dead', value: value }) : setFiltersCharacters({ filter: '', value: false })}
          />
          <CheckBox
            label='Unknow'
            checked={filtersCharacter.filter === 'unknown'}
            onChange={(_, value) => value ? setFiltersCharacters({ filter: 'unknown', value: value }) : setFiltersCharacters({ filter: '', value: false })}
          />
        </Box>
        <Typography
          variant='body2'
          component='p'
          display='inline'
          color='#191C2B'
          sx={{ my: 1 }}
        >
          Gender:
        </Typography>
        <Box>
          <CheckBox
            label='Female'
            checked={filtersGender.filter === 'female'}
            onChange={(_, value) => value ? setFiltersGender({ filter: 'female', value: value }) : setFiltersGender({ filter: '', value: false })}
          />
          <CheckBox
            label='Male'
            checked={filtersGender.filter === 'male'}
            onChange={(_, value) => value ? setFiltersGender({ filter: 'male', value: value }) : setFiltersGender({ filter: '', value: false })}
          />
          <CheckBox
            label='Genderless'
            checked={filtersGender.filter === 'genderless'}
            onChange={(_, value) => value ? setFiltersGender({ filter: 'genderless', value: value }) : setFiltersGender({ filter: '', value: false })}
          />
          <CheckBox
            label='Unknow'
            checked={filtersGender.filter === 'unknown'}
            onChange={(_, value) => value ? setFiltersGender({ filter: 'unknown', value: value }) : setFiltersGender({ filter: '', value: false })}
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
          color='#191C2B'
          sx={{ my: 1, mx: 1.5 }}
        >
          Episodes
        </Typography>
        <Box
          display='flex'
          sx={{ justifyContent: 'space-around' }}
        >
          <Selector
            label='Season:'
            options={generateSeassonsArray(10)}
            value={seassonSelected}
            onChange={(_, value) => setSeasson(value.props.value)}
          />
          <Selector
            label='Episode:'
            options={generateSeassonsArray(seassonSelected === 1 ? 11 : 10)}
            value={episodeSelected}
            onChange={(_, value) => setEpisode(value.props.value)}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Filters
