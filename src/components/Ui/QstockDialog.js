import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Link } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CustomDialog from './Dialog';
import Button from './Button';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    qstockDialogText: {
        padding: theme.spacing(4, 5),
        color: theme.palette.grey[0],
        textAlign: 'center',
        '@media (max-width: 514px) and (min-width: 300px)': {
            '& h6, img:last-of-type': { width: '100%' }
        }
    },
    middleText: {
        whiteSpace: 'break-spaces',
        margin: theme.spacing(4, 'auto', 2.5),
        width: theme.direction === 'rtl' ? '70%' : '86%',
    }
}));

// ----------------------------------------------------------------------

const QstockDialog = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <CustomDialog
            open={props.open}
            handleClose={props.handleClose}
            Qstock='Qstock'
        >
            <Box className={classes.qstockDialogText}>
                <Box
                    component="img"
                    alt="QVM"
                    src={"/static/icons/qStock-logo-white.svg"}
                    width={170}
                    sx={{ margin: 'auto' }}
                />
                <Typography noWrap variant="subtitle1" className={classes.middleText}>
                    {t("An integrated accounting system with exclusive features and advantages for managing spare parts stores")}
                </Typography>
                <Box
                    component="img"
                    alt="QVM"
                    src={"/static/images/q-stock.png"}
                    width='95%'
                    sx={{ margin: 'auto' }}
                />
                <Box sx={{ mt: 2.5 }} />
                <Button
                    homeBtn="homeBtn"
                    component={Link}
                    target="_blank"
                    href='https://stock.qvm.parts/'
                >
                    {t("Visit Qstock")}
                </Button>
            </Box>
        </CustomDialog>
    )
}

export default QstockDialog