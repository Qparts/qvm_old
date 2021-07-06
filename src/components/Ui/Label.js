import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    labelStyl: {
        fontSize: '0.9rem',
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.secondary.darker,
        margin: '15px 0 5px',
        display: 'block',
    },
}));

// ----------------------------------------------------------------------

export default function Label(props) {
    const classes = useStyles();

    return (
        <label className={classes.labelStyl}> {props.name} </label>
    );
}