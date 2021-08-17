import clsx from 'clsx';
import faker from 'faker';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { More } from '../../../icons/icons';
import { useTranslation } from 'react-i18next';
import { Card } from '@material-ui/core';
import Datatable from 'src/components/table/DataTable';

// ----------------------------------------------------------------------

const INVOICES = [
  {
    id: faker.random.uuid(),
    partNum: '011R0221',
    price: faker.finance.amount(),
    quantity: 20
  },
  {
    id: faker.random.uuid(),
    partNum: 'FL3Z9925622AA',
    price: faker.finance.amount(),
    quantity: 80
  },
  {
    id: faker.random.uuid(),
    partNum: 'AFLS123RM',
    price: faker.finance.amount(),
    quantity: 289
  },
  {
    id: faker.random.uuid(),
    partNum: 'FL1A',
    price: faker.finance.amount(),
    quantity: 1
  },
];

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

  const showMoreActions = (item) => {
    return <More width='20' height='20' fill='#a6bcc5' className={classes.more} />
  }

  return (
    <Card className={clsx(classes.root, classes.partsSearch, className)} {...other}>

      <Datatable
        header={[
          {
            name: t("Part Number"),
            attr: 'partNum',
          },
          {
            name: t('Lowest price'),
            attr: 'price',
          },
          {
            name: t("quantity"),
            attr: 'quantity'
          }
        ]}

        actions={[{ element: showMoreActions }]}
        datatable={INVOICES}
        isLazy={true}
        hasPagination={false} />
    </Card>
  );
}

export default SearchedParts;
