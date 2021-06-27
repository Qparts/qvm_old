import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    root: {},
    advertise: {
        margin: '34px auto 0',
        '& $img': {
            width: '100%',
            height: '100%'
        }
    }
}));

// ----------------------------------------------------------------------

const Advertisement = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.advertise} style={{ width: props.width, height: props.height }}>
            <Link to='/app/dashboard'>
                <img src={props.url} alt='Advertise' />
            </Link>
        </div>
    )
}

export default Advertisement