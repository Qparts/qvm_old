import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    Card,
    Typography,
} from '@material-ui/core';


// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    root: {},
    secContainer: {
        margin: '26px auto 0',
        boxShadow: ' 0px 4px 8px rgba(20, 69, 91, 0.03)',
        border: '1px solid #E7F0F7',
        borderRadius: '20px'
    },
    secHeader: {
        background: '#fff',
        borderRadius: '20px 20px 0 0',
        padding: '10px 20px',
        color: '#14455B',
    },
    secBody: {
        background: '#F6F8FC',
        boxShadow: 'none',
        padding: '20px 20px 0 20px'
    },
    secFooter: {
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.17) 0%, #FFFFFF 100%)',
        borderRadius: '0 0 20px 20px',
        padding: '13px 0',
        justifyContent: 'center',
        display: 'flex'
    },
    more: {
        margin: '5px 10px 0 10px'
    },
    fontWeight500: {
        fontWeight: 500
    }
}));

const SecContainer = (props, { className, ...other }) => {
    const classes = useStyles();
    return (
        <div className={clsx(classes.root, classes.secContainer, className)} {...other}>
            <Typography variant="h5" className={classes.secHeader}> {props.header} </Typography>
            <Card className={classes.secBody}>
                {props.children}
            </Card>
            <Link to='/special-offer'>
                <Typography variant="subtitle2" className={classes.secFooter}>
                    <Typography variant="caption" className={classes.more}>{props.icon}</Typography>
                    <Typography variant="h5" className={classes.fontWeight500}>{props.footer}</Typography>
                </Typography>
            </Link>
        </div>
    )
}

export default SecContainer