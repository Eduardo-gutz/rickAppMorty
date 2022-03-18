import { useState,useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import DataText from '../../components/DataText/DataText'
import { useSearchParams } from 'react-router-dom';
import { getEpisodesById } from '../../services/episodes';

const EpisodeDetails = () => {
  const [episode, setEpisode] = useState();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getEpisode = async () => {
      const id = window.atob(searchParams.get('id'))
      const episode = await getEpisodesById(id);
      setEpisode(episode)
    }

    getEpisode();
  }, [searchParams]);
  return (
    <Grid container marginTop={8} justifyContent="center">
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
    </Grid>
  )
}

export default EpisodeDetails;