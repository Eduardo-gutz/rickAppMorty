import { Box, Typography, Button } from '@mui/material';
import DataText from '../../../components/DataText/DataText'

const DataTextLink = ({ label, data, buttonText, onClick, showButton = false }) => {
  return (
    <Box display="flex" margin={".5rem 0"}>
      <DataText
        bigSize
        dataLabel={label}
        data={data}
      />
      {
        showButton &&
        <Button
          color="letter"
          variant="outlined"
          size="small"
          sx={{ margin: "0 2rem" }}
          onClick={onClick}
        >
          <Typography variant={"body1"} component={"p"}>
            { buttonText }
          </Typography>
        </Button>
      }
    </Box>
  );
};

export default DataTextLink;