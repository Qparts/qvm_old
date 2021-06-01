import Page from 'src/components/Page';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Container,
    Typography
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import PartReplacementsSearchSection from './PartReplacementsSearchSection';
import ReplacementItemSection from './ReplacementItemSection';
import { cleanup } from 'src/redux/slices/replacements';


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
                <Container >
                    <Box sx={{ pb: 5 }}>
                        <Typography variant="h4">{t("replacementsTab.title")}</Typography>
                        <hr />
                    </Box>

                    <PartReplacementsSearchSection />

                    <Box sx={{ mb: 6 }} />

                    <div className="row">
                        {
                            partReplacements.map((replacementItem, index) => {
                                return (
                                    <div className="col-md-6" key={index}>
                                        <ReplacementItemSection replacementItem={replacementItem} />
                                        <Box sx={{ mb: 6 }} />
                                    </div>

                                )
                            })
                        }
                    </div>


                    {
                        error != null && error == 'Search limit exceeded!' &&

                        <div className="row d-flex justify-content-center">



                            <div className="col-md-6">

                                <Typography variant="h3" gutterBottom>
                                    {error}
                                </Typography>
                            </div>
                        </div>
                    }

                </Container>
            </LoadingOverlay>

        </Page>
    );
}

export default ReplacementsView;
