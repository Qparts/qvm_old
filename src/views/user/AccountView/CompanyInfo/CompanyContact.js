import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Phone, Mail } from '../../../../icons/icons';
import Avatar from '../../../../components/Ui/Avatar';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    partsMb: {
        marginBottom: '7px'
    },
    CompanyContactFlex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    CompanyContactMt: {
        marginTop: '43px'
    }
}));

// ----------------------------------------------------------------------

function CompanyContact() {
    const classes = useStyles();
    const theme = useTheme();

    const { loginObject } = useSelector((state) => state.authJwt);

    return (
        <Box className={clsx(classes.CompanyContactFlex, classes.CompanyContactMt)}>
            <Typography variant="body1" className={classes.companyName}>
                {loginObject.subscriber.mobile}+
            </Typography>
            <Avatar bgGrey="bgGrey" avatarMr="avatarMr">
                <Phone width='20' height='20' fill={theme.palette.secondary.main} />
            </Avatar>
            <Avatar bgGrey="bgGrey" avatarMr="avatarMr">
                <Mail width='25' height='16' fill={theme.palette.secondary.main} />
            </Avatar>
            <Avatar bgGrey="bgGrey" avatarMr="avatarMr">
                <img src='/static/images/whatsapp.svg' alt='WhatsAppIcon' width="34px" height="34px" />
            </Avatar>
        </Box>
    );
}

export default CompanyContact;
