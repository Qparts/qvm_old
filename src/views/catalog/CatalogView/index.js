import Page from 'src/components/Page';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import {
    Box,
    Container,
    Typography
} from '@material-ui/core';
import CatalogSearch from './CatalogSearch';
import CarDetails from './CarDetails';
import { useTranslation } from 'react-i18next';

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
    const { showCarInfo } = useSelector((state) => state.catalogs);
    const { t } = useTranslation();


    return (
        <Page
            title="Catalog"
            className={classes.root}
        >
            <Container >
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4">{t("catalogTab.title")}</Typography>
                </Box>
                {showCarInfo == true ?
                    <CarDetails /> :
                    <CatalogSearch />
                }
            </Container>
        </Page>
    );
}

export default CatalogView;
