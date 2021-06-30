import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    filterResult: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.6em',
        borderRadius: '10rem',
        background: '#F6F8FC',
        fontSize: theme.typography.body2.fontSize,
        margin: '5px 5px 0',
        '& svg': {
            width: '16px',
            height: '16px',
            cursor: 'pointer',
            marginLeft: '5px',
        }
    },
}));

// ----------------------------------------------------------------------

export default function FilterResult(props) {
    const classes = useStyles();

    return (
        <Box
            className={classes.filterResult}
            style={{ backgroundColor: props.bg }}
            key={props.key}>
            {props.children}
        </Box>
    )
}