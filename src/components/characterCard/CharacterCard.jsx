import { CardMedia, Button } from '@mui/material'
import './CharacterCard.css'
import DataText from '../DataText/DataText'
import CardHover from '../customCard/Card'
import { useNavigate } from 'react-router-dom'

/**
 * Card to show the image and the data of the character
 * @param { character } param0 Character object from Endpoint
 * @returns React Element
 */
const CharacterCard = ({ character }) => {
  const navigate = useNavigate()
  return (
    <CardHover>
      {/* hidden section with the basic information of the character, is shown by having Hover in the Card */}
      <div className='character-card__info'>
        <span>
          <DataText dataLabel='Name:' data={character.name} />
          <DataText dataLabel='Status:' data={character.status} />
          <DataText dataLabel='Origin:' data={character.origin.name} />
          <DataText dataLabel='Specie:' data={character.species} />
        </span>
        {/* Button to navigate to the details of the character */}
        <Button variant='contained' size='small' color='secondary' onClick={() => navigate(`/details?id=${window.btoa(character.id)}`)}>
          More
        </Button>
      </div>
      {/* Image of the character */}
      <CardMedia component='img' image={character.image} alt={character.name} />
    </CardHover>
  )
}

export default CharacterCard
