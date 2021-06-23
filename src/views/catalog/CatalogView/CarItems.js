import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Button from "./../../../components/button/CustomButton";


import {
    Card,
    Grid,
    CardHeader,
    CardContent
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { getGroups } from 'src/redux/slices/catalog';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------

function CarItems() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { cars, selectedCatalog, fromList } = useSelector((state) => state.catalogs);
    const { t } = useTranslation();

    return (

        <Grid container spacing={3}>

            <Grid item xs={12} md={12} lg={12}>
                <Card style={{ overflowX: 'scroll' }}>
                    <CardHeader title={t("Car Details")} />
                    <CardContent className={classes.cardContent}>
                        <div>
                            <table className="table table-bordered mt-3 catalog-result">
                                <thead>
                                    <tr>
                                        <th>{t("Brand")}</th>
                                        <th>{t("Description")}</th>

                                        {cars[0].parameters.map((param) => (
                                            <th key={param.key}> {t(param.key)}</th>
                                        ))}
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {cars.map((car, index) => (

                                        <tr
                                            key={index}
                                            onClick={() => {
                                                const catalogId = fromList ? selectedCatalog.id : car.catalogId;
                                                const carId = fromList ? car.id : car.carId;
                                                dispatch(getGroups(catalogId, carId, null, null, car));
                                            }}>
                                            <td>{fromList ? car.modelName : car.brand}</td>
                                            <td>{fromList ? car.description : car.title}</td>
                                            {car.parameters.map((param) => (
                                                <td key={param.key}>{param.value}</td>
                                            ))}
                                            <td>
                                                <div className="position-relative catalog-link">
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        simple
                                                        component="span"
                                                        onClick={() => {
                                                            const catalogId = fromList ? selectedCatalog.id : car.catalogId;
                                                            const carId = fromList ? car.id : car.carId;
                                                            dispatch(getGroups(catalogId, carId, null, null, car));
                                                        }}
                                                    >
                                                        {t("Browse Catalog")}
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                        </div>

                    </CardContent >
                </Card>

            </Grid>

        </Grid>
    );
}

export default CarItems;
