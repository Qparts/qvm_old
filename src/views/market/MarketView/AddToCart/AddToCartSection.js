import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import CustomDialog from 'src/components/Ui/Dialog';
import {
    Typography, Box, Grid
} from '@material-ui/core';
import Button from "src/components/button/CustomButton";
import CustomButton from 'src/components/Ui/Button';
import AddProduct from './AddProduct';
import { useHistory } from 'react-router-dom';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    center: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%'
    }
}));

// ----------------------------------------------------------------------

function AddToCartSection({ selectedProduct, setSelectedProduct }) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [openConfirm, setOpenConfirm] = useState(false);
    const history = useHistory();

    if (selectedProduct == null)
        return null;

    return (
        <>
            {/* add product to cart form. */}
            <CustomDialog
                open={selectedProduct && !openConfirm}
                handleClose={() => setSelectedProduct(null)}
                title={selectedProduct.partNumber} >
                <AddProduct selectedProduct={selectedProduct} setOpenConfirm={setOpenConfirm} />
            </CustomDialog>

            {/* confirm dialog to continue shopping or go to pay operation */}
            <CustomDialog
                open={openConfirm}
                handleClose={() => {
                    setOpenConfirm(false);
                    setSelectedProduct(null)
                }}
                title={selectedProduct.partNumber}
            >

                <Box component="img" src='/static/icons/success.svg' className={classes.center} />

                <Box sx={{ marginTop: '20px' }} className={classes.center}>
                    <Typography variant="subtitle1"> {t('Product In Cart', { productNumber: selectedProduct.partNumber })} </Typography>
                </Box>
                <Box sx={{ marginTop: '20px' }}>
                    <Grid container spacing={7} style={{ padding: 30 }}>
                        <Grid item md={6} style={{ paddingInlineEnd: 30 }}>
                            <Button
                                className="round"
                                color="primary"
                                className="mx-2"
                                round
                                simple
                                onClick={() => {
                                    setSelectedProduct(null);
                                    setOpenConfirm(false);
                                }}
                            >
                                {t("Continue Shopping")}
                            </Button>

                        </Grid>

                        <Grid item md={6} style={{ marginTop: 7 }}>
                            <CustomButton onClick={() => {
                                history.push(`/app/market/cart`);
                            }}>{t("Pay")}</CustomButton>
                        </Grid>
                    </Grid>
                </Box>
            </CustomDialog>
        </>
    );
}

export default AddToCartSection;
