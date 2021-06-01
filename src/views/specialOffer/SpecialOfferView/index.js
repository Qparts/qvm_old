import Page from 'src/components/Page';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
    Box,
    Container,
    Typography
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import SpecialOfferItemsSection from './SpecialOfferItemsSection';
import SpecialOfferDetails from './SpecialOfferDetails';
import { setSelectedOffer } from 'src/redux/slices/specialOffer';
import CalendarTodayRoundedIcon from '@material-ui/icons/CalendarTodayRounded';
import helper from 'src/utils/helper';


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
    }
}));

// ----------------------------------------------------------------------

function SpecialOfferView(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const location = useLocation();
    const { isLoading, selectedOffer, companies } = useSelector((state) => state.specialOffer);
    const offerId = props.match.params.id;
    const { themeDirection } = useSelector((state) => state.settings);


    useEffect(() => {
        if (!offerId) {
            dispatch(setSelectedOffer({ selectedOffer: null }));
        }
    }, [])


    return (
        <Page
            title={t("specialOfferTab.title")}
            className={classes.root}
        >

            <LoadingOverlay
                active={isLoading}
                styles={{
                    wrapper: {
                        width: "100%",
                        height: "100%",
                    },
                }}
                spinner={
                    <LoadingScreen />

                }
            >
                <Container >
                    <Box sx={{ pb: 5 }}>
                        {selectedOffer == null || offerId == null ? <Typography variant="h4">{t("specialOfferTab.title")}</Typography> :
                            <>
                                <div className="row">
                                    <div className="col-12">
                                        <Typography variant="h4">
                                            {themeDirection == 'rtl' ? selectedOffer.offerNameAr :
                                                selectedOffer.offerName}
                                        </Typography>
                                    </div>
                                </div>

                                <div className="row">
                                    <Typography style={{ marginLeft: 20, marginRight: 20 }}>
                                        {themeDirection == 'rtl' ? companies.get(selectedOffer.companyId).nameAr :
                                            companies.get(selectedOffer.companyId).name}
                                    </Typography>
                                    <CalendarTodayRoundedIcon />
                                    <Typography style={{ marginLeft: 20, marginRight: 20 }}>
                                        {t("specialOfferTab.startIn")}  {helper.toDate(selectedOffer.endDate)}
                                    </Typography>

                                    <Typography style={{ marginLeft: 20, marginRight: 20 }}>
                                        {t("specialOfferTab.expiresIn")}  {helper.toDate(selectedOffer.endDate)}
                                    </Typography>

                                </div>
                            </>}
                        <hr />
                    </Box>


                    {offerId == null ? <SpecialOfferItemsSection /> :
                        <SpecialOfferDetails specialOfferId={offerId} />
                    }


                </Container>
            </LoadingOverlay>

        </Page>
    );
}

export default SpecialOfferView;
