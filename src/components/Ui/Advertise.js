import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    root: {},
    advertise: {
        '& $img': {
            width: '100%',
            height: '100%'
        }
    },
    advertiseMt: {
        margin: '34px auto 0',
    }
}));

// ----------------------------------------------------------------------

const Advertisement = (props) => {
    const classes = useStyles();
    return (
        <div className={clsx(classes.advertise, classes[props.advertiseMt])} style={{ width: props.width, height: props.height }}>
            <Link to='/app/dashboard'>
                <img src={props.url} alt='Advertise' />
            </Link>
        </div>
    )
}

export default Advertisement