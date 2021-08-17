import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, MenuItem, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { getCarInfo, getCatalogs, getModels, handleModelChange } from 'src/redux/slices/catalog';
import Button from '../../../components/Ui/Button';
import TextField from '../../../components/Ui/TextField';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    catalogHead: {
        backgroundColor: theme.palette.grey[0],
        padding: '5px 15px 15px'
    }
}));

// ----------------------------------------------------------------------

export default function CatalogHead() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { catalogs, models, selectedCatalog, selectedModel } = useSelector((state) => state.catalogs);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(getCatalogs());
    }, [dispatch]);

    const getCars = () => {
        dispatch(getCarInfo(selectedCatalog.id, selectedModel.id, null))
    };

    return (
        <div className={classes.catalogHead}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={5} sm={6}>
                    <TextField
                        type='select'
                        label={t("catalog")}
                        id="catalog"
                        value={selectedCatalog ? selectedCatalog.id : ""}
                        name="catalog"
                        spaceToTop="spaceToTop"
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
                    </TextField>
                </Grid>
                <Grid item xs={12} md={5} sm={6}>
                    <TextField
                        type='select'
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
                    </TextField>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Box sx={{ mt: { xs: 0, md: 2.25 } }}>
                        <Button
                            disabled={selectedCatalog == null || selectedModel == null}
                            onClick={getCars}>
                            {t("Car Details")}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}