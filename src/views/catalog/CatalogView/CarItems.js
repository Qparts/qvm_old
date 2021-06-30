import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    Card,
    Typography,
    CardContent,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { getGroups } from 'src/redux/slices/catalog';
import Scrollbars from 'src/components/Scrollbars';
import Button from "./../../../components/button/CustomButton";
import CatalogHead from "./CatalogHead";
import CardFoot from "../../../components/Ui/CardFoot";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    carItemsCont: {
        background: '#F6F8FC',
        boxShadow: '0px 4px 8px rgb(20 69 91 / 3%)',
        borderRadius: '20px',
    },
    cardContent: {
        padding: '10px 15px'
    },
    catalogTable: {
        boxShadow: 'none',
        background: 'inherit',
        borderCollapse: 'separate',
        borderSpacing: '0 10px',
    },
    catalogTableHead: {
        '& $th': {
            border: 'none',
            background: 'none',
            color: '#7E8D99',
            paddingTop: 0,
            paddingBottom: 0,
            fontSize: theme.typography.body4.fontSize,
            fontWeight: theme.typography.fontWeightRegular
        },
        '& $th:first-of-type, & $th:last-of-type': {
            boxShadow: 'none',
        }
    },
    catalogTableTr: {
        "& td": {
            background: theme.palette.grey[0],
        },
        '& $td:first-of-type': {
            borderRadius: '20px 0 0 20px',
        },
        '& $td:last-of-type': {
            borderRadius: '0 20px 20px 0'
        },
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

    return (
        <Card className={classes.carItemsCont}>
            <CatalogHead />
            <CardContent className={classes.cardContent}>
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
                                    {/* {cars[0].parameters.map((param) => (
                                                <TableCell key={param.key}> {t("catalogTab." + param.key)}</TableCell>
                                            ))} */}
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
                </Scrollbars>
            </CardContent >
            <CardFoot />
        </Card>
    );
}

export default CarItems;
