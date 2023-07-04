import PropTypes from 'prop-types';
import React from 'react';
import { Form, FormikProvider } from 'formik';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import TextField from 'src/components/Ui/TextField';
import Button from 'src/components/Ui/Button';
import roundAddShoppingCart from '@iconify-icons/ic/round-add-shopping-cart';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    itemImage: {
        marginTop: 110,
        padding: '0 20px',
    },
    marketItemQuantity: {
        margin: theme.spacing(2, 0, 3),
        padding: theme.spacing(2, 0),
        borderTop: '1px solid #E5EBF0',
        borderBottom: '1px solid #E5EBF0',
    },
    addToCartCont: {
        '& svg': {
            fontSize: '22px',
            marginRight: theme.spacing(1)
        }
    }
}));

// ----------------------------------------------------------------------

AddProductToCartForm.propTypes = {
    formik: PropTypes.object.isRequired
};

function AddProductToCartForm(props) {
    const classes = useStyles();
    const { errors, touched, handleSubmit, getFieldProps } = props.formik;
    const selectedProduct = props.selectedProduct;
    const { t } = useTranslation();
    const theme = useTheme();
    const { themeDirection } = useSelector((state) => state.settings);
    const isRlt = themeDirection == 'rtl';

    return (
        <FormikProvider value={props.formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <div className={classes.itemImage}>
                            <Box
                                component="img"
                                alt="logo"
                                src={selectedProduct.img}
                                width={100}
                            />
                        </div>
                    </Grid>

                    <Grid item md={8}>
                        <Box>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main, fontWeight: theme.typography.fontWeightRegular }}>
                                {isRlt ? selectedProduct.brandAr : selectedProduct.brand} ,
                                {isRlt ? selectedProduct.nameAr : selectedProduct.name}
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#7F929C', marginBottom: theme.spacing(1) }}>
                                {selectedProduct.partNumber}
                            </Typography>
                            <Typography variant="h6"
                                sx={{
                                    color: theme.palette.secondary.main,
                                    lineHeight: 1,
                                    marginBottom: theme.spacing(1)
                                }}
                            >
                                {selectedProduct.price}  {t("SAR")}
                            </Typography>
                            <Typography variant="body" sx={{ color: '#7F929C' }}>
                                {isRlt ? selectedProduct.nameAr : selectedProduct.name}
                            </Typography>
                            <Box className={classes.marketItemQuantity}>
                                <TextField
                                    name='quantity'
                                    type='input'
                                    label={t('Quantity')}
                                    getField={getFieldProps('quantity')}
                                    touched={touched.quantity}
                                    errors={errors.quantity} />
                                <Typography variant="body4" sx={{ color: '#7F929C' }}>
                                    {t('Quantity on the platform')} {selectedProduct.qunatity}
                                </Typography>
                            </Box>
                            <Box className={classes.addToCartCont}>
                                <Button>
                                    {<Icon icon={roundAddShoppingCart} />}
                                    {t("Add To Cart")}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    );
}

export default AddProductToCartForm;
