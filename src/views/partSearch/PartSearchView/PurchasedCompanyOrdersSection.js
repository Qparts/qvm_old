import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import Datatable from 'src/components/table/DataTable';
import Button from "src/components/Ui/Button";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    orderDataCont: {
        padding: theme.spacing(1.25, 0, 0)
    },
    orderDataActions: {
        marginTop: theme.spacing(2.5),
        display: 'flex',
        alignItems: 'center',
    }
}));

// ----------------------------------------------------------------------

function PurchasedCompanyOrdersSection(props) {
    const classes = useStyles();
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
        <Box className={classes.orderDataCont} >
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
                        dataTableChat='dataTableChat'
                        dataTablePad='dataTablePad'
                    />

                    <Box className={classes.orderDataActions}>
                        <Button onClick={() => sendOrder(orderItem)}>
                            {t("Send")}
                        </Button>
                        <Button
                            chatBtn="chatBtn"
                            // disabled={orderItem.orders.length == 0}
                            onClick={() => deleteCompanyOrders(orderItem.companyId)}
                        >
                            {t("Delete")}
                        </Button>
                    </Box>
                </>
            }
        </Box>
    )
}

export default PurchasedCompanyOrdersSection;
