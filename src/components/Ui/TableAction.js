import React from 'react';
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
        display: 'inline-flex',
        alignItems: 'center'
    },
    hoverLink: {
        lineHeight: 1,
        cursor: 'pointer',
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
    },
    cursor: {
        cursor: 'pointer'
    },
    disableTableAction: {
        pointerEvents: 'none',
        opacity: 0.8,
    }
}));

// ----------------------------------------------------------------------

export default function TableAction(props) {
    const classes = useStyles();

    let tableActions;

    if (props.type === 'offerActions') {
        tableActions = (
            <Box className={clsx(classes.TableActionFlex)}>
                <Box onClick={props.addItemEvent} className={clsx(classes[props.TableActionBorder], classes.TableActionFlex, classes.hoverLink)}>
                    <Box className={classes.TableActionIcon}>
                        {props.textIcon}
                    </Box>
                    <Typography variant="body4"> {props.title} </Typography>
                </Box>
                <Box onClick={props.SearchEvent} className={clsx(classes.hoverLink, classes[props.mrItem])}>
                    {props.icon}
                </Box>
            </Box>
        )
    } else if (props.type === 'partSearch') {
        tableActions = (
            <Box
                className={clsx(classes.hoverLink, classes.TableActionFlex, classes.cursor, classes[props.disableTableAction])}
                onClick={props.onClick} >
                <Box className={classes.TableActionIcon}>
                    {props.textIcon}
                </Box>
                <Typography variant="body4"> {props.title} </Typography>
            </Box>
        )
    } else if (props.type === 'setting') {
        tableActions = (
            <Box className={classes.TableActionFlex}>
                <Box
                    className={clsx(classes.hoverLink, classes.TableActionFlex, classes.cursor, classes.TableActionBorder)}
                    onClick={props.onClick} >
                    <Box className={classes.TableActionIcon}>
                        {props.textIcon}
                    </Box>
                    <Typography variant="body4"> {props.title} </Typography>
                </Box>
                <Box
                    className={clsx(classes.hoverLink, classes.TableActionFlex, classes.cursor)}
                    onClick={props.onClick} >
                    <Box className={classes.TableActionIcon}>
                        {props.textIconDel}
                    </Box>
                    <Typography variant="body4"> {props.titleDel} </Typography>
                </Box>
            </Box>
        )
    }

    return tableActions;
}