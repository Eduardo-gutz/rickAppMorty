import { Box, Checkbox, Typography } from '@mui/material'

/**
 * Checkbox component with optional label
 * @param { string } label Checkbox label
 * @param { functtion } onChange function that runs when changing the value of the component
 * @param { boolean } defaultChecked Boolean to validate the initial state of the component
 * @param { boolean } checked Boolean Checkbox value
 * @returns React Component
 */
const CheckBox = ({ label, onChange, defaultChecked, checked }) => {
  return (
    <Box component='span'>
      <Checkbox
        onChange={onChange}
        defaultChecked={defaultChecked}
        checked={checked}
        color='secondary'
      />
      {label &&
        <Typography
          variant='body1'
          component='label'
          display='inline'
          color='#191C2B'
          sx={{ my: 1 }}
        >
          {label}
        </Typography>}
    </Box>
  )
}

export default CheckBox
