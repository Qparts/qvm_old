import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import {
    Alert, AlertTitle, IconButton,
    Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import AddStockForm from './AddStockForm';
import partSearchService from 'src/services/partSearchService';
import { useSnackbar } from 'notistack';
import { PATH_APP } from 'src/routes/paths';

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

function UploadSection() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const isMountedRef = useIsMountedRef();
    const [open, setOpen] = useState(true);
    const [expanded, setExpanded] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const childRef = React.useRef()
    const [file, setFile] = useState();

    const stockSchema = Yup.object().shape({
        branch: Yup.string().required(t("Branch is required")),
        stockFile: Yup
            .mixed()
            .required(t("The file is required")),
    });


    const formik = useFormik({
        initialValues: {
            branch: '',
            stockFile: ''
        },
        validationSchema: stockSchema,
        onSubmit: async (values, { setErrors, setSubmitting, resetForm, setFieldValue }) => {
            try {
                const formData = new FormData();
                formData.append("stockObject", JSON.stringify({
                    branchId: values.branch, extension: "xlsx",
                    mimeType: values.stockFile.type
                }));
                formData.append("file", values.stockFile);
                await partSearchService.qvmStockUpload(formData);
                enqueueSnackbar(t('Stock file has been uploaded'), { variant: 'success' });
                document.getElementById("stockFile").value = "";
                resetForm();
            } catch (error) {
                console.log("error", error);
                if (isMountedRef.current) {
                    setErrors({ afterSubmit: error.code || error.message });
                    setSubmitting(false);
                }
                enqueueSnackbar(error.response.data ? t(error.response.data) : error.response.status, { variant: 'error' });
            }
        }
    });


    return (

        <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>

            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{t("Add your stock")}</Typography>
            </AccordionSummary>
            <AccordionDetails>

                <Box sx={{ width: '100%' }}>
                    <Collapse in={open}>
                        <Alert
                            style={{
                                width: '100%',
                                justifyContent: 'center'
                            }}
                            severity="info"
                            action={
                                <IconButton
                                    style={{ marginTop: -130 }}
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            <AlertTitle>{t("Use the following format when uploading the excel file")}</AlertTitle>
                            <img src="/static/images/stock.png" />
                        </Alert>
                    </Collapse>
                </Box>

                <Box sx={{ mb: 6 }} />

                <AddStockForm
                    formik={formik}
                    innerRef={childRef}
                    setFile={setFile}
                    file={file} />

            </AccordionDetails>
        </Accordion>

    );
}

export default UploadSection;
