import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form, FormikProvider } from 'formik';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import {
    Box,
    Divider,
    MenuItem,
    Typography,
    Button,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { getBranches } from 'src/redux/slices/branches';
import { Download } from '../../../icons/icons';
import StockFileBtn from '../../../components/Ui/StockFileBtn';
import TextField from '../../../components/Ui/TextField';
import CustomButton from '../../../components/Ui/Button';
import stockService from 'src/services/stockService';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    downlaodInfo: {
        fontSize: '0.875rem',
        color: '#7E8D99',
        marginBottom: '8px',
        display: 'block'
    },
    uploadStockMainBtn: {
        color: theme.palette.primary.main,
        fontSize: theme.typography.body3.fontSize,
        fontWeight: theme.typography.fontWeightRegular,
        boxShadow: 'none',
        background: '#FFEDED',
        display: 'flex',
        marginBottom: '20px',
        '& $svg': {
            marginLeft: '5px'
        },
        '&:hover': {
            color: theme.palette.primary.main,
            background: '#FFEDED',
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)'
        }
    }
}));

// ----------------------------------------------------------------------

AddStockForm.propTypes = {
    formik: PropTypes.object.isRequired
};

function AddStockForm(props) {
    const { errors, touched, handleSubmit, getFieldProps, setFieldValue, values } = props.formik;
    const { t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    const { countries } = useSelector((state) => state.authJwt);
    const [branches, setBranches] = useState(getBranches(countries));
    const { themeDirection } = useSelector((state) => state.settings);
    const [fileError, setFileError] = useState(null);


    const downloadStockFile = async () => {
        await stockService.getStockFile().then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', "stock.xlsx");
            document.body.appendChild(link);
            link.click();
        })
    }

    return (
        <FormikProvider value={props.formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="body3" className={classes.downlaodInfo}>
                    {t("Download the excel file and use the format as it is, then upload the file")}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    round
                    component="span"
                    className={classes.uploadStockMainBtn}
                    onClick={downloadStockFile}
                >
                    {t("download stock file")}
                    <Download width='20' height='20' fill={theme.palette.primary.main} />
                </Button>
                <Divider />
                <TextField
                    type='select'
                    label={t("Branch")}
                    id="branch"
                    name="branch"
                    spaceToTop='spaceToTop'
                    getField={getFieldProps('branch')}
                    touched={touched.branch}
                    errors={errors.branch}
                >
                    <MenuItem value="" />
                    {branches.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {themeDirection == 'ltr' ? option.branchName : option.branchNameAr}
                        </MenuItem>
                    ))}
                </TextField>
                <StockFileBtn
                    upload
                    onChange={(event) => {
                        if (event.currentTarget.files[0].name.split(".")[1] != 'xlsx') {
                            setFileError(t("Stock file must be Excel File"))
                            setFieldValue("stockFile", "");
                            return;
                        }
                        setFileError(null)
                        setFieldValue("stockFile", event.currentTarget.files[0]);
                    }}
                    title={t("upload stock file")}
                    file='stockFile'
                    label={t("upload stock file")}
                    value={values.stockFile}
                    touched={touched.stockFile}
                    errors={errors.stockFile}
                    fileError={fileError} />
                    
                <Box sx={{ marginTop: '20px' }}>
                    <CustomButton type="submit">{t("upload stock")}</CustomButton>
                </Box>
            </Form>
        </FormikProvider>
    );
}

export default AddStockForm;
