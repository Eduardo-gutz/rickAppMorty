import { useState, useEffect, useMemo } from 'react'
import { Grid, Card, CardContent, Typography } from '@mui/material'
import DataText from '../../components/DataText/DataText'
import { useSearchParams } from 'react-router-dom'
import { getLocation } from '../../services/location'
import { getCharacters } from '../../services/characters'
import CharacterCard from '../../components/characterCard/CharacterCard'
import Paginator from '../../components/pagination/Paginator'
import ButtonBack from '../../components/buttons/ButtonBack'
import useSearchCharactersByURL from '../../customHooks/useSearchCharacters'

const LocationDetails = () => {
  const [location, setLocation] = useState()
  const [searchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1) // Current page to Characters Paginator
  const [characters, setCharacters] = useState([]) // Residents of Location
  const [existent, notFoundIds, setUrls] = useSearchCharactersByURL()

  // Characters that will be shown on the current page
  const characterPage = useMemo(() => {
    const perPage = 10 // Number of elements that will be shown by page
    const firstElement = (currentPage - 1) * perPage// Index where the cut began to the array
    const lastElement = firstElement + perPage // index where the cut of the array ends
    return characters.slice(firstElement, lastElement)
  }, [currentPage, characters])

  useEffect(() => {
    /**
     * petition to bring the data from the location
     */
    const getLocationById = async () => {
      const id = searchParams.get('id')
      const location = await getLocation(id)
      setUrls(location?.residents) // The Character Search Hook is updated
      setLocation(location)
    }

    getLocationById()
  }, [searchParams])

  useEffect(() => {
    // The existing characters in Redux are added
    setCharacters(existent)

    // A request is made to bring the characters that do not exist in Redux
    const getCharactersByLocation = async () => {
      const characters = await getCharacters(notFoundIds)
      if (characters.length) {
        setCharacters((value) => [...value, ...characters])
      } else {
        setCharacters((value) => [...value, characters])
      }
    }

    if (notFoundIds.length) getCharactersByLocation()
  }, [notFoundIds])
  return (
    <>
      <ButtonBack />
      <Grid container marginTop={1} justifyContent='center'>
        <Grid item lg={7} xs={12} marginTop={3}>
          <Card sx={{ display: 'flex', backgroundColor: '#477385ED' }}>
            <CardContent>
              <Typography variant='h2' color='#191C2B'>
                {location?.name}
              </Typography>
              <DataText
                bigSize
                dataLabel='Type:'
                data={location?.type}
              />
              <DataText
                bigSize
                dataLabel='Dimension:'
                data={location?.dimension}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={12} xs={12} marginTop={3}>
          <Typography variant='h4' color='white' noWrap>
            Residents
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
        </Grid>
        <Paginator changePage={(page) => setCurrentPage(page)} totalItems={characters.length} itemsPerPage={10} currentpage={currentPage} />
      </Grid>
    </>
  )
}

export default LocationDetails
