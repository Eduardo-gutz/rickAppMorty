import { Card } from '@mui/material'
import './Card.css'

/**
 * Card component, wrapping with climbing effect when doing Hover
 * @param {sx, children} param0 Exposed prop of the Card component of material
 * @returns React Component
 */
const CardHover = ({ sx, children }) => {
  return (
    <Card sx={sx} className='card'>
      {children}
    </Card>
  )
}

export default CardHover
