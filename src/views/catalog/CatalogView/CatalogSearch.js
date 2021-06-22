import SearchBox from './../../../components/SearchBox';
import Button from "./../../../components/button/CustomButton";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Card,
    Grid,
    CardHeader,
    CardContent,
    TextField
} from '@material-ui/core';
import { getCarByVin, getCarInfo, getModels, handleModelChange } from 'src/redux/slices/catalog';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------

function CatalogSearch() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { models, selectedCatalog, selectedModel, isLoading } = useSelector((state) => state.catalogs);
    const { catalogs } = useSelector((state) => state.authJwt);
    const { t } = useTranslation();

    const getCars = () => {
        dispatch(getCarInfo(selectedCatalog.id, selectedModel.id, null))
    };

    const handleQuerySubmit = (vin) => {
        dispatch(getCarByVin(vin))
    };

    return (

        <Grid container spacing={3}>

            <Grid item xs={6} md={6} lg={6}>
                <Card >
                    <CardHeader title={t("Find Catalog by VIN number")} />
                    <CardContent className={classes.cardContent}>
                        <SearchBox handleSubmit={handleQuerySubmit} />
                    </CardContent >
                </Card>

            </Grid>


            <Grid item xs={6} md={6} lg={6}>
                <Card >
                    <CardHeader title={t("Find Catalog from List")} />
                    <CardContent className={classes.cardContent}>

                        <TextField
                            select
                            fullWidth
                            label={t("Catalog")}
                            id="catalog"
                            value={selectedCatalog ? selectedCatalog.id : ""}
                            name="catalog"
                            onChange={(event) => {
                                dispatch(getModels(event.target.value, catalogs));
                            }}
                            SelectProps={{ native: true }}
                        >
                            <option aria-label="None" value="" />
                            {catalogs?.map((item, index) => (
                                <option value={item.id} key={index}>
                                    {item.name}
                                </option>
                            ))}
                        </TextField>

                        <Box sx={{ mt: 3 }} />

                        <TextField
                            select
                            fullWidth
                            label={t("Car Model")}
                            id="model"
                            value={selectedModel ? selectedModel.id : ""}
                            name="model"
                            onChange={(event) => {
                                dispatch(handleModelChange(event.target.value, models, selectedCatalog));
                            }}
                            SelectProps={{ native: true }}
                        >
                            <option aria-label="None" value="" />
                            {models?.map((item, index) => (
                                <option value={item.id} key={index}>
                                    {item.name}
                                </option>
                            ))}
                        </TextField>

                        <Box sx={{ mt: 3 }} />

                        <Button
                            variant="contained"
                            color="primary"
                            round
                            component="span"
                            disabled={selectedCatalog == null || selectedModel == null}
                            onClick={getCars}
                        >
                            {t("Car Details")}
                        </Button>

                    </CardContent>
                </Card>

            </Grid>
        </Grid>
    );
}

export default CatalogSearch;
