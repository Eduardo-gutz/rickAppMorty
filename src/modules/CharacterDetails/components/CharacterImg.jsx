import { Card, CardMedia } from '@mui/material'

/**
 * Character image Big size
 * @param { string } image url to obtain the character image
 * @returns React Component
 */
const CharacterImg = ({ image, name }) => {
  return (
    <Card sx={{ maxWidth: '25rem' }}>
      <CardMedia
        component='img'
        image={image}
        alt={name}
      />
    </Card>
  )
}

export default CharacterImg
