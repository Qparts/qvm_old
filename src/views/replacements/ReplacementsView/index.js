import Page from 'src/components/Page';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import PartReplacementsSearchSection from './PartReplacementsSearchSection';
import ReplacementItemSection from './ReplacementItemSection';
import { cleanup } from 'src/redux/slices/replacements';
import SecContainer from '../../../components/Ui/SecContainer';

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

function ReplacementsView() {
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { partReplacements = [], isLoading, error } = useSelector((state) => state.replacements);

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
                spinner={
                    <LoadingScreen />
                }
            >
                <PartReplacementsSearchSection />
                {partReplacements.length ?
                    <SecContainer
                        header={t('Replacement Parts Search results')}>
                        <Grid container spacing={2}>
                            {
                                partReplacements.map((replacementItem, index) => {
                                    return (
                                        <Grid item xs={12} md={4} key={index}>
                                            <ReplacementItemSection replacementItem={replacementItem} />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </SecContainer>
                    : ""}
                {
                    error != null && error == 'Search limit exceeded!' &&
                    <Box>
                        <Typography variant="h3" gutterBottom>
                            {error}
                        </Typography>
                    </Box>
                }
            </LoadingOverlay>
        </Page>
    );
}

export default ReplacementsView;
