import React from 'react';
import Page from 'src/components/Page';
import { useTranslation } from 'react-i18next';
import Card from '@material-ui/core/Card';
import {
  Container,
  makeStyles,
  Box,
  TextField,
  Typography,
  Grid
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    padding: theme.spacing(12, 0, 0)
  },
  heading: {
    color: theme.palette.secondary.main,
    lineHeight: 1,
    marginRight: '0.5rem'
  }
}));

// ----------------------------------------------------------------------

function RegisterForm({ formik }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Page className={classes.root}>
      <Container maxWidth="sm">
        <Box sx={{ mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom className={classes.heading}>
            {t('Contact Our Team')}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {t('Fill the form and we will contact you as soon as possible')}
          </Typography>
        </Box>
        <Card sx={{ px: 2, py: 3, my: 3 }}>
          <form>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              label={t("Name")}
              variant="outlined"
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              label={t('Email')}
              variant="outlined"
            />
            <Grid container sx={{ mb: 3 }}>
              <Grid item xs={5}>
                <TextField
                  style={{ paddingInlineEnd: 10 }}
                >
                </TextField>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  fullWidth
                  name="phone"
                  label={t('Mobile')}
                />
              </Grid>
            </Grid>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              label={t("Company Name")}
              variant="outlined"
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              label={t("Notes")}
              variant="outlined"
              multiline
              rowsMax={4}
            />
               <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            {t("Send")}
          </LoadingButton>
          </form>
        </Card>
      </Container>
    </Page>
  );
}

export default RegisterForm;
