import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import VerifyCodeForm from 'src/views/auth/VerifyCodeView/VerifyCodeForm';
import { loadBranches, verifyUser } from 'src/redux/slices/branches';
import { refreshToken } from 'src/redux/slices/authJwt';
import { PATH_APP } from 'src/routes/paths';

// ----------------------------------------------------------------------

function AddUserVerification(props) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { error, isLoading, verifiedEmail, verificationMode } = useSelector((state) => state.branches);
    const isMountedRef = useIsMountedRef();
    const [loaded, setLoaded] = useState(false);
    const { themeDirection } = useSelector((state) => state.settings);

    useEffect(() => {
        console.log(loaded);
        console.log(error);
        (async () => {
            if ((error == null) && !isLoading && loaded) {
                await dispatch(refreshToken());
                await dispatch(loadBranches());
                props.setAddUserIsOpen(false);
                window.location = PATH_APP.management.user.account;
            } else
                setLoaded(false);
        })()

    }, [loaded])

    const VerifyCodeSchema = Yup.object().shape({
        code1: Yup.number().required(t("Verification Code Is Required")),
        code2: Yup.number().required(t("Verification Code Is Required")),
        code3: Yup.number().required(t("Verification Code Is Required")),
        code4: Yup.number().required(t("Verification Code Is Required")),
    });

    const formik = useFormik({
        initialValues: {
            code1: '',
            code2: '',
            code3: '',
            code4: '',
        },
        validationSchema: VerifyCodeSchema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
            try {

                let code = themeDirection == 'ltr' ? values.code1 + '' + values.code2 + '' + values.code3 + '' + values.code4
                    : values.code4 + '' + values.code3 + '' + values.code2 + '' + values.code1;
                await dispatch(verifyUser(code));

                setLoaded(true);

                if (isMountedRef.current) {
                    setSubmitting(false);
                }

            } catch (ex) {
                resetForm();
                if (isMountedRef.current) {
                    setSubmitting(false);
                    setErrors({ afterSubmit: ex.code || ex.message });
                }
            }
        }
    });

    return (
        <VerifyCodeForm formik={formik} closePopup={props.setAddUserIsOpen} />
    );
}

export default AddUserVerification;
