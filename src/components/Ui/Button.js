import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    catalogBtn: {
        padding: '9px 16px',
        boxShadow: 'none',
        background: theme.palette.primary.main,
        color: theme.palette.grey[0],
        width: '100%',
        '&:hover': {
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)'
        }
    }
}));

// ----------------------------------------------------------------------

export default function CustomButton(props) {
    const classes = useStyles();

    return (
        <Button
            variant="contained"
            disabled={props.disabled}
            onClick={props.onClick}
            className={classes.catalogBtn}
            type={props.type}
        >
            {props.children}
        </Button>
    );
}