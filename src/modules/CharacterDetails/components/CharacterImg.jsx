import { Card, CardMedia } from '@mui/material';

const CharacterImg = ({ image, name }) => {
    return (
        <Card sx={{ maxWidth: "25rem" }}>
          <CardMedia
            component="img"
            image={image}
            alt={name}
          />
        </Card>
    )
}

export default CharacterImg