import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { CardContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { getGroups } from 'src/redux/slices/catalog';
import Datatable from 'src/components/table/DataTable';
import Button from "./../../../components/button/CustomButton";
import constants from 'src/utils/constants';
import CatalogHead from "./CatalogHead";
import CarFilter from './CarFilter';
import CardFoot from "../../../components/Ui/CardFoot";
import Card from "../../../components/Ui/Card";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    cardContent: {
        padding: '0 15px'
    },
    browseCatalog: {
        color: theme.palette.primary.main + '!important',
        fontSize: '13px',
        padding: 0,
        fontWeight: theme.typography.fontWeightRegular,
    }
}));

// ----------------------------------------------------------------------

function CarItems() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { cars, selectedCatalog, fromList } = useSelector((state) => state.catalogs);
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(constants.MAX);

    const showDetailsAction = (item) => {
        const element = JSON.parse(item);
        const catalogId = fromList ? selectedCatalog.id : element.catalogId;
        const carId = fromList ? element.id : element.carId;
        dispatch(getGroups(catalogId, carId, null, null, element));
    }

    const showDetailsElement = (item) => {
        return (
            <Button
                variant="contained"
                simple
                component="span"
                className={classes.browseCatalog}
                onClick={() => showDetailsAction(item)}
            >
                {t("Browse Catalog")}
            </Button>
        )
    }

    return (
        <Card cardBg='cardBg'>
            <CatalogHead />
            <CardContent className={classes.cardContent}>
                {fromList && <CarFilter />}
                <Datatable
                    header={[
                        {
                            name: t("Car Name"),
                            attr: fromList ? 'name' : 'title',
                        },
                        {
                            name: t("Brand"),
                            attr: fromList ? 'modelName' : 'brand',
                        },
                        {
                            name: t("year"),
                            attr: fromList ? 'parameters[5].value' : 'parameters[0].value'
                        },
                        {
                            name: t("Engine"),
                            attr: fromList ? 'parameters[3].value' : 'parameters[3].value'
                        },
                        {
                            name: t("Transmission type"),
                            attr: fromList ? 'parameters[7].value' : 'parameters[8].value'
                        },
                        {
                            name: t("Region"),
                            attr: fromList ? 'parameters[6].value' : 'parameters[6].value'
                        }
                    ]}

                    actions={[{ element: showDetailsElement }]}
                    datatable={cars}
                    page={page}
                    isLazy={false}
                    rowsPerPage={rowsPerPage}
                    hasPagination={cars.length > constants.MAX ? true : false}
                    dataTableCata='dataTableCata' />
                {/* 
                <Scrollbars>
                    <TableContainer>
                        <Table className={classes.catalogTable}>
                            <TableHead className={classes.catalogTableHead}>
                                <TableRow>
                                    <TableCell><Typography variant="body4">{t('Car Name')}</Typography></TableCell>
                                    <TableCell><Typography variant="body4">{t('Brand')}</Typography></TableCell>
                                    <TableCell><Typography variant="body4">{t('year')}</Typography></TableCell>
                                    <TableCell><Typography variant="body4">{t('Engine')}</Typography></TableCell>
                                    <TableCell><Typography variant="body4">{t('Transmission type')}</Typography></TableCell>
                                    <TableCell><Typography variant="body4">{t('Region')}</Typography></TableCell>
                                    {cars[0].parameters.map((param) => (
                                                <TableCell key={param.key}> {t("catalogTab." + param.key)}</TableCell>
                                            ))}
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cars.map((car) => (
                                    <TableRow
                                        key={car.id}
                                        className={classes.catalogTableTr}
                                        onClick={() => {
                                            const catalogId = fromList ? selectedCatalog.id : car.catalogId;
                                            const carId = fromList ? car.id : car.carId;
                                            dispatch(getGroups(catalogId, carId, null, null, car));
                                        }}>
                                        <TableCell>{fromList ? car.name : car.title}</TableCell>
                                        <TableCell>{fromList ? car.modelName : car.brand}</TableCell>
                                        <TableCell>{fromList ? car.parameters[5].value : car.parameters[0].value}</TableCell>
                                        <TableCell>{fromList ? car.parameters[3].value : car.parameters[3].value}</TableCell>
                                        <TableCell>{fromList ? car.parameters[7].value : car.parameters[8].value}</TableCell>
                                        <TableCell>{fromList ? car.parameters[6].value : car.parameters[6].value}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                simple
                                                component="span"
                                                className={classes.browseCatalog}
                                                onClick={() => {
                                                    const catalogId = fromList ? selectedCatalog.id : car.catalogId;
                                                    const carId = fromList ? car.id : car.carId;
                                                    dispatch(getGroups(catalogId, carId, null, null, car));
                                                }}
                                            >
                                                {t("Browse Catalog")}
                                            </Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbars> */}
            </CardContent >
            <CardFoot />
        </Card>
    );
}

export default CarItems;
