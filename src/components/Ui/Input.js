import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import clsx from 'clsx';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    inputStyl: {
        background: '#F6F8FC',
        color: 'rgb(8 44 60 / 50%) !important',
        border: '1px solid #EEF1F5',
        borderRadius: '10px',
        padding: '13px',
        fontSize: theme.typography.body3.fontSize,
        '&:focus': {
            background: '#F6F8FC',
            borderRadius: '10px',
        }
    },
    selectBg: {
        background: theme.palette.grey[0],
        '&:focus': {
            background: theme.palette.grey[0],
        }
    },
    inputCont: {
        width: '100%',
        '& > label': {
            fontSize: theme.typography.body3.fontSize,
        },
        '& > div': {
            borderRadius: '10px',
            '& > fieldset': {
                borderWidth: 0,
            },
        },
        '& > div:before, & > div:hover:not($disabled):before, & > div:after': {
            border: '0 !important',
        },
    },
    spaceToTop: {
        marginTop: '15px'
    }
}));

// ----------------------------------------------------------------------

export default function CustomInput(props) {
    const classes = useStyles();

    return (
        <TextField
            className={clsx(classes.inputCont, classes[props.spaceToTop])}
            defaultValue={props.value}
            type={props.type}
            label={props.label}
            variant="outlined"
            inputProps={{
                className: clsx(classes.inputStyl, classes[props.selectBg]),
                onChange: props.onChange,
                name: props.name
            }} />
    );
}