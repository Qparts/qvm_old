import Page from 'src/components/Page';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import CatalogSearch from './CatalogSearch';
import CarDetails from './CarDetails';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import { cleanup } from 'src/redux/slices/catalog';

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
    wrapper: {
        width: "100%",
        height: "100%",
    },
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
            title={t("Parts Catalog")}
            className={classes.root}>
            <LoadingOverlay
                active={isLoading}
                className={classes.wrapper}
                spinner={<LoadingScreen />}>
                {showCarInfo == true ?
                    <CarDetails /> : <CatalogSearch />
                }
            </LoadingOverlay>
        </Page>
    );
}

export default CatalogView;
