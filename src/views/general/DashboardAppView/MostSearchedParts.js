import clsx from 'clsx';
import faker from 'faker';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Card } from '@material-ui/core';
import { More } from '../../../icons/icons';
import Datatable from 'src/components/table/DataTable';

// ----------------------------------------------------------------------

const INVOICES = [
    {
        id: faker.random.uuid(),
        partNum: '011R0221',
        search: 200
    },
    {
        id: faker.random.uuid(),
        partNum: 'FL3Z9925622AA',
        search: 100
    },
    {
        id: faker.random.uuid(),
        partNum: 'AFLS123RM',
        search: 500
    },
    {
        id: faker.random.uuid(),
        partNum: 'FL1A',
        search: 8
    },
];

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

    const showMoreActions = (item) => {
        return <More width='20' height='20' fill='#a6bcc5' className={classes.more} />
    }

    return (
        <Card className={clsx(classes.root, classes.partsSearch, className)} {...other}>
            <Datatable
                header={[
                    {
                        name: t('parts number'),
                        attr: 'partNum',
                    },
                    {
                        name: t('search attempts'),
                        attr: 'search',
                    }
                ]}

                actions={[{ element: showMoreActions }]}
                datatable={INVOICES}
                isLazy={true}
                hasPagination={false}
                dataTableGeneralDashboard='dataTableGeneralDashboard' />
        </Card>
    );
}

export default MostSearchedParts;
