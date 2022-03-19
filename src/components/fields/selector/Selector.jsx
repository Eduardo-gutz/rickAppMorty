import { Box, Select, MenuItem, Typography } from '@mui/material'

/**
 * Selector component
 * @param { string } label label to select
 * @param { {label: string | number, value: string | number,}[] } options Arrangement of options to be displayed in the selector
 * @returns React Component
 */
const Selector = ({ label, options = [], value, onChange }) => {
  return (
    <Box>
      {label &&
        <Typography
          color='#191C2B'
          variant='body1'
          component='p'
        >
          {label}
        </Typography>}
      <Select
        onChange={onChange}
        sx={{ width: '5rem' }}
        value={value}
        color='secondary'
      >
        {options.map((opt) =>
          <MenuItem key={opt.value} value={opt.value}>{opt.label || ''}</MenuItem>
        )}
      </Select>
    </Box>
  )
}

export default Selector
