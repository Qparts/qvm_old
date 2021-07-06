import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Back } from '../../icons/icons';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    backBtn: {
        color: '#526C78',
        display: 'inline-block',
        cursor: 'pointer',
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    arrowBack: {
        marginLeft: '7px !important',
        width: '12px !important',
        height: '12px !important',
        transform: theme.direction === 'rtl' ? 'rotate(0)' : 'rotate(180deg)'
    }
}));

// ----------------------------------------------------------------------

export default function BackBtn(props) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Typography
            className={classes.backBtn}
            variant={props.variant}
            onClick={props.onClick}
        >
            {props.name}
            <Back
                fill={theme.palette.primary.main}
                className={classes.arrowBack} />
        </Typography>
    )
}