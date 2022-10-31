import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LoadingOverlay from "react-loading-overlay";
import { Typography, Box } from '@material-ui/core';
import Page from 'src/components/Page';
import LoadingScreen from 'src/components/LoadingScreen';
import AddOffer from './addOffer/AddOffer';
import CustomDialog from 'src/components/Ui/Dialog';
import { PATH_APP } from 'src/routes/paths';
import Button from "src/components/Ui/Button";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({

    root: {
        boxShadow: 'none',
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            textAlign: 'left',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        [theme.breakpoints.up('xl')]: {
            height: 320
        }
    },
    overlayFullPage: {
        '& ._loading_overlay_overlay': { zIndex: 1101 }
    }
}));

// ----------------------------------------------------------------------

function SpecialOfferUpload(props) {
    const classes = useStyles();
    const { isLoading } = useSelector((state) => state.specialOfferUpload);
    const { loginObject } = useSelector((state) => state.authJwt);
    const { t } = useTranslation();

    return (
        <Page
            title={t("Special Offers")}
            className={classes.root}>
            <LoadingOverlay
                active={isLoading}
                styles={{
                    wrapper: {
                        width: "100%",
                        height: "100%",
                    },
                }}
                className={classes.overlayFullPage}
                spinner={<LoadingScreen />}>
                <CustomDialog
                    open={props.open}
                    handleClose={props.handleClose}
                    title={t("Special Offer Upload")}
                >
                    {loginObject.company.branches.length > 0 ? <AddOffer />
                        :
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }} gutterBottom>
                                {t('You must have at least a branch to be able to upload the offer')}
                            </Typography>
                            <Button btnWidth="btnWidth" component={RouterLink} to={PATH_APP.management.user.account}>
                                {t("Add Branch")}
                            </Button>
                        </Box>
                    }
                </CustomDialog>
            </LoadingOverlay>

        </Page>
    );
}

export default SpecialOfferUpload;
