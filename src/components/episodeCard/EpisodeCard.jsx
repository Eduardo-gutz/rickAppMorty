import { CardContent, Box, Typography, CardMedia, Grid, Button } from '@mui/material'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCharacters } from '../../redux/characters/charactersSlice';
import { getCharacters } from '../../services/characters';
import CardHover from '../customCard/Card';
import DataText from '../DataText/DataText';
import useSearchCharactersByURL from '../../customHooks/useSearchCharacters';

const EpisodeCard = ({ episode }) => {
  const dispatch = useDispatch()
  const [existent, notFoundIds] = useSearchCharactersByURL(episode.characters);
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCharacters(existent)
    const getCharactersByEpisode = async () => {
      const characters = await getCharacters(notFoundIds);
      dispatch(addCharacters(characters))
      if(characters.length) {
        setCharacters((value) => [...value, ...characters])
      } else {
        setCharacters((value) => [...value, characters])
      }
    }
    if(notFoundIds.length) {
      getCharactersByEpisode()
    }
  }, [notFoundIds]);
  return (
    <CardHover sx={{ display: "flex", backgroundColor: '#477385ED' }} className='card'>
      <Grid container columns={{xs: 1, lg: 2, sm: 2, md: 2}}>
        <Grid item lg={1} md={1}>
          <Grid container columns={{xs: 3}}>
            {characters.slice(0, 6).map(( character ) =>
              <Grid key={character.id} item xs={1}>
                <CardMedia
                  component="img"
                  image={ character.image }
                  alt={ character.name }
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item lg={1} md={1}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                variant="subtitle1"
                component="p"
                color='#191C2B'
                noWrap
              >
                { episode.name }
              </Typography>
              <DataText dataLabel='Episode:' data={ episode.episode } />
              <DataText dataLabel='Air date:' data={ episode.air_date } />
            </CardContent>
            <Button variant="contained" size='small' color='secondary' sx={{width: '80%'}} onClick={() => navigate(`/episode?id=${window.btoa(episode.id)}`)}>
              More
            </Button>
          </Box>
        </Grid>
      </Grid>
    </CardHover>
  );
};

export default EpisodeCard;
