import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import clsx from 'clsx';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    mainBtn: {
        padding: '9px 16px',
        boxShadow: 'none',
        background: theme.palette.primary.main,
        color: theme.palette.grey[0],
        width: '100%',
        '&:hover': {
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)'
        }
    },
    topBarSearchBtn: {
        borderRadius: '0 20px 20px 0',
        width: 'auto',
    },
    btnBg: {
        background: theme.palette.grey[0] + '!important',
        color: theme.palette.primary.main,
        border: '1px solid #EEF1F5',
        marginRight: '15px'
    },
    btnWidth: {
        width: 'auto'
    },
    upgradeBtn: {
        background: '#FDD4D4 !important',
        borderRadius: '15px',
        color: theme.palette.primary.main,
        fontSize: theme.typography.body3.fontSize
    },
    weightLight: {
        fontWeight: theme.typography.fontWeightRegular
    },
    homeBtn: {
        background: 'linear-gradient(90deg, #F20505 10%, #DA1B21 100%)',
        padding: '10px 25px 15px',
        borderRadius: '30px',
        minWidth: '200px',
        transition: 'none',
        fontSize: theme.typography.subtitle1.fontSize,
        '&:hover': {
            background: theme.palette.primary.main,
            boxShadow: 'none'
        }
    },
    homeBtnLight: {
        background: 'none !important',
        color: theme.palette.primary.main,
        border: '2px solid' + theme.palette.primary.main,
    },
    flatBtn: {
        padding: '10px 30px 12px',
        borderRadius: '5px',
    }
}));

// ----------------------------------------------------------------------

export default function CustomButton(props) {
    const classes = useStyles();

    return (
        <Button
            to={props.to}
            variant="contained"
            disabled={props.disabled}
            onClick={props.onClick}
            className={clsx(
                classes.mainBtn,
                classes[props.topBarSearchBtn],
                classes[props.btnBg],
                classes[props.btnWidth],
                classes[props.upgradeBtn],
                classes[props.weightLight],
                classes[props.homeBtn],
                classes[props.homeBtnLight],
                classes[props.flatBtn]
            )}
            type={props.type}
        >
            {props.children}
        </Button>
    );
}