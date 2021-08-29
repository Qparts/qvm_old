import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
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
import { PATH_APP } from 'src/routes/paths';
import Avatar from '../../../components/Ui/Avatar'

// ----------------------------------------------------------------------

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
  },
  searchedCataHeader: {
    color: theme.palette.secondary.main,
    padding: theme.spacing(1.25, 2.5),
    borderBottom: '1px solid #ECF1F5',
    '@media (max-width: 1043px) and (min-width: 960px)': {
      fontSize: theme.direction === 'ltr' ? '1.073rem' : '1.2rem'
    },
    '@media (max-width: 400px)': {
      fontSize: '0.966rem'
    }
  },
  searchTimes: {
    fontSize: theme.typography.body3.fontSize,
    marginLeft: theme.spacing(0.5),
    color: theme.palette.secondary.main,
  }
}));

// ----------------------------------------------------------------------

function CatalogItem({ catalog }) {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const { catalogId, count } = catalog;

  return (
    <div className={classes.listItem}>
      <Avatar>
        <img src='/static/icons/ic_chrome.svg' alt='CatalogImg' width={24} height={24} />
      </Avatar>

      <Box sx={{ flexGrow: 1, minWidth: 160, margin: theme.spacing(0, 0, 0, 2) }}>
        <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{catalogId}</Typography>
        <Typography variant="caption" sx={{ color: '#7E8D99' }}>{t("Search times")}:
          <strong className={classes.searchTimes}>{count}</strong>
        </Typography>
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
  const { mostSearchedCatalog } = useSelector((state) => state.dashboard);

  return (
    <Card className={clsx(classes.root, classes.catalogSearch, className)} {...other}>
      <Typography variant="h5" className={classes.searchedCataHeader}>{t("Most searched catalog")}</Typography>
      <CardContent className={classes.CardCont}>
        <Scrollbars>
          {mostSearchedCatalog.map((cata) => (
            <CatalogItem key={cata.name} catalog={cata} />
          ))}
        </Scrollbars>
        <Link to={PATH_APP.general.catalog}>
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
