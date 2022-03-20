/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Typography } from '@mui/material'
import { useEffect, useState, useMemo } from 'react'
import CharacterCard from '../components/characterCard/CharacterCard'
import EpisodeCard from '../components/episodeCard/EpisodeCard'
import { getEpisodes } from '../services/episodes'
import { getCharacters } from '../services/characters'
import { useDispatch, useSelector } from 'react-redux'
import { addCharacters, setInfo } from '../redux/characters/charactersSlice'
import { addEpisodes, setEpisodesInfo } from '../redux/episodes/episodesSlice'
import { useNavigate } from 'react-router-dom'
import Paginator from '../components/pagination/Paginator'

const Landing = () => {
  const dispatch = useDispatch()
  const episodes = useSelector((state) => state.episodes.episodes)
  const characters = useSelector((state) => state.characters.characters)
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)

  const episodesPage = useMemo(() => {
    const firstElement = (currentPage - 1) * 4
    const lastElement = firstElement + 4
    return episodes.slice(firstElement, lastElement)
  }, [currentPage, episodes])

  useEffect(() => {
    const getEpisode = async () => {
      console.log('get Episodes')
      const episodes = await getEpisodes()
      dispatch(addEpisodes(episodes.results))
      dispatch(setEpisodesInfo(episodes.info))
    }

    const getAllCharacters = async () => {
      console.log('get Characters')
      const characters = await getCharacters('')
      dispatch(addCharacters(characters.results))
      dispatch(setInfo(characters.info))
    }

    if (!characters.length) {
      getAllCharacters()
    }
    if (!episodes.length) {
      getEpisode()
    }
  }, [])

  return (
    <>
      <Typography variant='h4' color='white' noWrap sx={{ flexGrow: 1 }} marginTop={3}>
        Protagonists
      </Typography>
      <Grid container gap={3} direction='row' justifyContent='center' marginTop={2}>
        {
            characters.slice(0, 5).map((character) =>
              <Grid key={character.id} item lg={2} sm={3} md={3} xs={10}>
                <CharacterCard character={character} />
              </Grid>
            )
        }
        <Grid item xs={10} display='flex' justifyContent='center'>
          <Button
            variant='outlined'
            size='large'
            color='secondary'
            onClick={() => navigate('/search')}
          >
            View All
          </Button>
        </Grid>
      </Grid>
      <Typography variant='h4' color='white' noWrap sx={{ flexGrow: 1 }} marginTop={4}>
        Episodes
      </Typography>
      <Grid container gap={3} direction='row' justifyContent='center' marginTop={2}>
        {
                episodesPage.map((episode) =>
                  <Grid key={episode.id} item lg={5} sm={5} md={5} xs={10}>
                    <EpisodeCard episode={episode} />
                  </Grid>
                )
            }
      </Grid>
      <Paginator changePage={(page) => setCurrentPage(page)} totalItems={episodes.length} itemsPerPage={4} currentpage={currentPage} />
    </>
  )
}

export default Landing
