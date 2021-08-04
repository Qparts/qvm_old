import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MenuItem, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Datatable from 'src/components/table/DataTable';
import StockFileBtn from 'src/components/Ui/StockFileBtn';
import TextField from '../../../../components/Ui/TextField';
import MainCard from '../../../../components/Ui/MainCard';

// ----------------------------------------------------------------------

function Checkout() {
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
        <MainCard title={t('Payment Method')} >
            <TextField
                type='select'
                label={t("Payment Method")}
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
            >
                {paymentMethods.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {themeDirection == 'ltr' ? option.name : option.nameAr}
                    </MenuItem>
                ))}
            </TextField>

            {paymentMethod == 1 &&
                <Box sx={{mt: 2}}>
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
                        dataTablePad='dataTablePad'
                    />
                    <Box sx={{ mb: 2 }} />
                    <StockFileBtn
                        upload
                        onChange={onAttach}
                        file='receiptFile'
                        title={t("Upload receipt file")}
                        value={receipt}
                    />
                </Box>
            }
        </MainCard>
    );
}

export default Checkout;
