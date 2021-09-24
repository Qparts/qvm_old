import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, List, ListItem, Typography } from '@material-ui/core';
import TextField from 'src/components/Ui/TextField';
import Button from 'src/components/Ui/Button';
import { addOrder } from 'src/redux/slices/partSearch';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    partInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #efefef',
        '&:first-of-type': {
            paddingTop: 0,
        },
        '&:last-of-type': {
            border: 0,
        },
    },
    partValue: {
        color: theme.palette.secondary.main,
        fontWeight: theme.typography.fontWeightMedium
    }
}));

// ----------------------------------------------------------------------

function PurchaseOrderSection(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { themeDirection } = useSelector((state) => state.settings);
    const [quantity, setQuantity] = useState('1');
    const selectedItem = props.itemData;
    const companyiesData = JSON.parse(localStorage.getItem('COMPANYIES'));

    //add order item to purchase from specific company.
    const addToOrder = () => {
        const order = {
            companyId: selectedItem.companyId,
            quantity: quantity,
            order: selectedItem
        };
        dispatch(addOrder(order));
        props.closeOrderDailog();
    }


    return (
        <>
            <List sx={{ p: 0 }}>
                <ListItem className={classes.partInfo}>
                    <Typography variant="body2">{t("Part Number")}</Typography>
                    <Typography variant="body3" className={classes.partValue}>
                        {selectedItem.partNumber}
                    </Typography>
                </ListItem>
                <ListItem className={classes.partInfo}>
                    <Typography variant="body2">{t("Brand")}</Typography>
                    <Typography variant="body3" className={classes.partValue}>
                        {selectedItem.brandName}
                    </Typography>
                </ListItem>
                <ListItem className={classes.partInfo}>
                    <Typography variant="body2">{t("Vendor")}</Typography>
                    <Typography variant="body3" className={classes.partValue}>
                        {themeDirection == 'ltr' ?
                            companyiesData.filter(x => x[0] === selectedItem.companyId).map(w => w[1].name) :
                            companyiesData.filter(x => x[0] === selectedItem.companyId).map(w => w[1].nameAr)}
                    </Typography>
                </ListItem>
                <ListItem className={classes.partInfo}>
                    <Typography variant="body2">{t("Quantity")}</Typography>
                    <Typography variant="body3" className={classes.partValue}>
                        <TextField
                            name='quantity'
                            type='input'
                            value={quantity}
                            // label={t('Quantity')}
                            inputContChat='inputContChat'
                            onChange={event => setQuantity(event.target.value)} />
                    </Typography>
                </ListItem>
            </List>

            <Box sx={{ mb: 1.25 }} />
            <Button
                type='submit'
                onClick={addToOrder}
                disabled={!/^[1-9][0-9]*$/.test(quantity) || quantity === ' '}
            >
                {t("Add to Purchase Order")}
            </Button>
        </>
    );
}

export default PurchaseOrderSection;
