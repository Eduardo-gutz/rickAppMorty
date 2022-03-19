import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

/**
 * Button with icon with simple functionality to return to the previous route
 * @returns React Element
 */

const ButtonBack = () => {
  const navigate = useNavigate()
  return (
    <Button size='large' variant='outlined' sx={{ marginTop: '1rem' }} color='secondary' startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>Back</Button>
  )
}

export default ButtonBack
