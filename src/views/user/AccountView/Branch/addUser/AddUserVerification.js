import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import {
    Grid,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import VerifyCodeForm from 'src/views/auth/VerifyCodeView/VerifyCodeForm';
import { loadBranches, verifyUser } from 'src/redux/slices/branches';
import { refreshToken } from 'src/redux/slices/authJwt';
import { PATH_APP } from 'src/routes/paths';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------

function AddUserVerification(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { error, isLoading, verifiedEmail, verificationMode } = useSelector((state) => state.branches);
    const isMountedRef = useIsMountedRef();
    const [loaded, setLoaded] = useState(false);



    useEffect(() => {
        console.log(loaded);
        console.log(error);
        (async () => {
            if ((error == null || error.status == 200) && !isLoading && loaded) {
                await dispatch(refreshToken());
                await dispatch(loadBranches());
                props.setAddUserIsOpen(false);
                window.location = PATH_APP.management.user.account;
            } else
                setLoaded(false);
        })()

    }, [loaded])


    const VerifyCodeSchema = Yup.object().shape({
        code1: Yup.number().required(t("verification.error.require.code")),
        code2: Yup.number().required(t("verification.error.require.code")),
        code3: Yup.number().required(t("verification.error.require.code")),
        code4: Yup.number().required(t("verification.error.require.code")),
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

                let code = values.code1 + '' + values.code2 + '' + values.code3 + '' + values.code4;
                await dispatch(verifyUser(code));

                setLoaded(true);

                if (isMountedRef.current) {
                    setSubmitting(false);
                }

                // if ((error == null || error.status == 200) &&
                //     !isLoading && verifiedEmail == null && verificationMode == null) {
                //     await dispatch(refreshToken());
                //     await dispatch(loadBranches());
                //     props.setAddUserIsOpen(false);
                //     window.location = PATH_APP.management.user.account;
                // }

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

        <Grid container >
            <VerifyCodeForm formik={formik} closePopup={props.setAddUserIsOpen} />
        </Grid>

    );
}

export default AddUserVerification;
