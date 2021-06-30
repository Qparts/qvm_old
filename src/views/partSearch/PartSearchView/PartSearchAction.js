import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { Plus } from "../../../icons/icons";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    partSearchActionIcon: {
        marginRight: '5px'
    },
    partSearchAction: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        '&:last-of-type': {
            marginRight: 0
        },
        '& span': {
            color: '#CED5D8'
        },
        '&:hover': {
            '& span': {
                color: theme.palette.primary.main
            },
            '& $svg path': {
                fill: theme.palette.primary.main
            }
        },
    },
}));

// ----------------------------------------------------------------------

export default function PartSearchAction(props) {
    const classes = useStyles();

    return (
        <Box
            className={classes.partSearchAction}
            onClick={props.onClick} >
            <Plus width='14' height='14' fill='#CED5D8' className={classes.partSearchActionIcon} />
            <Typography variant="body4"> {props.title} </Typography>
        </Box>
    )
}