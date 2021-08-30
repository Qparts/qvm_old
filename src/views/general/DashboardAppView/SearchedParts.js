import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { More } from '../../../icons/icons';
import { useTranslation } from 'react-i18next';
import { Card } from '@material-ui/core';
import Datatable from 'src/components/table/DataTable';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  root: {},
  partsSearch: {
    boxShadow: 'none',
    background: 'inherit',
  },
  more: {
    cursor: 'pointer'
  }
}));

// ----------------------------------------------------------------------

SearchedParts.propTypes = {
  className: PropTypes.string
};

function SearchedParts({ className, ...other }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { mostSearchedProducts } = useSelector((state) => state.dashboard);

  const showMoreActions = (item) => {
    return <More width='20' height='20' fill='#a6bcc5' className={classes.more} />
  }

  return (
    <Card className={clsx(classes.root, classes.partsSearch, className)} {...other}>

      <Datatable
        header={[
          {
            name: t("Part Number"),
            attr: 'keywords',
          },
          {
            name: t('Search times'),
            attr: 'count',
          },
        ]}

        actions={[{ element: showMoreActions }]}
        datatable={mostSearchedProducts}
        isLazy={true}
        hasPagination={false} />
    </Card>
  );
}

export default SearchedParts;
