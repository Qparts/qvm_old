import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography, Divider } from '@material-ui/core';
import TextField from 'src/components/Ui/TextField';
import Button from 'src/components/Ui/Button';
import { addOrder } from 'src/redux/slices/partSearch';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    locationFilterResult: {
        display: 'flex'
    },
    locationFilter: {
        minWidth: '300px'
    }
}));

// ----------------------------------------------------------------------

function PurchaseOrderSection(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { selectedPart, companies, orders } = useSelector((state) => state.PartSearch);
    const { themeDirection } = useSelector((state) => state.settings);
    const [quantity, setQuantity] = useState(0);

    //add order item to purchase from specific company.
    const addToOrder = () => {
        const order = {
            companyId: selectedPart.companyId,
            quantity: quantity,
            order: selectedPart
        };
        dispatch(addOrder(order));
        props.closeOrderDailog();
    }


    return (
        <Grid container >

            <Grid item xs={3} >
                <Typography
                    noWrap
                    variant="body2"

                >
                    {t("Part Number")}
                </Typography>
            </Grid>

            <Grid item xs={9} >
                <Typography
                    noWrap
                    variant="body2"

                >
                    {selectedPart.partNumber}
                </Typography>
            </Grid>

            <Box sx={{ mb: 5 }} />


            <Grid item xs={3} >
                <Typography
                    noWrap
                    variant="body2"
                >
                    {t("Brand")}
                </Typography>
            </Grid>

            <Grid item xs={9} >
                <Typography
                    noWrap
                    variant="body2"
                >
                    {selectedPart.brandName}
                </Typography>
            </Grid>

            <Box sx={{ mb: 5 }} />

            <Grid item xs={3} >
                <Typography
                    noWrap
                    variant="body2"
                >
                    {t("Vendor")}
                </Typography>
            </Grid>

            <Grid item xs={9} >
                <Typography
                    noWrap
                    variant="body2"
                >
                    {themeDirection == 'ltr' ? companies.get(selectedPart.companyId).name
                        : companies.get(selectedPart.companyId).nameAr}
                </Typography>
            </Grid>

            <Box sx={{ mb: 5 }} />

            <Grid item xs={3} >
                <Typography variant="body2" > {t("Quantity")} </Typography>
            </Grid>
            <Grid item xs={9} >
                <TextField
                    name='quantity'
                    type='input'
                    // label={t('Quantity')}
                    onChange={event => setQuantity(event.target.value)} />
            </Grid>

            <Box sx={{ mb: 9 }} />
            <Button
                type='submit'
                // btnWidth="btnWidth"
                onClick={addToOrder}
            >
                {t("Add to Purchase Order")}
            </Button>
        </Grid>
    );
}

export default PurchaseOrderSection;
