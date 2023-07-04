import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import clsx from 'clsx';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    customAvatar: {
        width: 34,
        height: 34,
        flexShrink: 0,
        display: 'flex',
        borderRadius: "50%",
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.grey[200]
    },
    bgGrey: {
        background: '#ECF1F5'
    },
    avatarMr: {
        marginLeft: '10px'
    },
    lastChildBg: {
        background: theme.palette.secondary.main + '!important',
        color: theme.palette.grey[0],
    },
    avatarWidth: {
        width: 30,
        height: 30,
    }
}));

// ----------------------------------------------------------------------

export default function CustomAvatar(props) {
    const classes = useStyles();

    return (
        <Box className={clsx(
            classes.customAvatar,
            classes[props.bgGrey],
            classes[props.avatarMr],
            classes[props.lastChildBg],
            classes[props.avatarWidth])
        }>
            {props.children}
        </Box>
    )
}