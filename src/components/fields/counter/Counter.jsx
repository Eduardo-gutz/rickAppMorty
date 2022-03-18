import { Box, Select, MenuItem, Typography } from "@mui/material"

const Counter = ({ label, options=[], value, onChange }) => {
    return (
        <Box>
            {label &&
                <Typography
                    color='#191C2B'
                    variant="body1"
                    component={'p'}
                >
                    { label }
                </Typography>
            }
            <Select
                onChange={onChange}
                sx={{ width: '5rem' }}
                value={value}
                color='secondary'
            >
                {options.map((opt) =>
                    <MenuItem key={opt.value} value={opt.value}>{ opt.label || '' }</MenuItem>
                )}
            </Select>
        </Box>
    )
}

export default Counter;