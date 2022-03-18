import { CardMedia, Button } from '@mui/material'
import './CharacterCard.css'
import DataText from '../DataText/DataText'
import CardHover from '../customCard/Card'
import { useNavigate } from 'react-router-dom'

const CharacterCard = ({ character }) => {
  const navigate = useNavigate();
  return (
    <CardHover>
      <div className='character-card__info'>
        <span>
          <DataText dataLabel='Name:' data={ character.name } />
          <DataText dataLabel='Status:' data={ character.status } />
          <DataText dataLabel='Origin:' data={ character.origin.name } />
          <DataText dataLabel='Specie:' data={ character.species } />
        </span>
        <Button variant="contained" size='small' color='secondary' onClick={() => navigate(`/details?id=${window.btoa(character.id)}`)}>
          More
        </Button>
      </div>
      <CardMedia component='img' image={ character.image } alt={ character.name } />
    </CardHover>
  )
}

export default CharacterCard
