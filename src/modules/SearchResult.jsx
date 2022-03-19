import { useCallback, useEffect, useState, useMemo } from 'react'
import { Typography, Grid } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import CharacterCard from '../components/characterCard/CharacterCard'
import EpisodeCard from '../components/episodeCard/EpisodeCard'
import { getCharactersSearch } from '../services/characters'
import { getEpisodesSearch } from '../services/episodes'
import Paginator from '../components/pagination/Paginator'
import ButtonBack from '../components/buttons/ButtonBack'

const SearchResult = () => {
  const [charactersResult, setCharactersResult] = useState([])
  const [episodesResult, setEpisodesResult] = useState([])
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageEpisodes, setCurrentPageEpisodes] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [nextPage, setNextPage] = useState(null)

  const characterPage = useMemo(() => {
    const firstElement = (currentPage - 1) * 10
    const lastElement = firstElement + 10
    return charactersResult.slice(firstElement, lastElement)
  }, [currentPage, charactersResult])

  const episodesPage = useMemo(() => {
    const firstElement = (currentPageEpisodes - 1) * 2
    const lastElement = firstElement + 2
    return episodesResult.slice(firstElement, lastElement)
  }, [currentPageEpisodes, episodesResult])

  const getParam = useCallback((param, name) => {
    const searchParam = searchParams.get(param)
    if (!searchParam) return ''
    const filter = window.atob(searchParam)

    if (filter) {
      return `${name}=${filter}`
    } else {
      return ''
    }
  }, [searchParams])

  const getCharacters = async (filter) => {
    const characters = await getCharactersSearch(`?${filter}`)
    setTotalItems(characters.info.count)
    setNextPage(characters.info.next)
    setCharactersResult((value) => [...value, ...characters.results])
  }

  const getEpisodes = async (filter) => {
    const episodes = await getEpisodesSearch(`?${filter}`)
    setTotalItems(episodes.info.count)
    setNextPage(episodes.info.next)
    setEpisodesResult((value) => [...value, ...episodes.results])
  }

  useEffect(() => {
    setCharactersResult([])
    setEpisodesResult([])
    setCurrentPage(1)
    const name = getParam('n', 'name')
    const status = getParam('s', 'status')
    const gender = getParam('g', 'gender')
    const episode = getParam('e', 'episode')

    const filterChar = [name, status, gender].join('&')
    const filterEp = [name, episode].join('&')

    getCharacters(filterChar)
    getEpisodes(filterEp)
  }, [getParam])

  useEffect(() => {
    if (nextPage && characterPage.length === 0) {
      console.log('nueva peticion')
      const filter = nextPage.split('?')[1]
      getCharacters(filter)
    }
  }, [characterPage])
  return (
    <>
      <ButtonBack />
      <Typography variant='h4' color='white' noWrap sx={{ flexGrow: 1 }} marginTop={1}>
        Characters
      </Typography>
      <Grid container gap={3} direction='row' justifyContent='center' marginTop={2}>
        {
                characterPage.map((character) =>
                  <Grid key={character.id} item lg={2} sm={3} md={3} xs={10}>
                    <CharacterCard character={character} />
                  </Grid>
                )
            }
      </Grid>
      <Paginator changePage={(page) => setCurrentPage(page)} totalItems={totalItems} itemsPerPage={10} currentpage={currentPage} />
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
      <Paginator changePage={(page) => setCurrentPageEpisodes(page)} totalItems={episodesResult.length} itemsPerPage={2} currentpage={currentPageEpisodes} />
    </>
  )
}

export default SearchResult
