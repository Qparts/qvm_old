import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'src/components/Scrollbars';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Typography,
  CardContent
} from '@material-ui/core';

// ----------------------------------------------------------------------

const APPLICATIONS = [
  {
    name: 'KMHE341G7HA313614',
    shortcut: '/static/icons/ic_chrome.svg'
  },
  {
    name: 'Drive',
    shortcut: '/static/icons/ic_drive.svg'
  },
  {
    name: 'Dropbox',
    shortcut: '/static/icons/ic_dropbox.svg'
  },
  {
    name: 'Evernote',
    shortcut: '/static/icons/ic_evernote.svg'
  },
  {
    name: 'Github',
    shortcut: '/static/icons/ic_github.svg'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    '&:not(:last-child)': {
      borderBottom: '1px solid #ECF1F5',
    }
  },
  catalogSearch: {
    margin: '34px auto 0',
    boxShadow: '0px 4px 8px rgba(20, 69, 91, 0.03)',
    borderRadius: 20,
    border: '1px solid #E7F0F7',
    paddingTop: 0,
    paddingBottom: 0
  },
  CardCont: {
    paddingTop: 0,
    '&:last-child': {
      paddingBottom: '45px'
    }
  }
}));

// ----------------------------------------------------------------------

function CatalogItem({ app }) {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const { shortcut, name } = app;

  return (
    <div className={classes.listItem}>
      <Box
        sx={{
          width: 40,
          height: 40,
          flexShrink: 0,
          display: 'flex',
          borderRadius: "50%",
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.neutral'
        }}
      >
        <img src={shortcut} alt={name} width={24} height={24} />
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 160, margin: theme.spacing(0, 0, 0, 2) }}>
        <Typography variant="caption" sx={{ color: '#7E8D99' }}>{t("Structure No")}</Typography>
        <Typography variant="body1">{name}</Typography>
      </Box>
    </div>
  );
}

SearchedCatalog.propTypes = {
  className: PropTypes.string
};

function SearchedCatalog({ className, ...other }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Card className={clsx(classes.root, classes.catalogSearch, className)} {...other}>
      <Typography variant="h5" sx={{ color: '#14455B', padding: '10px 20px', borderBottom: '1px solid #ECF1F5' }}>{t("Most searched catalog")}</Typography>
      <CardContent className={classes.CardCont}>
        <Scrollbars>
          {APPLICATIONS.map((app) => (
            <CatalogItem key={app.name} app={app} />
          ))}
        </Scrollbars>
        <Link to='/catalog'>
          <Typography variant="body3" sx={{
            color: '#F20505',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 85.42%)',
            borderRadius: '0px 0px 20px 20px',
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            height: '120px',
            right: 0,
            bottom: 0,
            paddingBottom: '15px'
          }}>
            {t("Search the catalog")}
            </Typography>
        </Link>
      </CardContent>
    </Card>
  );
}

export default SearchedCatalog;
