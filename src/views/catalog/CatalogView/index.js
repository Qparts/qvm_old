import Page from 'src/components/Page';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Container,
    Typography,
    Divider
} from '@material-ui/core';
import CatalogSearch from './CatalogSearch';
import CarDetails from './CarDetails';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import { cleanup } from 'src/redux/slices/catalog';
// import { Roller } from "react-spinners-css";

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

function CatalogView() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { showCarInfo, isLoading } = useSelector((state) => state.catalogs);
    const { t } = useTranslation();

    useEffect(() => {
        return () => {
            dispatch(cleanup())
        }
    }, []);

    return (
        <Page
            title={t("catalogTab.title")}
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
                        <Typography variant="h4">{t("catalogTab.title")}</Typography>
                        <Divider />
                    </Box>
                    {showCarInfo == true ?
                        <CarDetails /> :
                        <CatalogSearch />
                    }

                </Container>
            </LoadingOverlay>

        </Page>
    );
}

export default CatalogView;