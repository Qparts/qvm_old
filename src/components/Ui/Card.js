import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid #E7F0F7',
        boxShadow: '0px 4px 8px rgb(20 69 91 / 3%)',
        borderRadius: '20px',
    },
    upgradeCard: {
        position: 'relative',
        padding: '50px 10px 45px',
        textAlign: 'center',
        height: 'calc(100% - 0px)',
    },
    cardPad: {
        padding: '10px 15px',
    },
    cardBg: {
        background: '#F6F8FC',
    }
}));

// ----------------------------------------------------------------------

MainCard.propTypes = {
    className: PropTypes.string
};

function MainCard(props, { className, ...other }) {
    const classes = useStyles();

    return (
        <Card className={clsx(
            classes.root,
            classes[props.cardPad],
            classes[props.cardBg],
            classes[props.upgradeCard],
            className
        )}
            {...other}>
            {props.children}
        </Card>
    );
}

export default MainCard;
