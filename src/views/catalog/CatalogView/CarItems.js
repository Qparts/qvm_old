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

            <Grid item xs={11} md={11} lg={11}>
                <Card >
                    <CardHeader title={t("catalogTab.carDetails")} />
                    <CardContent className={classes.cardContent}>
                        {cars.map((car) => (
                            <div key={car.id} className="table-responsive-lg">
                                {fromList ? (
                                    <>
                                        <h4 style={{ fontSize: "14px" }}>{car.name}</h4>
                                        <h4 style={{ fontSize: "14px" }}>{car.modelName}</h4>
                                        <h4 style={{ fontSize: "14px" }}>{car.description}</h4>
                                    </>
                                ) : (
                                    <>
                                        <h4 style={{ fontSize: "14px" }}>{car.brand}</h4>
                                        <h4 style={{ fontSize: "14px" }}>{car.catalogId}</h4>
                                        <h4 style={{ fontSize: "14px" }}>{car.title}</h4>
                                    </>
                                )}

                                {car.parameters.map((param) => (
                                    <h4 key={param.key} style={{ fontSize: "14px" }}>
                                        {param.name} : {param.value}
                                    </h4>
                                ))}

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
                                    {t("catalogTab.browCatalog")}
                                </Button>
                                <hr />
                            </div>
                        ))}

                    </CardContent >
                </Card>

            </Grid>

        </Grid>
    );
}

export default CarItems;
