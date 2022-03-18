import Landing from '../modules/Landing';
import SearchResult from '../modules/SearchResult';
import CharacterDetails from '../modules/CharacterDetails/CharacterDetails';
import EpisodeDetails from '../modules/EpisodeDetails/EpisodeDetails';
import LocationDetails from '../modules/location/Location';

export const routes = [
  {
    key: 'home',
    route: '/',
    component: <Landing />
  },
  {
    key: 'search',
    route: '/search',
    component: <SearchResult />
  },
  {
    key: 'details',
    route: '/details',
    component: <CharacterDetails />
  },
  {
    key: 'episode',
    route: '/episode',
    component: <EpisodeDetails />
  },
  {
    key: 'location',
    route: '/location',
    component: <LocationDetails />
  }
]
