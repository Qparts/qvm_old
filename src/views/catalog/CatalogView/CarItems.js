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
            </CardContent >
            <CardFoot />
        </Card>
    );
}

export default CarItems;
