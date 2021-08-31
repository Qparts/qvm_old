import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Card } from '@material-ui/core';
import { More } from '../../../icons/icons';
// import TextField from '../../../components/Ui/TextField';
import Datatable from 'src/components/table/DataTable';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    reactiveCompanies: {
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
    const { mostActiveCompaniesOnStock } = useSelector((state) => state.dashboard);
    const { themeDirection } = useSelector((state) => state.settings);
    const mostActiveCompaniesOnStockCopy = [...mostActiveCompaniesOnStock]
    const mostActiveCompaniesOnStockSort = mostActiveCompaniesOnStockCopy.sort((a,b) => (a.total < b.total) ? 1 : ((b.total < a.total) ? -1 : 0));

    const showMoreActions = (item) => {
        return <More width='20' height='20' fill='#a6bcc5' className={classes.more} />
    }

    return (
        <Card className={clsx(classes.root, classes.reactiveCompanies, className)} {...other}>
            {/* <TextField
                type='select'
                id='mostReactive'
                name='mostReactive'
                value={t("one week")}
                dateFilter='dateFilter'
                datePadding='datePadding'
                dateFilterWidth="dateFilterWidth"
            >
                <MenuItem key={t("one week")} value={t("one week")}>
                    {t("one week")}
                </MenuItem>
                <MenuItem key={t("one month")} value={t("one month")}>
                    {t("one month")}
                </MenuItem>
                <MenuItem key={t("6 months")} value={t("6 months")}>
                    {t("6 months")}
                </MenuItem>
                <MenuItem key={t("one year")} value={t("one year")}>
                    {t("one year")}
                </MenuItem>
            </TextField> */}

            <Datatable
                header={[
                    {
                        name: t('company'),
                        attr: themeDirection === 'ltr' ? 'company.name' : 'company.nameAr',
                    },
                    {
                        name: t('search attempts'),
                        attr: 'total',
                    }
                ]}

                actions={[{ element: showMoreActions }]}
                datatable={mostActiveCompaniesOnStockSort}
                isLazy={true}
                hasPagination={false}
                dataTableGeneralDashboard='dataTableGeneralDashboard' />
        </Card>
    );
}

export default MostSearchedParts;
