import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid #E7F0F7',
        boxShadow: '0px 4px 8px rgb(20 69 91 / 3%)',
        borderRadius: '20px',
    },
    cardHead: {
        color: theme.palette.secondary.main,
        padding: '10px 15px',
        background: theme.palette.grey[0],
        borderBottom: '1px solid #ECF1F5',
        '& .MuiCardHeader-content': {
            flex: 'initial'
        }
    },
    cardBod: {
        padding: '20px',
        '&:last-child': {
            paddingBottom: '20px'
        }
    },
    addMargin: {
        margin: '34px auto 0'
    },
    sameHeight: {
        height: 'calc(100% - 0px)'
    },
    cardPadd: {
        padding: '20px 15px'
    }
}));

// ----------------------------------------------------------------------

MainCard.propTypes = {
    className: PropTypes.string
};

function MainCard(props, { className, ...other }) {
    const classes = useStyles();

    return (
        <Card className={clsx(classes.root, classes[props.addMargin], classes[props.sameHeight], className)} {...other}>
            <CardHeader className={classes.cardHead} title={props.title} />
            <CardContent className={clsx(classes.cardBod, classes[props.cardPadd])}>
                {props.children}
            </CardContent>
        </Card>
    );
}

export default MainCard;
