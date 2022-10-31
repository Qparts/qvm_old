import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddUserForm from './AddUserForm';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { addUser } from 'src/redux/slices/branches';
import helper from 'src/utils/helper';

// ----------------------------------------------------------------------

function AddUser(props) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const isMountedRef = useIsMountedRef();
    const [loaded, setLoaded] = useState(false);
    const { countries, loginObject } = useSelector((state) => state.authJwt);

    const userExists = (name, phone, email) => {
        return loginObject.company.subscribers.some(el => {
            return el.name == name.trim() || el.mobile == phone.trim() || el.email == email.trim();
        });
    }

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
                const reconstructPhone = helper.reconstructPhone(values.countryId, values.phone, countries)
                if (userExists(values.name, reconstructPhone, values.email)) {
                    enqueueSnackbar(t('User already exist'), { variant: 'error' });
                } else {
                    dispatch(addUser(values.email, reconstructPhone, values.countryId,
                        values.password, values.name, values.branch))
                    if (isMountedRef.current) {
                        setSubmitting(false);
                    }
                    setLoaded(true);
                }
            } catch (error) {
                if (isMountedRef.current) {
                    setErrors({ afterSubmit: error.code || error.message });
                    setSubmitting(false);
                }
            }
        }
    });

    return (
        <AddUserForm formik={formik} closePopup={props.setAddUserIsOpen}
            selectedBranch={props.selectedBranch}
            setSelectedBranch={props.setSelectedBranch}
        />
    );
}

export default AddUser;
