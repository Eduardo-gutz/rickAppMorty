import { CardContent, Box, Typography, CardMedia, Grid, Button } from '@mui/material'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCharacters } from '../../services/characters';
import CardHover from '../customCard/Card';
import DataText from '../DataText/DataText'

const EpisodeCard = ({ episode }) => {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ids = episode.characters.slice(2, 8).map((character) => character.split('/').pop());
    const getCharactersByEpisode = async () => {
      const characters = await getCharacters(ids);
      setCharacters(characters)
    }

    getCharactersByEpisode()
  }, [episode.characters]);
  return (
    <CardHover sx={{ display: "flex", backgroundColor: '#477385ED' }} className='card'>
      <Grid container columns={{xs: 1, lg: 2, sm: 2, md: 2}}>
        <Grid item lg={1} md={1}>
          <Grid container columns={{xs: 3}}>
            {characters.map(( character ) =>
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
