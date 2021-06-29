import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    advertise: {
        margin: '34px auto 0',
        background:theme.palette.grey[0],
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