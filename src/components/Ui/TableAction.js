import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    TableActionIcon: {
        marginRight: '5px'
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
        marginRight: '15px',
    },
    cursor: {
        cursor: 'pointer'
    }
}));

// ----------------------------------------------------------------------

export default function TableAction(props) {
    const classes = useStyles();

    let tableActions;

    if (props.type === 'offerActions') {
        tableActions = (
            <Box className={clsx(classes.TableActionFlex)}>
                <Link to={props.linkSearch} className={clsx(classes.hoverLink, classes[props.mrItem])}>
                    {props.icon}
                </Link>
                <Link to={props.link} className={clsx(classes[props.TableActionBorder], classes.TableActionFlex, classes.hoverLink)}>
                    <Box className={classes.TableActionIcon}>
                        {props.textIcon}
                    </Box>
                    <Typography variant="body4"> {props.title} </Typography>
                </Link>
            </Box>
        )
    } else if (props.type === 'partSearch') {
        tableActions = (
            <Box
                className={clsx(classes.hoverLink, classes.TableActionFlex, classes.cursor)}
                onClick={props.onClick} >
                <Box className={classes.TableActionIcon}>
                    {props.textIcon}
                </Box>
                <Typography variant="body4"> {props.title} </Typography>
            </Box>
        )
    }

    return tableActions;
}