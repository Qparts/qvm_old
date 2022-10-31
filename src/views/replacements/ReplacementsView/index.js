import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import PartReplacementsSearchSection from './PartReplacementsSearchSection';
import ReplacementItemSection from './ReplacementItemSection';
import Page from 'src/components/Page';
import { cleanup } from 'src/redux/slices/replacements';
import { PATH_APP } from 'src/routes/paths';
import SecContainer from '../../../components/Ui/SecContainer';
import EmptyContent from "../../../components/Ui/EmptyContent";

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

function ReplacementsView() {
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { partReplacements = [], isLoading, error, partReplacementStatus } = useSelector((state) => state.replacements);

    useEffect(() => {
        return () => {
            dispatch(cleanup())
        }
    }, []);

    return (
        <Page
            title={t("replacementsTab.title")}
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
                className={classes.overlayFullPage}
                spinner={
                    <LoadingScreen />
                }
            >
                <PartReplacementsSearchSection />
                {error != null && error == 'Search limit exceeded!' ?
                    <EmptyContent
                        btnTitle={t("Upgrade to Premium")}
                        title={t("Search limit exceeded")}
                        description={t("You used 5 of the 5 searches available in the free plan Upgrade to the premium package to enjoy unlimited searching")}
                        url={() => history.push(PATH_APP.general.upgradeSubscription)}
                    />
                    :
                    partReplacements.length ?
                        <SecContainer
                            header={t('Replacement Parts Search results')}>
                            <Grid container spacing={2}>
                                {
                                    partReplacements.map((replacementItem, index) => {
                                        return (
                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                <ReplacementItemSection replacementItem={replacementItem} />
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        </SecContainer> : partReplacements.length === 0 && partReplacementStatus === true ?
                            <EmptyContent
                                btnHome
                                title={t("Unable to receive your order")}
                                description={t("look like there are no results for the item you were looking for")}
                            /> : null
                }
            </LoadingOverlay>
        </Page>
    );
}

export default ReplacementsView;
