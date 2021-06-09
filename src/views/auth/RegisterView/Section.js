import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, ListItemText } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: theme.spacing(2, 0, 2, 2)
  }
}));

// ----------------------------------------------------------------------

function Section({ className }) {
  const classes = useStyles();
  const { t } = useTranslation();


  return (
    <Card className={clsx(classes.root, className)}>
      <Typography variant="h3" sx={{ px: 5, mt: 5, mb: 15 }}>
        {t("You can access huge numbers of auto spare parts and deal with great number of vendors")}
      </Typography>
      <Typography variant="h3" sx={{ px: 5, mb: 15 }}>
        <ListItemText primary={t("Parts Catalog")} />
        <ListItemText primary={t("Spare Parts Availability & Price Information")} />
        <ListItemText primary={t("Multiple Brand Alternatives")} />
        <ListItemText primary={t("Special Offers")} />
        <ListItemText primary={t("Issuing and Receiving Purchase Oders (*soon)")} />
      </Typography>
    </Card>
  );
}

export default Section;
