import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    TableActionIcon: {
        marginLeft: '5px'
    },
    TableActionBorder: {
        paddingRight: '10px',
        marginRight: '10px',
        borderRight: '1px solid #CED5D8',
    },
    TableActionFlex: {
        display: 'flex',
    },
    hoverLink: {
        '& span': {
            color: '#CED5D8'
        },
        '& span, & $svg path': {
            transition: 'all 0.2s ease-in-out',
        },
        '&:hover': {
            '& span': {
                color: theme.palette.primary.main + '!important'
            },
            '& $svg path': {
                fill: theme.palette.primary.main + '!important'
            }
        },
    },
    mrItem: {
        marginLeft: '15px',
    }
}));

// ----------------------------------------------------------------------

export default function TableAction(props) {
    const classes = useStyles();

    return (
        <Box className={clsx(classes.TableActionFlex)}>
            <Link to={props.link} className={clsx(classes[props.TableActionBorder], classes.TableActionFlex, classes.hoverLink)}>
                <Typography variant="body4"> {props.title} </Typography>
                <Box className={classes.TableActionIcon}>
                    {props.textIcon}
                </Box>
            </Link>
            <Link to={props.linkSearch} className={clsx(classes.hoverLink, classes[props.mrItem])}>
                {props.icon}
            </Link>
        </Box>
    );
}