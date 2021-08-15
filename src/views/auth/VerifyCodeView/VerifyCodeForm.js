import React from 'react';
import { Form, FormikProvider } from 'formik';
import maxLengthCheck from 'src/utils/maxLengthCheck';
import { makeStyles } from '@material-ui/core/styles';
import { Box, OutlinedInput, FormHelperText } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Ui/Button';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  input: {
    width: 36,
    height: 36,
    padding: 0,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: 56,
      height: 56
    }
  },
  warnMessageAlign: {
    textAlign: 'left'
  }
}));

// ----------------------------------------------------------------------

function VerifyCodeForm({ formik }) {
  const classes = useStyles();
  const {
    values,
    errors,
    isValid,
    touched,
    handleSubmit,
    getFieldProps
  } = formik;

  const { t } = useTranslation();

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {Object.keys(values).map((item) => (
            <Box key={item} sx={{ mx: 1 }}>
              <OutlinedInput
                {...getFieldProps(item)}
                type="number"
                placeholder="-"
                onInput={maxLengthCheck}
                inputProps={{ maxLength: 1 }}
                error={Boolean(touched[item] && errors[item])}
                classes={{ input: classes.input }}
              />
            </Box>
          ))}
        </Box>

        <FormHelperText error={!isValid} className={classes.warnMessageAlign}>
          {!isValid && t("Verification Code Is Required")}
        </FormHelperText>

        <Box sx={{ marginTop: '20px' }}>
          <Button type="submit" homeBtn='homeBtn'>{t("Verify")}</Button>
        </Box>
      </Form>
    </FormikProvider>
  );
}

export default VerifyCodeForm;
