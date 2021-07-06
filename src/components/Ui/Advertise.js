import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    root: {},
    advertise: {
        margin: '26px auto 0',
        '& $img': {
            margin: 'auto'
        }
    }
}));

const Advertisement = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.advertise}>
            <Link to='/app/dashboard'>
                <img src={props.url} width={props.width} height={props.height} alt='Advertise' />
            </Link>
        </div>
    )
}

export default Advertisement