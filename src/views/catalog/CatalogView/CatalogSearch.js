import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Grid,
    MenuItem
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { getCarByVin, getCarInfo, getCatalogs, getModels, handleModelChange } from 'src/redux/slices/catalog';
import SearchBox from './../../../components/SearchBox';
import Advertisement from "./../../../components/Ui/Advertise";
import MainCard from "./../../../components/Ui/MainCard";
import Select from "./../../../components/Ui/Select";
import Button from "./../../../components/Ui/Button";

// ----------------------------------------------------------------------

function CatalogSearch() {
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
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <MainCard title={t("Find Catalog by VIN number")} sameHeight='sameHeight'>
                        <SearchBox handleSubmit={handleQuerySubmit} />
                    </MainCard>
                </Grid>

                <Grid item xs={12} md={6}>
                    <MainCard title={t("Find Catalog from List")}>
                        <Select
                            label={t("catalog")}
                            id="catalog"
                            value={selectedCatalog ? selectedCatalog.id : ""}
                            name="catalog"
                            onChange={(event) => {
                                console.log(event.target.value);
                                dispatch(getModels(event.target.value, catalogs));
                            }}>
                            <MenuItem aria-label="None" value="" />
                            {catalogs?.map((item, index) => (
                                <MenuItem value={item.id} key={index}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            label={t("Car Model")}
                            id="model"
                            value={selectedModel ? selectedModel.id : ""}
                            name="model"
                            spaceToTop="spaceToTop"
                            onChange={(event) => {
                                console.log(event.target.value);
                                dispatch(handleModelChange(event.target.value, models, selectedCatalog));
                            }}>
                            <MenuItem aria-label="None" value="" />
                            {models?.map((item, index) => (
                                <MenuItem value={item.id} key={index}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Box sx={{ mt: 3 }} />
                        <Button
                            disabled={selectedCatalog == null || selectedModel == null}
                            onClick={getCars}
                        >
                            {t("Car Details")}
                        </Button>
                    </MainCard>

                </Grid>
            </Grid>
            <Box sx={{ mt: 6 }} />
            <Advertisement width='728px' height='90px' url='/static/icons/ic_chrome.svg' />
        </>
    );
}

export default CatalogSearch;
