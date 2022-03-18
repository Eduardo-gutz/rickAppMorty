import { Box, Checkbox, Typography } from '@mui/material'

const CheckBox = ({ label, onChange, defaultChecked, checked }) => {
  return (
    <Box component="span">
      <Checkbox
        onChange={onChange}
        defaultChecked={defaultChecked}
        checked={checked}
        color='secondary'
      />
      {label &&
        <Typography
            variant="body1"
            component="label"
            display="inline"
            color={"#191C2B"}
            sx={{ my: 1 }}
        >
            { label }
        </Typography>
      }
    </Box>
  );
};

export default CheckBox;
