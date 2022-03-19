import { useState, useEffect, useMemo } from 'react'
import { Grid, Card, CardContent, Typography } from '@mui/material'
import DataText from '../../components/DataText/DataText'
import { useSearchParams } from 'react-router-dom'
import { getEpisodesById } from '../../services/episodes'
import { getCharacters } from '../../services/characters'
import CharacterCard from '../../components/characterCard/CharacterCard'
import Paginator from '../../components/pagination/Paginator'
import ButtonBack from '../../components/buttons/ButtonBack'
import useSearchCharactersByURL from '../../customHooks/useSearchCharacters'

const EpisodeDetails = () => {
  const [episode, setEpisode] = useState()
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1) // Current page of the characters paginator
  const [characters, setCharacters] = useState([]) // Arrayof characters that appear in the episode
  const [existent, notFoundIds, setURLS] = useSearchCharactersByURL()

  // Characters that will be shown on the current page
  const characterPage = useMemo(() => {
    const perPage = 10 // Number of elements that will be shown by page
    const firstElement = (currentPage - 1) * perPage// Index where the cut began to the array
    const lastElement = firstElement + perPage // index where the cut of the array ends
    return characters.slice(firstElement, lastElement)
  }, [currentPage, characters])

  useEffect(() => {
    /**
     * Get the data episode to endpoint
     */
    const getEpisode = async () => {
      const id = window.atob(searchParams.get('id'))
      const episode = await getEpisodesById(id)
      setURLS(episode.characters) // Update the Characters Search Hook
      setEpisode(episode)
    }

    getEpisode()
  }, [searchParams])

  useEffect(() => {
    // Add existing characters in Redux
    setCharacters(existent)

    // Petition to bring the characters that do not exist in Redux from the Endpoint
    const getCharactersByEpisode = async () => {
      const characters = await getCharacters(notFoundIds)
      if (characters.length) {
        setCharacters((value) => [...value, ...characters])
      } else {
        setCharacters((value) => [...value, characters])
      }
    }

    if (notFoundIds.length) getCharactersByEpisode()
  }, [notFoundIds])
  return (
    <>
      <ButtonBack />
      <Grid container marginTop={1} justifyContent='center'>
        {/* Episode data */}
        <Grid item lg={7} xs={12} marginTop={3}>
          <Card sx={{ display: 'flex', backgroundColor: '#477385ED' }}>
            <CardContent>
              <Typography variant='h2' color='#191C2B'>
                {episode?.name}
              </Typography>
              <DataText
                bigSize
                dataLabel='Air date:'
                data={episode?.air_date}
              />
              <DataText
                bigSize
                dataLabel='Episode:'
                data={episode?.episode}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={12} xs={12} marginTop={3}>
          <Typography variant='h4' color='white' noWrap>
            Characters in this episode
          </Typography>
          <Grid container gap={3} direction='row' justifyContent='center' marginTop={2}>
            {/* Characters that appear in the episode */}
            {
                  characterPage.map((character) =>
                    <Grid key={character.id} item lg={2} sm={3} md={3} xs={10}>
                      <CharacterCard character={character} />
                    </Grid>
                  )
              }
          </Grid>
        </Grid>
        <Paginator changePage={(page) => setCurrentPage(page)} totalItems={characters.length} itemsPerPage={10} currentpage={currentPage} />
      </Grid>
    </>
  )
}

export default EpisodeDetails
