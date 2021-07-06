import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    cardFoot: {
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 85.42%)',
        borderRadius: '0px 0px 20px 20px',
        height: '36px'
    },
}));

// ----------------------------------------------------------------------

export default function CardFoot(props) {
    const classes = useStyles();

    return <Box className={classes.cardFoot} />
}