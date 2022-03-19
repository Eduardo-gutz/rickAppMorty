import { useState,useEffect, useMemo } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import DataText from '../../components/DataText/DataText'
import { useSearchParams } from 'react-router-dom';
import { getEpisodesById } from '../../services/episodes';
import { getCharacters } from '../../services/characters';
import CharacterCard from '../../components/characterCard/CharacterCard';
import Paginator from '../../components/pagination/Paginator';
import ButtonBack from '../../components/buttons/ButtonBack'

const EpisodeDetails = () => {
  const [episode, setEpisode] = useState();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [characters, setCharacters] = useState([]);

  const characterPage = useMemo(() => {
        const firstElement = (currentPage - 1) * 10;
        const lastElement = firstElement + 10;
        return characters.slice(firstElement, lastElement);
    }, [currentPage, characters]);

  useEffect(() => {
    const getEpisode = async () => {
      const id = window.atob(searchParams.get('id'))
      const episode = await getEpisodesById(id);
      setEpisode(episode)
    }

    getEpisode();
  }, [searchParams]);
  
  useEffect(() => {
    const getCharactersByEpisode = async () => {
      const ids = episode.characters.map((character) => character.split('/').pop())
      const characters = await getCharacters(ids);
      setCharacters(characters)
    }

    getCharactersByEpisode();
  }, [episode]);
  return (
    <>
    <ButtonBack />
    <Grid container marginTop={1} justifyContent="center">
      <Grid item lg={7} xs={12} marginTop={3}>
        <Card sx={{ display: "flex", backgroundColor: "#477385ED" }}>
          <CardContent>
            <Typography variant="h2" color="#191C2B">
              {episode?.name}
            </Typography>
            <DataText
              bigSize
              dataLabel="Air date:"
              data={episode?.air_date}
            />
            <DataText
              bigSize
              dataLabel="Episode:"
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
              {
                  characterPage.map((character) =>
                      <Grid key={character.id} item lg={2} sm={3} md={3} xs={10}>
                          <CharacterCard character={character} />
                      </Grid>
                  )
              }
          </Grid>
      </Grid>
      <Paginator changePage={(page) => setCurrentPage(page)} totalItems={characters.length} itemsPerPage={10} currentpage={currentPage}/>
    </Grid>
    </>
  )
}

export default EpisodeDetails;