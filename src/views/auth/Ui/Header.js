import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Hidden, Link, Box } from '@material-ui/core';
import Logo from 'src/components/Logo';
import LogoDark from 'src/components/LogoDark';
import Languages from 'src/layouts/DashboardLayout/TopBar/Languages';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    header: {
        top: 0,
        zIndex: 9,
        lineHeight: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        padding: theme.spacing(3),
        justifyContent: 'space-between',
        [theme.breakpoints.up('md')]: {
            alignItems: 'flex-start',
            padding: theme.spacing(7, 5, 0, 7)
        },
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center'
        }
    },
}));

// ----------------------------------------------------------------------

function HeaderAuth(props) {
    const classes = useStyles();

    return (
        <header className={classes.header}>
            <RouterLink to="/">
                <Hidden mdDown>
                    <Box sx={{ textAlign: 'center' }}>
                        <Logo newLogo='newLogo' />
                        <Typography variant='caption' sx={{ color: '#fff', fontSize: '11px' }}>QVM Home</Typography>
                    </Box>
                </Hidden>
                <Hidden mdUp>
                    <Box sx={{ textAlign: 'center' }}>
                        <LogoDark />
                        <Typography variant='caption' sx={{ color: 'rgba(237,28,36,255)', fontSize: '11px' }}>QVM Home</Typography>
                    </Box>
                </Hidden>
            </RouterLink>
            <Hidden smDown>
                <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                    {props.auth} &nbsp;
                    <Link
                        underline="none"
                        variant="subtitle2"
                        component={RouterLink}
                        to={props.url}
                        onClick={props.onClick}
                    >
                        {props.title}
                    </Link>
                    <Languages />
                </Typography>
            </Hidden>
        </header>
    );
}

export default HeaderAuth;
