import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Card } from '@material-ui/core';
import { More } from '../../../icons/icons';
import Datatable from 'src/components/table/DataTable';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    root: {},
    partsSearch: {
        boxShadow: 'none',
        background: 'inherit',
        position: "relative",
        overflow: 'inherit'
    },
    more: {
        cursor: 'pointer'
    }
}));

// ----------------------------------------------------------------------

MostSearchedParts.propTypes = {
    className: PropTypes.string
};

function MostSearchedParts({ className, ...other }) {
    const classes = useStyles();
    const { t } = useTranslation();
    const { mostSearchedProductsOnStock } = useSelector((state) => state.dashboard);

    const showMoreActions = (item) => {
        return <More width='20' height='20' fill='#a6bcc5' className={classes.more} />
    }

    return (
        <Card className={clsx(classes.root, classes.partsSearch, className)} {...other}>
            <Datatable
                header={[
                    {
                        name: t('Part Number'),
                        attr: 'productNumber',
                    },
                    {
                        name: t('search attempts'),
                        attr: 'total',
                    }
                ]}

                actions={[{ element: showMoreActions }]}
                datatable={mostSearchedProductsOnStock}
                isLazy={true}
                hasPagination={false}
                dataTableGeneralDashboard='dataTableGeneralDashboard' />
        </Card>
    );
}

export default MostSearchedParts;
