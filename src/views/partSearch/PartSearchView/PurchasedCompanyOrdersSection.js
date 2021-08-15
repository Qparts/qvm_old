import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@material-ui/core';
import Datatable from 'src/components/table/DataTable';
import CustomButton from 'src/components/Ui/Button';
import Button from "src/components/Ui/Button";

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    root: {},
    locationFilterResult: {
        display: 'flex'
    },
    locationFilter: {
        minWidth: '300px'
    }
}));

// ----------------------------------------------------------------------

function PurchasedCompanyOrdersSection(props) {
    const { t } = useTranslation();
    const { orderItem, updateQuantity, deleteElement, deleteCompanyOrders, sendOrder } = props;
    const [companyOrders, setCompnayOrders] = useState(null)

    useEffect(() => {
        setCompnayOrders(orderItem.orders)
        if (orderItem.orders.length == 0) {
            deleteCompanyOrders(orderItem.companyId);
        }
    }, [orderItem, orderItem.orders])


    return (
        <Grid  >
            <Grid item xs={12} >
                {companyOrders != null &&
                    <>
                        <Datatable
                            header={[
                                {
                                    name: t("Part Number"),
                                    attr: 'order.partNumber',
                                },
                                {
                                    name: t("Brand"),
                                    attr: 'order.brandName',
                                },
                                {
                                    name: t("Quantity"),
                                    attr: 'quantity',
                                    type: 'text',
                                    onchange: updateQuantity
                                },
                                {
                                    name: t("Average market price"),
                                    attr: 'order.retailPrice'
                                }
                            ]}

                            actions={[{ element: deleteElement, name: t("Delete") }]}
                            datatable={companyOrders}

                        />

                        <Box sx={{ mb: 3 }} />

                        <Grid container spacing={2}>
                            <Grid item xs={8} />
                            <Grid item xs={2} >
                                <Box sx={{ mb: 3 }} >
                                    <CustomButton
                                        btnBg="btnBg"
                                        mainBorderBtn='mainBorderBtn'
                                        // disabled={orderItem.orders.length == 0}
                                        onClick={() => deleteCompanyOrders(orderItem.companyId)}
                                    >
                                        {t("Delete")}
                                    </CustomButton>
                                </Box>
                            </Grid>

                            <Grid item xs={2} >
                                <Box sx={{ mb: 3 }} >
                                    <Button
                                        onClick={() => sendOrder(orderItem)}
                                    >
                                        {t("Send")}
                                    </Button>
                                </Box>
                            </Grid>

                        </Grid>
                    </>
                }

            </Grid>
        </Grid >

    );
}

export default PurchasedCompanyOrdersSection;
