import { Typography } from '@mui/material'


const DataText = ({ dataLabel, data, onClick, bigSize }) => {
    return (
        <Typography variant={bigSize ? 'body3' : 'body2'} component={'p'} color={'#191C2B'}>
            <Typography variant={bigSize ? 'body4' : 'body1'} component={'span'} onClick={onClick}>{ dataLabel }</Typography>&nbsp;
            { data }
        </Typography>
    )
}

export default DataText;