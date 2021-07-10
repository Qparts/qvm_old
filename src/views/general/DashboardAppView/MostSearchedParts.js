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
    Avatar,
    Box,
    Typography,
    MenuItem
} from '@material-ui/core';
import { More } from '../../../icons/icons';
import Select from '../../../components/Ui/Select';

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

const useStyles = makeStyles((theme) => ({
    root: {},
    partsSearch: {
        boxShadow: 'none',
        background: 'inherit',
        position: "relative",
        overflow: 'inherit'
    },
    partsSearchHead: {
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
    partsSearchTr: {
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
        <Card className={clsx(classes.root, classes.partsSearch, className)} {...other}>
            <Select
                id='partsSearched'
                name='partsSearched'
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
                        <TableHead className={classes.partsSearchHead}>
                            <TableRow>
                                <TableCell><Typography variant="subtitle2">{t('Part No')}</Typography></TableCell>
                                <TableCell><Typography variant="subtitle2">{t('search attempts')}</Typography></TableCell>
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
                                            {/* <img src={shortcut} alt={name} width={24} height={24} /> */}
                                        </Box>
                                        <Typography variant="body3" className={classes.partNumber}>{row.partNum}</Typography>
                                    </TableCell>
                                    <TableCell><Typography variant="body3">{row.search}</Typography></TableCell>
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
