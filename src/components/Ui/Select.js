import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { TextField } from '@material-ui/core';

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
    selectBg: {
        background: theme.palette.grey[0],
        '&:focus': {
            background: theme.palette.grey[0],
        }
    },
    dateFilter: {
        position: 'absolute',
        right: '0',
        top: '-47px',
        zIndex: '10',
    },
    datePadding: {
        padding: '5px 10px'
    },
    spaceToTop: {
        marginTop: '15px'
    },
    dateFilterWidth: {
        width: 'auto'
    }
}));

// ----------------------------------------------------------------------

export default function DropDownList(props) {
    const classes = useStyles();

    return (
        <TextField
            select
            fullWidth
            label={props.label}
            id={props.id}
            className={clsx(classes.inputCont, classes[props.dateFilter], classes[props.spaceToTop],  classes[props.dateFilterWidth])}
            value={props.value}
            onChange={props.onChange}
            variant="outlined"
            {...props.getField}
            error={Boolean(props.touched && props.errors)}
            helperText={props.touched && props.errors}
            inputProps={{
                className: clsx(classes.inputStyl, classes[props.selectBg], classes[props.datePadding]),
                onChange: props.onChange,
                name: props.name
            }}
        >
            {props.children}
        </TextField>
    );
}