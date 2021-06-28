import clsx from 'clsx';
import faker from 'faker';
import React from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'src/components/Scrollbars';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import {
    Card,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
    Typography,
    MenuItem
} from '@material-ui/core';
import { More } from '../../../icons/icons';
import Select from '../../../components/Ui/Select';

// ----------------------------------------------------------------------

const INVOICES = [
    {
        id: faker.random.uuid(),
        company: '011R0221',
        partNum: 200
    },
    {
        id: faker.random.uuid(),
        company: 'FL3Z9925622AA',
        partNum: 100
    },
    {
        id: faker.random.uuid(),
        company: 'AFLS123RM',
        partNum: 500
    },
    {
        id: faker.random.uuid(),
        company: 'FL1A',
        partNum: 8
    },
];

const useStyles = makeStyles((theme) => ({
    root: {},
    reactiveCompanies: {
        boxShadow: 'none',
        background: 'inherit',
        position: "relative",
        overflow: 'inherit'
    },
    reactiveCompaniesHead: {
        '& $th': {
            border: 'none',
            background: 'none',
            color: '#7E8D99',
            paddingTop: 0,
            paddingBottom: 9
        },
        '& $th:first-of-type, & $th:last-of-type': {
            boxShadow: 'none',
        }
    },
    reactiveCompaniesTr: {
        background: theme.palette.grey[0],
        borderBottom: '10px solid #F6F8FC',
        '&:last-of-type': {
            border: 0
        },
        '& $td:first-of-type': {
            borderRadius: '20px 0 0 20px',
            display: 'flex'
        },
        '& $td:last-of-type': {
            borderRadius: '0 20px 20px 0'
        }
    },
    partNumber: {
        margin: '10px 0 0 10px'
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

    return (
        <Card className={clsx(classes.root, classes.reactiveCompanies, className)} {...other}>
            <Select
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
            </Select>
            <Scrollbars>
                <TableContainer>
                    <Table>
                        <TableHead className={classes.reactiveCompaniesHead}>
                            <TableRow>
                                <TableCell><Typography variant="subtitle2">{t('company')}</Typography></TableCell>
                                <TableCell><Typography variant="subtitle2">{t('parts number')}</Typography></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {INVOICES.map((row) => (
                                <TableRow key={row.id} className={classes.reactiveCompaniesTr}>
                                    <TableCell><Typography variant="body3">{row.company}</Typography></TableCell>
                                    <TableCell>
                                        <Typography variant="body3" className={classes.partNumber}>{row.partNum}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <More width='20' height='20' fill='#a6bcc5' className={classes.more} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbars>
        </Card>
    );
}

export default MostSearchedParts;
