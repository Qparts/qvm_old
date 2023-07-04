import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} from '@material-ui/core';
import clsx from 'clsx';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    accordionCont: {
        border: 'none',
        boxShadow: 'none !important',
        '&:before': {
            display: 'none'
        }
    },
    accordionSummary: {
        padding: 0
    },
    accordionDetails: {
        borderTop: '1px solid #E7F0F7',
        padding: 0
    },
    resetBorder: {
        borderTop: 0
    },
    accordionStyle: {
        paddingTop: theme.spacing(1),
        borderTop: '5px solid #F6F8FC',
        marginTop: theme.spacing(1),
    },
    subscriptionHistoryHead: {
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.secondary.main
    },
}));

// ----------------------------------------------------------------------

export default function CustomAccordion(props) {
    const classes = useStyles();

    return (
        <Accordion
            defaultExpanded={props.expand ? true : false}
            className={clsx(classes.accordionCont, classes[props.accordionStyle])}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                aria-label="Expand"
                className={classes.accordionSummary}>
                {props.title ?
                    props.title :
                    <Typography variant="body1" className={classes.subscriptionHistoryHead}>{props.head}</Typography>
                }
            </AccordionSummary>
            <AccordionDetails className={clsx(classes.accordionDetails, classes[props.resetBorder])}>
                {props.children}
            </AccordionDetails>
        </Accordion>
    )
}