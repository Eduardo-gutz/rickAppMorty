import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getPrincipalCharacters } from '../services/characters'
import CharacterCard from '../components/characterCard/CharacterCard'
import EpisodeCard from '../components/episodeCard/EpisodeCard'
import { getEpisodes } from '../services/episodes'

const Landing = () => {
  const [characters, setCharacters] = useState([])
  const [episodes, setEpisode] = useState([])

  useEffect(() => {
    const getChar = async () => {
      const protagonists = await getPrincipalCharacters()
      setCharacters(protagonists)
    }
    
    const getEpisode = async () => {
      const episodes = await getEpisodes()
      setEpisode(episodes.results)
    }

    getChar()
    getEpisode()
  }, [])
  return (
    <>
      <Typography variant='h4' color='white' noWrap sx={{ flexGrow: 1 }} marginTop={3}>
        Protagonists
      </Typography>
      <Grid container gap={3} direction='row' justifyContent='center' marginTop={2}>
        {
            characters.map((character) =>
                <Grid key={character.id} item lg={2} sm={3} md={3} xs={10}>
                    <CharacterCard character={character} />
                </Grid>
            )
        }
      </Grid>
      <Typography variant='h4' color='white' noWrap sx={{ flexGrow: 1 }} marginTop={4}>
        Episodes
      </Typography>
      <Grid container gap={3} direction='row' justifyContent='center' marginTop={2}>
        {
            episodes.slice(0, 4).map((episode) =>
                <Grid key={episode.id} item lg={5} sm={5} md={5} xs={10}>
                    <EpisodeCard episode={episode} />
                </Grid>
            )
        }
      </Grid>
    </>
  )
}

export default Landing
