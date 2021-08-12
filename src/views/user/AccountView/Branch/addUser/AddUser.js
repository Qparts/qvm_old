import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { addUser } from 'src/redux/slices/branches';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddUserForm from './AddUserForm';
import helper from 'src/utils/helper';

// ----------------------------------------------------------------------

function AddUser(props) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const isMountedRef = useIsMountedRef();
    const [loaded, setLoaded] = useState(false);
    const { countries } = useSelector(
        (state) => state.authJwt
    );


    const userSchema = Yup.object().shape({
        name: Yup.string().required(t("Name Is Required")),
        phone: Yup.string().required(t("Mobile Is Required")),
        branch: Yup.string().required(t("branch is required")),
        email: Yup.string()
            .email(t("Email Is Invalid"))
            .required(t("Email Is Required")),
        password: Yup.string().required(t("Password Is Required"))
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            countryId: 1,
            phone: '',
            email: '',
            password: '',
            branch: props.selectedBranch ? props.selectedBranch.id : ''
        },
        validationSchema: userSchema,
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            try {
                dispatch(addUser(values.email, helper.reconstructPhone(values.countryId, values.phone, countries),
                    values.countryId, values.password, values.name, values.branch))
                if (isMountedRef.current) {
                    setSubmitting(false);
                }
                setLoaded(true);
            } catch (error) {
                if (isMountedRef.current) {
                    setErrors({ afterSubmit: error.code || error.message });
                    setSubmitting(false);
                }
            }
        }
    });

    return (

        <Grid container >
            <AddUserForm formik={formik} closePopup={props.setAddUserIsOpen}
                selectedBranch={props.selectedBranch}
                setSelectedBranch={props.setSelectedBranch}
            />
        </Grid>

    );
}

export default AddUser;
