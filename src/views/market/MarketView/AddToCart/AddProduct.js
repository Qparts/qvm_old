import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import AddProductToCartForm from './AddProductToCartForm';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { updateCartItems } from 'src/redux/slices/market';
import { useDispatch, useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    root: {}
}));

// ----------------------------------------------------------------------

function AddProduct({ selectedProduct, setOpenConfirm }) {
    const { t } = useTranslation();
    const isMountedRef = useIsMountedRef();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(
        (state) => state.market
    );

    const addToCartSchema = Yup.object().shape({
        quantity: Yup.number()
            .min(1, t('Min value', { value: 0 }))
            .max(selectedProduct.qunatity, t('Max value', { value: selectedProduct.qunatity}))
            .required(t(t("Quantity is required"))),
    });

    const formik = useFormik({
        initialValues: {
            quantity: '',
        },
        validationSchema: addToCartSchema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
            try {
                let newItems = cartItems;
                newItems = newItems.filter(item => item.product.id != selectedProduct.id);
                newItems.push({ quantity: values.quantity, product: selectedProduct });
                dispatch(updateCartItems(newItems));
                setOpenConfirm(true);
                resetForm();
            } catch (error) {
                if (isMountedRef.current) {
                    setErrors({ afterSubmit: error.code || error.message });
                    setSubmitting(false);
                }
            }
        }
    });

    return (
        <>
            {selectedProduct &&
                <AddProductToCartForm formik={formik} selectedProduct={selectedProduct} />
            }

        </>
    );
}

export default AddProduct;
