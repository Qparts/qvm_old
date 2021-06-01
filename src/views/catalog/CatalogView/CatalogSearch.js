import SearchBox from './../../../components/SearchBox';
import Button from "./../../../components/button/CustomButton";

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';


import {
    Box,
    Card,
    Grid,
    CardHeader,
    CardContent
} from '@material-ui/core';
import { getCarByVin, getCarInfo, getCatalogs, getModels, handleModelChange } from 'src/redux/slices/catalog';
import { FormControl, InputLabel, Select } from "@material-ui/core";
import { useTranslation } from 'react-i18next';



// ----------------------------------------------------------------------



const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------



function CatalogSearch() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { catalogs, models, selectedCatalog, selectedModel, isLoading } = useSelector((state) => state.catalogs);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(getCatalogs());
    }, [dispatch]);

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
                    <CardHeader title={t("catalogTab.vinTitle")} />
                    <CardContent className={classes.cardContent}>
                        <SearchBox handleSubmit={handleQuerySubmit} />
                    </CardContent >
                </Card>

            </Grid>


            <Grid item xs={6} md={6} lg={6}>
                <Card >
                    <CardHeader title={t("catalogTab.listTitle")} />
                    <CardContent className={classes.cardContent}>

                        <div className="mt-form">
                            <FormControl required className="w-100">
                                <InputLabel id="catalog-id">{t("catalogTab.catalog")}</InputLabel>
                                <Select
                                    native={true}
                                    labelId="catalog-id"
                                    id="catalog"
                                    value={selectedCatalog ? selectedCatalog.id : ""}
                                    name="catalog"
                                    onChange={(event) => {
                                        console.log(event.target.value);
                                        dispatch(getModels(event.target.value, catalogs));
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    {catalogs?.map((item, index) => (
                                        <option value={item.id} key={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <Box sx={{ mt: 3 }} />

                        <div className="mt-form">
                            <FormControl required className="w-100">
                                <InputLabel id="model-id">{t("catalogTab.model")}</InputLabel>
                                <Select
                                    native={true}
                                    labelId="model-id"
                                    id="model"
                                    value={selectedModel ? selectedModel.id : ""}
                                    name="model"
                                    onChange={(event) => {
                                        console.log(event.target.value);
                                        dispatch(handleModelChange(event.target.value, models, selectedCatalog));
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    {models?.map((item, index) => (
                                        <option value={item.id} key={index}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <Box sx={{ mt: 3 }} />
                        <Button
                            variant="contained"
                            color="primary"
                            round
                            component="span"
                            disabled={selectedCatalog == null || selectedModel == null}
                            onClick={getCars}
                        >
                            {t("catalogTab.carDetails")}
                        </Button>

                    </CardContent>
                </Card>

            </Grid>
        </Grid>


    );
}

export default CatalogSearch;
