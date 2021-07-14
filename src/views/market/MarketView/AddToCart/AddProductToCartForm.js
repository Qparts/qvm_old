import PropTypes from 'prop-types';
import React from 'react';
import { Form, FormikProvider } from 'formik';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CustomInput from 'src/components/Ui/Input';
import { MButton } from 'src/theme';
import roundAddShoppingCart from '@iconify-icons/ic/round-add-shopping-cart';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    root: {},

}));

// ----------------------------------------------------------------------

AddProductToCartForm.propTypes = {
    formik: PropTypes.object.isRequired
};

function AddProductToCartForm(props) {
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
                        <div style={{ marginTop: 50 }}>
                            <Box
                                component="img"
                                alt="logo"
                                src={selectedProduct.img}
                                width={100}
                            />
                        </div>
                    </Grid>

                    <Grid item md={8}>
                        <Typography variant="body" sx={{ color: theme.palette.secondary.main }}>
                            {isRlt ? selectedProduct.brandAr : selectedProduct.brand} ,
                            {isRlt ? selectedProduct.nameAr : selectedProduct.name} </Typography>
                        <Box>
                            <Box >
                                <Box >
                                    <Typography variant="body"> {selectedProduct.partNumber} </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1"> {selectedProduct.price}  {t("SAR")}</Typography>
                                </Box>
                            </Box>
                            <Typography variant="body" sx={{ color: theme.palette.secondary.darker }}>
                                {isRlt ? selectedProduct.nameAr : selectedProduct.name}
                            </Typography>
                            <Box >
                                <Typography variant="body" sx={{ color: theme.palette.secondary.darker }}>
                                    {t('Quantity on the platform')} {selectedProduct.qunatity}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ mb: 3 }} />

                        <CustomInput
                            name='quantity'
                            type='text'
                            label={t('Quantity')}
                            getField={getFieldProps('quantity')}
                            touched={touched.quantity}
                            errors={errors.quantity} />

                        <Box sx={{ mb: 3 }} />

                        <MButton
                            fullWidth
                            size="large"
                            type="submit"
                            color="secandary"
                            variant="contained"
                            startIcon={<Icon icon={roundAddShoppingCart} />}
                            sx={{ whiteSpace: 'nowrap' }}
                        >
                            {t("Add To Cart")}
                        </MButton>
                    </Grid>

                </Grid>

            </Form>
        </FormikProvider>
    );
}

export default AddProductToCartForm;
