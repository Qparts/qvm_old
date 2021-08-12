import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, TextField, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Datatable from 'src/components/table/DataTable';
import StockFileBtn from 'src/components/Ui/StockFileBtn';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    root: {},
}));

// ----------------------------------------------------------------------

function Checkout(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const { themeDirection } = useSelector((state) => state.settings);
    const { bancks } = useSelector((state) => state.authJwt);
    const [receipt, setReceipt] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(2);
    const paymentMethods = [
        { id: 1, name: 'Bank Transfer', nameAr: 'تحويل بنكي' },
        { id: 2, name: 'Credit/Debit Card', nameAr: 'بطاقة بنكية أو إئتمانية' }];

    const onAttach = async (event) => {
        setReceipt(event.target.files[0]);
    }

    return (
        <Grid >
            <TextField
                style={{ margin: 10 }}
                select
                fullWidth
                label={t("Payment Method")}
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
            >
                {paymentMethods.map((option) => (
                    <option key={option.id} value={option.id}>
                        {themeDirection == 'ltr' ? option.name : option.nameAr}
                    </option>
                ))}
            </TextField>

            {paymentMethod == 1 &&
                <>
                    <Datatable
                        header={[
                            {
                                name: t("Bank"),
                                attr: themeDirection == 'ltr' ? 'name' : 'nameAr',
                            },
                            {
                                name: t("Account Number"),
                                attr: 'account'
                            },
                            {
                                name: t("IBAN"),
                                attr: 'iban',
                            },
                            {
                                name: t("Account Name"),
                                attr: 'owner'
                            }

                        ]}
                        datatable={bancks}
                        page={0}
                        isLazy={false}
                        hasPagination={false}

                    />
                    <Box sx={{ mb: 6 }} />

                    <StockFileBtn
                        upload
                        onChange={onAttach}
                        file='receiptFile'
                        label={t("Upload receipt file")}
                        value={receipt}
                    />
                    <Box sx={{ mb: 6 }} />
                </>
            }
        </Grid>
    );
}

export default Checkout;
