import Page from 'src/components/Page';
import React, { useEffect } from 'react';
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import AvailabilityPartsSection from './AvailabilityPartsSection';
import ProductInfoSection from './ProductInfoSection';
import { cleanup } from 'src/redux/slices/partSearch';
import { PATH_APP } from 'src/routes/paths';
import EmptyContent from "../../../components/Ui/EmptyContent";
import SearchBar from "../../../components/Ui/SearchBar";

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

function PartSearchView() {
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { isLoading, productInfoResult = [],
        productResult = [], error } = useSelector((state) => state.PartSearch);

    useEffect(() => {
        return () => {
            dispatch(cleanup())
        }
    }, []);

    return (
        <Page
            title={t("Search Parts")}
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

                {error != null && error === "Search limit exceeded!" ?
                    <EmptyContent
                        btnTitle={t("Upgrade to Premium")}
                        title={t("Search limit exceeded")}
                        description={t("Search limit exceeded!")}
                        url={() => history.push(PATH_APP.general.upgradeSubscription)}
                    />
                    :
                    productInfoResult.length === 0 && productResult.length === 0 && isLoading === false ?
                        <EmptyContent
                            btnHome
                            title={t("Unable to receive your order")}
                            description={t("look like there are no results for the item you were looking for")}
                        />
                        :
                        <>
                            {productResult.length > 0 && <SearchBar searchPartStyl='searchPartStyl' />}
                            {productResult.length > 0 ? <AvailabilityPartsSection /> : null}
                            {productInfoResult.length > 0 ?
                                <>
                                    <Box sx={{ mb: 6 }} />
                                    <ProductInfoSection />
                                </> : null
                            }
                        </>
                }
            </LoadingOverlay>

        </Page>
    );
}

export default PartSearchView;
