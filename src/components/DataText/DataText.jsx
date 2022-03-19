import { Typography } from '@mui/material'

/**
 * Row to show a data with structure key: value
 * @param { string } dataLabel Data label
 * @param { string } data dato que se va a mostrar
 * @param { function } onClick function that runs when clicking on the value of the data
 * @param { boolean } bigSize Boolean determining typography variant
 * @returns React Component
 */
const DataText = ({ dataLabel, data, onClick, bigSize }) => {
  return (
  // Typography for data, variants can be consulted in the 'themes.js' file
    <Typography variant={bigSize ? 'body3' : 'body2'} component='p' color='#191C2B'>
      <Typography variant={bigSize ? 'body4' : 'body1'} component='span' onClick={onClick}>{dataLabel}</Typography>&nbsp;
      {data}
    </Typography>
  )
}

export default DataText
