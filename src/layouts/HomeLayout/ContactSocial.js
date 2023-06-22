import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Box, Grid } from '@material-ui/core';
import { Phone, Location, Company } from 'src/icons/icons';

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
        "& svg, & img": { marginRight: theme.spacing(1) },
        '& span': {
            '@media (max-width: 1095px) and (min-width: 960px)': {
                fontSize: '0.77rem',
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
                    <Grid item xs={12} md={6} sm={6}>
                        <Box className={classes.contactSocialItem}>
                            <Location width='20' height='20' fill='#7E8D99' />
                            <Typography variant="body3">
                                10th Street, al-Waha Dist. Dammam, Kingdom of Saudi Arabia
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={2} sm={6}>
                        <Box className={classes.contactSocialItem}>
                            <Company width='20' height='20' fill='#7E8D99' />
                            <Typography variant="body3"> Postal Code: 34252 </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={2} sm={6}>
                        <Box className={classes.contactSocialItem}>
                            <Phone width='20' height='20' fill='#7E8D99' className={classes.Phone} />
                            <Typography variant="body3"> 966115201339+ </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={2} sm={6}>
                        <Box className={classes.contactSocialItem}>
                            <img src='/static/images/whatsapp.svg' alt='WhatsAppIcon' width="22" height="22" />
                            <Typography variant="body3"> 966536014655+ </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>

    );
}

export default ContactSocial;
