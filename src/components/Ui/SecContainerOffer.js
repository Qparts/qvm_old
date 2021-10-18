import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    Card,
    Typography,
    Box,
    Button
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { OfferOne, Filter } from '../../icons/icons';
import SpecialOfferUpload from '../../views/specialOfferUpload/SpecialOfferUploadView/index'

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    secContainer: {
        margin: '0 auto',
        boxShadow: ' 0px 4px 8px rgba(20, 69, 91, 0.03)',
        border: '1px solid #E7F0F7',
        borderRadius: '20px'
    },
    secHeadCont: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 15px',
        background: theme.palette.grey[0],
        borderRadius: '20px 20px 0 0',
        '@media (max-width: 450px)': {
            display: 'block',
        },
    },
    secHeader: {
        borderRadius: '20px 20px 0 0',
        color: '#14455B',
        '@media (max-width: 450px)': {
            textAlign: 'center',
            marginBottom: theme.spacing(2)
        },
    },
    secAction: {
        '@media (max-width: 450px)': {
            textAlign: 'center',
        },
    },
    secBody: {
        background: '#F6F8FC',
        boxShadow: 'none',
        padding: '15px 15px 0 15px'
    },
    secFooter: {
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.17) 0%, #FFFFFF 100%)',
        borderRadius: '0 0 20px 20px',
        padding: '13px 0',
    },
    offerBtn: {
        padding: '9px 16px',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)'
        },
        '&:first-of-type': {
            marginRight: theme.spacing(1.25),
            '@media (max-width: 335px)': {
                margin: theme.spacing(0, 0, 1.5, 0),
            },
        },
        '@media (max-width: 335px)': {
            width: '100%',
        },
    }
}));

// ----------------------------------------------------------------------

const SecContainerOffer = (props, { className, ...other }) => {
    const classes = useStyles();
    const theme = useTheme();
    const { t } = useTranslation();
    const { tags = [] } = useSelector((state) => state.specialOffer);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={clsx(classes.root, classes.secContainer, className)} {...other}>
            <Box className={classes.secHeadCont}>
                <Typography variant="h5" className={classes.secHeader}> {props.header} </Typography>
                <Box className={classes.secAction}>
                    {tags.length > 1 ?
                        <Button variant="contained" onClick={props.filter} className={classes.offerBtn} style={{ background: '#EEF2F9', color: theme.palette.secondary.main }}>
                            <Filter width='17px' height='17px' fill={theme.palette.secondary.main} />
                            <Typography variant="body2" sx={{ marginLeft: '5px' }}>{t("filter")}</Typography>
                        </Button> : null
                    }
                    <Button variant="contained" onClick={handleClickOpen} className={classes.offerBtn} style={{ background: theme.palette.primary.main, color: theme.palette.grey[0] }}>
                        <OfferOne width='21px' height='21px' fill={theme.palette.grey[0]} />
                        <Typography variant="body2" sx={{ marginLeft: '5px' }}>{t("add offer")}</Typography>
                    </Button>
                </Box>
            </Box>
            <Card className={classes.secBody}>
                {props.children}
            </Card>
            <Typography variant="subtitle2" className={classes.secFooter}></Typography>
            <SpecialOfferUpload
                open={open}
                handleClose={handleClose} />
        </div>
    )
}

export default SecContainerOffer