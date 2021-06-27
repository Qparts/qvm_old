import Page from 'src/components/Page';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import {
    Container,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import SpecialOfferItemsSection from './SpecialOfferItemsSection';
import SpecialOfferDetails from './SpecialOfferDetails';

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
    const { t } = useTranslation();
    const { isLoading } = useSelector((state) => state.specialOffer);
    const offerId = props.match.params.id;

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
                spinner={
                    <LoadingScreen />
                }>
                <Container >
                    {offerId == null ? <SpecialOfferItemsSection /> :
                        <SpecialOfferDetails specialOfferId={offerId} />
                    }
                </Container>
            </LoadingOverlay>
        </Page>
    );
}

export default SpecialOfferView;
