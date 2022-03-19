import { CardContent, Box, Typography, CardMedia, Grid, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addCharacters } from '../../redux/characters/charactersSlice'
import { getCharacters } from '../../services/characters'
import CardHover from '../customCard/Card'
import DataText from '../DataText/DataText'
import useSearchCharactersByURL from '../../customHooks/useSearchCharacters'

/**
 * Card component to show data from an episode and 6 images of characters of the same
 * @param { object } episode Object with episode data
 * @returns React Component
 */
const EpisodeCard = ({ episode }) => {
  const dispatch = useDispatch()
  const [existent, notFoundIds] = useSearchCharactersByURL(episode.characters) // hook to search charcters en redux, view 'useSearchCharacters.js'
  const [characters, setCharacters] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setCharacters(existent)

    /**
     * Function to get the characters that do not exist in Redux
     */
    const getCharactersByEpisode = async () => {
      const characters = await getCharacters(notFoundIds) // Get the characters from the endpoint
      dispatch(addCharacters(characters)) // Add the characters to Redux
      // Validate if the endpoint responds with one or more characters
      if (characters.length) {
        setCharacters((value) => [...value, ...characters])
      } else {
        setCharacters((value) => [...value, characters])
      }
    }
    if (notFoundIds.length) {
      getCharactersByEpisode()
    }
  }, [notFoundIds])
  return (
    <CardHover sx={{ display: 'flex', backgroundColor: '#477385ED' }} className='card'>
      <Grid container columns={{ xs: 1, lg: 2, sm: 2, md: 2 }}>
        <Grid item lg={1} md={1}>
          <Grid container columns={{ xs: 3 }}>
            {/* 6 first characters that appear in the episode */}
            {characters.slice(0, 6).map((character) =>
              <Grid key={character.id} item xs={1}>
                <CardMedia
                  component='img'
                  image={character.image}
                  alt={character.name}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item lg={1} md={1} maxWidth='100%' minWidth='50%' width='100%'>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '100%', justifyContent: 'center' }}>
            <CardContent sx={{ flex: '1 0 auto', maxWidth: '100%' }}>
              {/* Title of the episode */}
              <Typography
                variant='subtitle1'
                component='p'
                color='#191C2B'
                noWrap
              >
                {episode.name}
              </Typography>
              {/* Episode data */}
              <DataText dataLabel='Episode:' data={episode.episode} />
              <DataText dataLabel='Air date:' data={episode.air_date} />
            </CardContent>
            {/* Botton to go to the Details section of the episode */}
            <Button variant='contained' size='small' color='secondary' sx={{ width: '80%' }} onClick={() => navigate(`/episode?id=${window.btoa(episode.id)}`)}>
              More
            </Button>
          </Box>
        </Grid>
      </Grid>
    </CardHover>
  )
}

export default EpisodeCard
