import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import {
    Grid,
    Typography
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddOfferForm from './AddOfferForm';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none',
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            textAlign: 'left',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        [theme.breakpoints.up('xl')]: {
            height: 320
        }
    }
}));

// ----------------------------------------------------------------------

function AddOffer(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const isMountedRef = useIsMountedRef();
    const { enqueueSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(true);

    const userSchema = Yup.object().shape({
        offerName: Yup.string().required(t("Stock File Is Required")),
        offerStartDate: Yup.string().required(t("Offer start date is required")),
        offerEndDate: Yup.string().required(t("Offer end date is required")),
        offerFile: Yup
            .mixed()
            .required(t("The file is required")),
    });

    const formik = useFormik({
        initialValues: {
            offerName: '',
            offerStartDate: '',
            offerEndDate: '',
            offerFile: '',
            notes: '',
        },
        validationSchema: userSchema,
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            try {
                console.log("values", values);
            } catch (error) {
                if (isMountedRef.current) {
                    setErrors({ afterSubmit: error.code || error.message });
                    setSubmitting(false);
                }
            }
        }
    });

    return (

        <Grid container className={classes.root}>
            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{t("Add Offer")}</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <AddOfferForm formik={formik} />

                </AccordionDetails>
            </Accordion>
        </Grid>

    );
}

export default AddOffer;
