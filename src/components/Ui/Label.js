import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    labelStyl: {
        fontSize: '0.9rem',
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.secondary.darker,
        margin: theme.spacing(1.875, 0, 0.625),
        display: 'block',
    },
    specialOfferLabel: {
        backgroundColor: '#FEE6E6',
        color: theme.palette.primary.main,
        borderRadius: '5px 0 5px 5px',
        padding: theme.spacing(0.5, 0.875),
        marginLeft: theme.spacing(0.625)
    },
    cursorStyl: {
        cursor: 'pointer'
    }
}));

// ----------------------------------------------------------------------

export default function Label(props) {
    const classes = useStyles();

    return (
        <>
            {props.specialOffer ?
                <Typography variant="caption" className={clsx(classes.specialOfferLabel, classes[props.cursorStyl],)} onClick={props.click}>
                    {props.label}
                </Typography>
                :
                <label className={classes.labelStyl}> {props.name} </label>}
        </>
    );
}