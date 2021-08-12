import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    timeLeft: {
        display: 'flex',
        color: '#526C78'
    },
    timeLeftPercent: {
        margin: '-2px 0 0 10px',
        color: theme.palette.secondary.darker
    },
    progress: {
        background: '#ECF1F5',
        borderRadius: '10px',
        height: '5px',
    },
    progressBody: {
        display: 'block',
        height: '100%',
        background: 'linear-gradient(270deg, #F20505 0%, #F2BE05 100%)',
        borderRadius: '10px',
    }
}));

// ----------------------------------------------------------------------

export default function ProgressBar(props) {
    const classes = useStyles();

    return (
        <Box>
            <Typography variant="caption" className={classes.timeLeft}>
                {props.title}
                <Typography variant="subtitle2" className={classes.timeLeftPercent}>{props.timeLeft}</Typography>
            </Typography>
            <Box className={classes.progress}>
                <Typography variant="caption" width={props.timeLeft} className={classes.progressBody} />
            </Box>
        </Box>
    );
}