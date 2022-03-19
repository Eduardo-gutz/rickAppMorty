import { Box, Typography, Button } from '@mui/material'
import DataText from '../../../components/DataText/DataText'

/**
 *
 * @param { string } label label to data
 * @param { string } data value
 * @param { string } buttonText
 * @param { function } onClikc function that will be executed when clicking on the button
 * @param { boolean } showButton
 * @returns
 */
const DataTextLink = ({ label, data, buttonText, onClick, showButton = false }) => {
  return (
    <Box display='flex' margin='.5rem 0'>
      <DataText
        bigSize
        dataLabel={label}
        data={data}
      />
      {
        showButton &&
          <Button
            color='letter'
            variant='outlined'
            size='small'
            sx={{ margin: '0 2rem' }}
            onClick={onClick}
          >
            <Typography variant='body1' component='p'>
              {buttonText}
            </Typography>
          </Button>
      }
    </Box>
  )
}

export default DataTextLink
