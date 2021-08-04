import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Typography, Box } from '@material-ui/core';
import CustomDialog from 'src/components/Ui/Dialog';
import Button from 'src/components/Ui/Button';
import AddProduct from './AddProduct';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    center: {
        margin: 'auto',
        width: '50%'
    }
}));

// ----------------------------------------------------------------------

function AddToCartSection({ selectedProduct, setSelectedProduct }) {
    const classes = useStyles();
    const theme = useTheme();
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

            {/* confirm dialog to continue shopping or go to pay operation  eaecef*/}
            <CustomDialog
                open={openConfirm}
                handleClose={() => {
                    setOpenConfirm(false);
                    setSelectedProduct(null)
                }}
                title={selectedProduct.partNumber}
            >
                <Box sx={{textAlign: 'center'}}>
                    <Box component="img" src='/static/icons/success.svg' className={classes.center} />
                    <Typography variant="body1" sx={{ marginTop: '20px', color: theme.palette.secondary.main }}>
                        {t('Product In Cart', { productNumber: selectedProduct.partNumber })}
                    </Typography>
                    <Box sx={{ marginTop: '20px' }}>
                        <Button
                            btnBg="btnBg"
                            btnWidth="btnWidth"
                            onClick={() => {
                                setSelectedProduct(null);
                                setOpenConfirm(false);
                            }}
                        >
                            {t("Continue Shopping")}
                        </Button>
                        <Button
                            btnWidth="btnWidth"
                            onClick={() => {
                                history.push(`/app/market/cart`);
                            }}
                        >
                            {t("Pay")}
                        </Button>
                    </Box>
                </Box>
            </CustomDialog>
        </>
    );
}

export default AddToCartSection;
