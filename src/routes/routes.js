import Landing from '../modules/Landing';
import SearchResult from '../modules/SearchResult';
import CharacterDetails from '../modules/CharacterDetails/CharacterDetails';

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
  }
]
