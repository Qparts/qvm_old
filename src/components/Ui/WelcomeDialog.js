import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CustomDialog from './Dialog';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    welcomeText: {
        padding: theme.spacing(3, 3.5),
        marginTop: theme.spacing(2),
        color: '#333',
        textAlign: 'center'
    },
    middleText: {
        whiteSpace: 'break-spaces',
        margin: theme.spacing(1.5, 0)
    }
}));

// ----------------------------------------------------------------------

const WelcomeDialog = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <CustomDialog
            open={props.open}
            handleClose={props.handleClose}
            welcomePopUp='welcomePopUp'
        >
            <Box className={classes.welcomeText}>
                <Box
                    component="img"
                    alt="QVM"
                    src={"/static/icons/QVM-logo.png"}
                    width={170}
                    sx={{ margin: 'auto' }}
                />
                <Box sx={{ mt: 3 }}>
                    <Typography noWrap variant="body1"> {t("Dear Merchant")} </Typography>
                    <Typography noWrap variant="subtitle1" className={classes.middleText}>
                        {t("The QVM platform has been launched in its new look with features that meet your needs and aspirations, and we are always happy to serve you")}
                    </Typography>
                    <Typography noWrap variant="body1" sx={{ whiteSpace: 'break-spaces' }}>
                        {t("If you have any questions do not hesitate to contact us to serve you")}
                    </Typography>
                </Box>
            </Box>
        </CustomDialog>
    )
}

export default WelcomeDialog