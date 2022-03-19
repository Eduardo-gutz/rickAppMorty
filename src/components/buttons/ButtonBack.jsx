import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const ButtonBack = () => {
    const navigate = useNavigate();
    return (
        <Button size='large' variant='outlined' sx={{marginTop: '1rem'}} color='secondary' startIcon={<ArrowBackIcon/>} onClick={() => navigate(-1)}>Back</Button>
    )
}

export default ButtonBack