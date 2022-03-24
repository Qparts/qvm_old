import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PATH_PAGE } from 'src/routes/paths';
import Card from 'src/components/Ui/Card';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    unActivUserCont: {
        width: '60%',
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(6),
        [theme.breakpoints.down('md')]: { width: '100%' }
    },
    backHome: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(2.5),
        '& p': { marginRight: theme.spacing(1.5) }
    }
}));

// ----------------------------------------------------------------------

function UnActiveUser() {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Box className={classes.unActivUserCont}>
            <Card cardUnActivPad="cardUnActivPad">
                <Typography variant="h4" gutterBottom>
                    {t("This account is not activated")}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {t("This account must be activated through the admin in order to be able to log in")}
                </Typography>
                <Box className={classes.backHome}>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        {t("back to")}
                    </Typography>
                    <Link to={PATH_PAGE.common.home}>{t("home")}</Link>
                </Box>
            </Card>
        </Box>
    );
}

export default UnActiveUser;