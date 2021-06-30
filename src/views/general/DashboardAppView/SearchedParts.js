import clsx from 'clsx';
import faker from 'faker';
import React from 'react';
import PropTypes from 'prop-types';
// import { fCurrency } from 'src/utils/formatNumber';
// import Scrollbars from 'src/components/Scrollbars';
import { makeStyles } from '@material-ui/core/styles';
import { More } from '../../../icons/icons';
import { useTranslation } from 'react-i18next';
import {
  Card,
  // Table,
  // TableRow,
  // TableBody,
  // TableCell,
  // TableHead,
  // TableContainer,
  // Avatar,
  // Box,
  // Typography
} from '@material-ui/core';
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

const useStyles = makeStyles((theme) => ({
  root: {},
  partsSearch: {
    boxShadow: 'none',
    background: 'inherit',
  },
  // reactiveCompaniesHead: {
  //     '& $th': {
  //         border: 'none',
  //         background: 'none',
  //         color: '#7E8D99',
  //         paddingTop: 0,
  //         paddingBottom: 9
  //     },
  //     '& $th:first-of-type, & $th:last-of-type': {
  //         boxShadow: 'none',
  //     }
  // },
  // reactiveCompaniesTr: {
  //     background: theme.palette.grey[0],
  //     borderBottom: '10px solid #F6F8FC',
  //     '&:last-of-type': {
  //         border: 0
  //     },
  //     '& $td:first-of-type': {
  //         borderRadius: '20px 0 0 20px',
  //         display: 'flex'
  //     },
  //     '& $td:last-of-type': {
  //         borderRadius: '0 20px 20px 0'
  //     }
  // },
  // partNumber: {
  //     margin: '10px 0 0 10px'
  // },
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

      {/* <TableContainer>
          <Table className={classes.tableSpace}>
            <TableHead className={classes.partsSearchHead}>
              <TableRow>
                <TableCell><Typography variant="subtitle2">{t('Part No')}</Typography></TableCell>
                <TableCell><Typography variant="subtitle2">{t('Lowest price')}</Typography></TableCell>
                <TableCell><Typography variant="subtitle2">{t("quantity")}</Typography></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {INVOICES.map((row) => (
                <TableRow key={row.id} className={classes.partsSearchTr}>
                  <TableCell>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        flexShrink: 0,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'background.neutral'
                      }}
                    >
                      <Avatar width={20} height={20} />
                      <img src={shortcut} alt={name} width={24} height={24} />
                    </Box>
                    <Typography variant="body3" className={classes.partNumber}>{row.partNum}</Typography>
                  </TableCell>
                  <TableCell><Typography variant="body3">{fCurrency(row.price)}</Typography></TableCell>
                  <TableCell><Typography variant="body3">{row.quantity}</Typography></TableCell>
                  <TableCell align="right">
                    <More width='20' height='20' fill='#a6bcc5' className={classes.more} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
    </Card>
  );
}

export default SearchedParts;
