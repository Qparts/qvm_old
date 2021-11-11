import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Datatable from 'src/components/table/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getPreviousOrders } from 'src/redux/slices/previousOrders';
import { TextField, Autocomplete, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import TableAction from 'src/components/Ui/TableAction';
import { Plus } from "src/icons/icons";
import CustomDialog from 'src/components/Ui/Dialog';
import PreviousOrdersDetailsSection from './PreviousOrdersDetailsSection';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
}));

// ----------------------------------------------------------------------

function PreviousOrdersSection() {
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { previousOrders, previousOrdersTable } = useSelector((state) => state.previousOrders);
    const { conversationsCompanies } = useSelector((state) => state.chat);
    const { themeDirection } = useSelector((state) => state.settings);
    const [companyQuery, setCompanyQuery] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const changePagehandler = (event, newPage) => {
        dispatch(getPreviousOrders(companyQuery, newPage + 1, 5))
        setPage(newPage);
    };

    useEffect(() => {
        dispatch(getPreviousOrders(companyQuery, 1, 5));
        setPage(0);
    }, [companyQuery])


    const showDetailsElement = (item) => {
        return (
            <TableAction
                type='partSearch'
                title={t("Details")}
                onClick={() => {
                    console.log("item", item);
                    setSelectedOrder(item)
                }}
                textIcon={<Plus width='14' height='14' fill='#CED5D8' />} />
        )
    }

    return (

        <Box>
            <Card className={classes.replacementsCard}>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={4} style={{ padding: 20 }}>
                            <Autocomplete
                                className="mt-form"
                                id="company"
                                options={conversationsCompanies}
                                getOptionLabel={(option) =>
                                    themeDirection == 'rtl' ? JSON.parse(option).companyNameAr : JSON.parse(option).companyName
                                }
                                onChange={(event, newValue) => {
                                    console.log("newValue", newValue);
                                    setCompanyQuery(JSON.parse(newValue)?.companyId);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={t("Filter Orders By Company")}
                                        variant="standard"
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <br />
                </Box>
                <Datatable
                    header={[
                        {
                            name: t("Sender"),
                            attr: 'sender',
                        },
                        {
                            name: t("Status"),
                            attr: 'status',
                            isTrans: true
                        },
                        {
                            name: t("Date"),
                            attr: 'created',
                            type: 'date'
                        },
                        {
                            name: t("Receiver Company"),
                            attr: 'companyName',
                        }
                    ]}
                    datatable={previousOrdersTable}
                    actions={[{ element: showDetailsElement }]}
                    page={page}
                    isLazy={true}
                    rowsPerPage={rowsPerPage}
                    hasPagination={true}
                    size={previousOrders?.total}
                    onSelectedPage={changePagehandler}
                    dataTablePad='dataTablePad'
                />
            </Card>

            <CustomDialog
                fullWidth={true}
                open={selectedOrder != null}
                handleClose={() => setSelectedOrder(null)}
                title={t("Previous Order Details")}>
                {selectedOrder &&
                    <PreviousOrdersDetailsSection
                        selectedOrder={selectedOrder}
                    />}

            </CustomDialog>
        </Box >
    );
}

export default PreviousOrdersSection;
