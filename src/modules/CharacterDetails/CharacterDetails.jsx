import {
  Typography,
  Grid,
  Card,
  CardContent
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getCharacters } from '../../services/characters'
import DataText from '../../components/DataText/DataText'
import CharacterImg from './components/CharacterImg'
import DataTextLink from './components/DataTextLink'
import EpisodeCard from '../../components/episodeCard/EpisodeCard'
import { getEpisodesById } from '../../services/episodes'
import Paginator from '../../components/pagination/Paginator'
import ButtonBack from '../../components/buttons/ButtonBack'
import { useDispatch, useSelector } from 'react-redux'
import { addCharacters } from '../../redux/characters/charactersSlice'
import useSearchEpisodeByURL from '../../customHooks/useSearchEpisode'

/**
 * Section to see the details of the selected character
 * @returns React component
 */
const CharacterDetails = () => {
  const dispatch = useDispatch()
  const characters = useSelector((state) => state.characters.characters)
  const [searchParams] = useSearchParams()
  const [characterDetails, setCharacterDetails] = useState()
  const [episodes, setEpisodes] = useState([]) // Episodes where the character appears
  const [currentPage, setCurrentPage] = useState(1) // Current page of the episodes pagination
  const navigate = useNavigate()
  const [existent, notFoundIds, setEpisodesToSearch] = useSearchEpisodeByURL()

  // Episodes that will be shown on the current page
  const episodesPage = useMemo(() => {
    const perPage = 2 // Number of elements that will be shown by page
    const firstElement = (currentPage - 1) * perPage // Index where the cut began to the array
    const lastElement = firstElement + perPage // index where the cut of the array ends
    return episodes.slice(firstElement, lastElement)
  }, [currentPage, episodes])

  useEffect(() => {
    /**
     * Search for the character in the state of Redux if it does not exist a request for endpoint
     */
    const getCharacter = async () => {
      const id = window.atob(searchParams.get('id'))
      let character = characters.find((char) => Number(char.id) === Number(id))

      // if the character does not exist in Redux makes the petition
      if (!character) {
        character = await getCharacters(id)
        dispatch(addCharacters([character])) // Add the new character to the Redux
      }
      setCharacterDetails(character)
      setEpisodesToSearch(character.episode) // Update the episodes search hook with episodes where the character appears
    }

    getCharacter()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, searchParams])

  useEffect(() => {
    // Add the Episodes Array the existing episodes in Redux
    setEpisodes(existent)

    // If there are episodes that do not exist the redux makes a request to bring them
    const getEpisodeByCharacters = async () => {
      const episodes = await getEpisodesById(notFoundIds)
      if (episodes.length) {
        setEpisodes((value) => [...value, ...episodes])
      } else {
        setEpisodes((value) => [...value, episodes])
      }
    }

    if (notFoundIds.length) {
      getEpisodeByCharacters()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notFoundIds])
  return (
    <>
      <ButtonBack />
      <Grid container marginTop={1} justifyContent='center'>
        {/* Image of the character */}
        <Grid item lg={5}>
          <CharacterImg
            image={characterDetails?.image}
            name={characterDetails?.name}
          />
        </Grid>
        <Grid item lg={7} xs={12} marginTop={3}>
          {/* Data of the character */}
          <Card sx={{ display: 'flex', backgroundColor: '#477385ED' }}>
            <CardContent>
              <Typography variant='h2' color='#191C2B'>
                {characterDetails?.name}
              </Typography>
              <DataText
                bigSize
                dataLabel='Status:'
                data={characterDetails?.status}
              />
              <DataText
                bigSize
                dataLabel='Specie:'
                data={characterDetails?.species}
              />
              <DataText bigSize dataLabel='Type:' data={characterDetails?.type} />
              <DataText
                bigSize
                dataLabel='Gender:'
                data={characterDetails?.gender}
              />
              <DataTextLink
                label='Origin:'
                data={characterDetails?.origin.name}
                showButton={characterDetails?.origin.url !== ''}
                buttonText='View Location'
                onClick={() => navigate(`/location?id=${characterDetails?.origin.url.split('/').pop()}`)}
              />
              <DataTextLink
                label='Location:'
                data={characterDetails?.location.name}
                showButton={characterDetails?.location.url !== ''}
                buttonText='View Location'
                onClick={() => navigate(`/location?id=${characterDetails?.location.url.split('/').pop()}`)}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={12} xs={12} marginTop={3}>
          <Typography variant='h4' color='white' noWrap>
            Character episodes
          </Typography>
          <Grid container gap={3} direction='row' justifyContent='center' marginTop={2}>
            {/* Episodes where the character appears */}
            {
              episodesPage.slice(0, 4).map((episode) =>
                <Grid key={episode.id} item lg={5} sm={5} md={5} xs={10}>
                  <EpisodeCard episode={episode} />
                </Grid>
              )
          }
          </Grid>
        </Grid>
        <Paginator changePage={(page) => setCurrentPage(page)} totalItems={episodes.length} itemsPerPage={2} currentpage={currentPage} />
      </Grid>
    </>
  )
}

export default CharacterDetails
