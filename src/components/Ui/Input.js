import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import clsx from 'clsx';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    inputStyl: {
        background: '#F6F8FC',
        color: theme.palette.secondary.darker + '!important',
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
    },
    inputTopBarSearch: {
        borderRadius: '20px 0px 0px 20px',
        '&:focus': {
            borderRadius: '20px 0px 0px 20px',
        }
    },
    inputContTopBarSearch: {
        '& > div': {
            borderRadius: '20px 0px 0px 20px',
        },
    },
}));

// ----------------------------------------------------------------------

export default function CustomInput(props) {
    const classes = useStyles();

    return (
        <TextField
            className={clsx(classes.inputCont, classes[props.spaceToTop], classes[props.inputContTopBarSearch])}
            value={props.value}
            type={props.type}
            label={props.label}
            id={props.id}
            variant="outlined"
            {...props.getField}
            error={Boolean(props.touched && props.errors)}
            helperText={props.touched && props.errors}
            inputProps={{
                className: clsx(classes.inputStyl, classes[props.selectBg], classes[props.inputTopBarSearch]),
                onChange: props.onChange,
                name: props.name
            }} />
    );
}