import {
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCharacters } from "../../services/characters";
import DataText from "../../components/DataText/DataText";
import CharacterImg from "./components/CharacterImg";
import DataTextLink from "./components/DataTextLink";
import EpisodeCard from "../../components/episodeCard/EpisodeCard";
import { getEpisodesById } from "../../services/episodes";
import Paginator from "../../components/pagination/Paginator";

const CharacterDetails = () => {
  const [searchParams] = useSearchParams();
  const [characterDetails, setCharacterDetails] = useState();
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const episodesPage = useMemo(() => {
    const firstElement = (currentPage - 1) * 2;
    const lastElement = firstElement + 2;
    return episodes.slice(firstElement, lastElement);
}, [currentPage, episodes]);

  useEffect(() => {
    const getCharacter = async () => {
      const id = window.atob(searchParams.get("id"));
      const character = await getCharacters(id);
      setCharacterDetails(character);
    };

    getCharacter();
  }, [searchParams]);
  
  useEffect(() => {
    const getEpisodeByCharacters = async () => {
      const ids = characterDetails.episode.map((ep) => ep.split('/').pop())
      const episodes = await getEpisodesById(ids);
      if(episodes.length) {
        setEpisodes(episodes);
      } else {
        setEpisodes([episodes]);
      }
    };

    console.log(characterDetails);

    getEpisodeByCharacters();
  }, [characterDetails]);
  return (
    <Grid container marginTop={8} justifyContent="center">
      <Grid item lg={5}>
        <CharacterImg
          image={characterDetails?.image}
          name={characterDetails?.name}
        />
      </Grid>
      <Grid item lg={7} xs={12} marginTop={3}>
        <Card sx={{ display: "flex", backgroundColor: "#477385ED" }}>
          <CardContent>
            <Typography variant="h2" color="#191C2B">
              {characterDetails?.name}
            </Typography>
            <DataText
              bigSize
              dataLabel="Status:"
              data={characterDetails?.status}
            />
            <DataText
              bigSize
              dataLabel="Specie:"
              data={characterDetails?.species}
            />
            <DataText bigSize dataLabel="Type:" data={characterDetails?.type} />
            <DataText
              bigSize
              dataLabel="Gender:"
              data={characterDetails?.gender}
            />
            <DataTextLink
              label={'Origin:'}
              data={characterDetails?.origin.name}
              buttonText='View Location'
              onClick={() => navigate(`/location?id=${characterDetails?.origin.url.split('/').pop()}`)}
            />
            <DataTextLink
              label={'Location:'}
              data={characterDetails?.location.name}
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
          {
              episodesPage.slice(0, 4).map((episode) =>
                  <Grid key={episode.id} item lg={5} sm={5} md={5} xs={10}>
                      <EpisodeCard episode={episode} />
                  </Grid>
              )
          }
        </Grid>
      </Grid>
      <Paginator changePage={(page) => setCurrentPage(page)} totalItems={episodes.length} itemsPerPage={2} currentpage={currentPage}/>
    </Grid>
  );
};

export default CharacterDetails;
