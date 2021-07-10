import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form, FormikProvider } from 'formik';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import {
    Box,
    Divider,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Grid,
    Typography,
    Button,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { getBranches } from 'src/redux/slices/branches';
import { Download } from '../../../icons/icons';
import StockFileBtn from '../../../components/Ui/StockFileBtn';
import CustomInput from '../../../components/Ui/Input';
import Select from '../../../components/Ui/Select';
import CustomButton from '../../../components/Ui/Button';
import Label from '../../../components/Ui/Label';

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
    const { countries } = useSelector(
        (state) => state.authJwt
    );
    const [branches, setBranches] = useState(getBranches(countries));
    const { themeDirection } = useSelector((state) => state.settings);
    const [fileError, setFileError] = useState(null);


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
                >
                    {t("download stock file")}
                    <Download width='20' height='20' fill={theme.palette.primary.main} />
                </Button>
                <Divider />
                <Select
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
                </Select>
                <StockFileBtn
                    onChange={(event) => {
                        if (event.currentTarget.files[0].name.split(".")[1] != 'xlsx') {
                            setFileError(t("Stock file must be Excel File"))
                            setFieldValue("stockFile", "");
                            return;
                        }
                        setFileError(null)
                        setFieldValue("stockFile", event.currentTarget.files[0]);
                    }}
                    file='stockFile'
                    value={values.stockFile}
                    touched={touched.stockFile}
                    errors={errors.stockFile}
                    fileError={fileError} />

                <FormControlLabel
                    control={<Checkbox checked={props.checked} onChange={props.handleChange} />}
                    label={t("special offer")}
                    style={{ marginTop: '15px' }}
                />
                {props.checked ?
                    <>
                        <Divider />
                        <CustomInput
                            value=""
                            name='offerName'
                            type='text'
                            label={t('add offer name')}
                            spaceToTop='spaceToTop' />
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={6}>
                                <Label name={t("start in")} />
                                <CustomInput value="" name='startIn' type='date' />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Label name={t("ends in")} />
                                <CustomInput value="" name='endsIn' type='date' />
                            </Grid>
                        </Grid>
                        <CustomInput
                            value=""
                            name='discount'
                            type='text'
                            label={t('put discount value')}
                            spaceToTop='spaceToTop' />
                    </> : ""}
                <Box sx={{ marginTop: '20px' }}>
                    <CustomButton type="submit">{t("upload stock")}</CustomButton>
                </Box>
            </Form>
        </FormikProvider>
    );
}

export default AddStockForm;
