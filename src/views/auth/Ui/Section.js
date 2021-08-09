import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, ListItemText } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import src from 'react-map-gl';
import { pxToRem } from 'src/utils/formatFontSize';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundImage: `url("/static/images/hero-bg.jpg")`,
    backgroundPosition: 'left center',
    borderRadius:0,
    borderBottomRightRadius: 300,
  },
  caption: {
    color: theme.palette.grey[0],
    fontWeight: 400,
    fontSize: pxToRem(18),
    lineHeight:1.7
  },
  ListItemText:{
    color: theme.palette.grey[0],
    marginBottom:10,
    position: 'relative',
    paddingLeft: 18,
    '&:before':{
      content:'""',
      borderStyle: 'solid',
      borderWidth: '0 3px 3px 0',
      display: 'inline-block',
      padding: 3,
      transform: 'rotate(-45deg)',
      position: 'absolute',
      top:10,
      left:0,
      borderColor: theme.palette.primary.main,
    }
  }
}));

// ----------------------------------------------------------------------

function Section({ className }) {
  const classes = useStyles();
  const { t } = useTranslation();


  return (
    <Card className={clsx(classes.root, className)}>
      <Typography variant="h5" sx={{ px: 5, mt: 5, mb: 4 }} className={classes.caption}>
        {t("You can access huge numbers of auto spare parts and deal with great number of vendors")}
      </Typography>
      <Typography variant="h3" sx={{ px: 5, mb: 15 }} >
        <ListItemText className={classes.ListItemText} primary={t("Parts Catalog")} />
        <ListItemText className={classes.ListItemText} primary={t("Spare Parts Availability & Price Information")} />
        <ListItemText className={classes.ListItemText} primary={t("Multiple Brand Alternatives")} />
        <ListItemText className={classes.ListItemText} primary={t("Special Offers")} />
        <ListItemText className={classes.ListItemText} primary={t("Issuing and Receiving Purchase Oders (*soon)")} />
      </Typography>
    </Card>
  );
}

export default Section;
