import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Box, Grid } from '@material-ui/core';
import { Phone, Mail, Location } from 'src/icons/icons';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#f7f7f7',
        padding: theme.spacing(3, 0),

    },
    contactSocialItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        "& svg": { marginRight: theme.spacing(1) },
        '& span': {
            '@media (max-width: 1049px) and (min-width: 960px)': {
                fontSize: '0.848rem',
            }
        },
    },
    Phone: {
        transform: theme.direction === 'rtl' ? 'rotate(100deg)' : 'rotate(0)'
    },
}));

// ----------------------------------------------------------------------

ContactSocial.propTypes = {
    className: PropTypes.string
};

function ContactSocial({ className }) {
    const classes = useStyles();

    return (
        <Box className={clsx(classes.root, className)} position='relative'>
            <Container maxWidth="lg">
                <Grid container spacing={2} >
                    <Grid item xs={12} md={6}>
                        <Box className={classes.contactSocialItem}>
                            <Location width='20' height='20' fill='#7E8D99' />
                            <Typography variant="body3">
                                10th Street, al-Waha Dist. Dammam, Kingdom of Saudi Arabia
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box className={classes.contactSocialItem}>
                            <Phone width='20' height='20' fill='#7E8D99' className={classes.Phone} />
                            <Typography variant="body3"> 966582702017 </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Box className={classes.contactSocialItem}>
                            <Mail width='20' height='20' fill='#7E8D99' />
                            <Typography variant="body3"> info@qetaa.parts </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>

    );
}

export default ContactSocial;
