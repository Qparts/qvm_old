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
        padding: '13px 25px',
        borderRadius: '30px',
        minWidth: '200px',
        transition: 'none',
        lineHeight: '1.428571429',
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
        padding: '12px 30px',
        borderRadius: '5px',
    },
    mainBorderBtn: {
        borderColor: theme.palette.primary.main,
    },
    whiteBtn: {
        background: theme.palette.grey[0] + '!important',
        color: theme.palette.primary.main,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            background: theme.palette.primary.main + '!important',
            color: theme.palette.grey[0]
        }
    },
    widthAuto: {
        minWidth: 'auto'
    },
    btnM: {
        marginRight: '10px'
    }
}));

// ----------------------------------------------------------------------

export default function CustomButton(props) {
    const classes = useStyles();

    return (
        <Button
            to={props.to}
            pending={props.pending}
            target={props.target}
            component={props.component}
            href={props.href}
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
                classes[props.flatBtn],
                classes[props.mainBorderBtn],
                classes[props.whiteBtn],
                classes[props.widthAuto],
                classes[props.btnM]
            )}
            type={props.type}
        >
            {props.children}
        </Button>
    );
}