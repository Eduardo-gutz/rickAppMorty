import { Card } from "@mui/material"
import './Card.css'

const CardHover = ({ sx, children }) => {
    return (
        <Card sx={sx} className='card'>
            { children }
        </Card>
    )
}

export default CardHover;