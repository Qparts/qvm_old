import React, { useState } from 'react';
import {
    Grid,
    Box,
    Typography,
    Card,
    CardContent,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import constants from 'src/utils/constants';
import Helper from '../../../utils/helper'
import { OrdersArrow, Search } from '../../../icons/icons';
import TableAction from '../../../components/Ui/TableAction';
import Pagination from '../../../components/Ui/Pagination';
import Avatar from '../../../components/Ui/Avatar'

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    offerDetailsGridCont: {
        background: '#FFFFFF',
        boxShadow: '0px 2px 4px rgb(20 69 91 / 2%)',
        borderRadius: '10px',
        marginTop: '14px',
        textAlign: 'left',
        '&:hover': {
            borderRight: `3px solid ${theme.palette.primary.main}`,
            '& $div span': {
                color: theme.palette.secondary.darker,
            },
            '& $svg path': {
                fill: theme.palette.secondary.darker,
            }
        }
    },
    offerDetailsGridChild: {
        display: 'flex',
        marginBottom: '20px'
    },
    offerDetailsGridInfo: {
        marginLeft: theme.spacing(2)
    },
    offerDetailsGridQuantityCont: { margin: '2px 0 5px' },
    offerDetailsGridFlex: {
        display: 'flex',
        alignItems: 'center',
    }
}));

// ----------------------------------------------------------------------

function SpecialOfferInfoGrid({ offerProducts = [], page = 1, rowsPerPage = constants.MAX,
    onSelectedPage, size = offerProducts.length, isLazy = true, hasPagination = false, searchElementGrid,
    addToCompanyCartGrid }) {

    const classes = useStyles();
    const theme = useTheme();
    const { t } = useTranslation();

    const [state, setState] = useState({
        data: isLazy == true ? offerProducts : offerProducts.slice(rowsPerPage * page, rowsPerPage * (page + 1)),
        page: page,
        rowsPerPage: rowsPerPage,
        numberOfPages: size ? Math.ceil(size / rowsPerPage) : Math.ceil(offerProducts.length / rowsPerPage),
    });

    return (
        <>
            <Grid container spacing={2}>
                {state.data.map((offerPro, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card className={classes.offerDetailsGridCont}>
                                <CardContent sx={{ padding: '15px' }}>
                                    <Box className={classes.offerDetailsGridChild}>
                                        <Avatar>
                                            <img src='/static/icons/ic_chrome.svg' width={24} height={24} />
                                        </Avatar>
                                        <Box className={classes.offerDetailsGridInfo}>
                                            <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main }}> {offerPro.partNumber} </Typography>
                                            <Box>
                                                <Box className={classes.offerDetailsGridQuantityCont}>
                                                    <Box>
                                                        <Typography variant="body4" sx={{ color: '#7F929C' }}>{t("Brand")}</Typography>
                                                        <Typography variant="body3"> {offerPro.brandName} </Typography>
                                                    </Box>
                                                </Box>
                                                <Typography variant="body1" sx={{ color: theme.palette.secondary.darker }}>
                                                    {Helper.ccyFormat(offerPro.offers[0].offerPrice)} {' '}
                                                    {t("SAR")}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <TableAction
                                        type='offerActions'
                                        title={t("order the offer")}
                                        textIcon={<OrdersArrow width='17' height='17' fill='#CED5D8' fillArr={theme.palette.primary.main} />}
                                        icon={<Search width='15' height='15' fill='#CED5D8' />}
                                        TableActionBorder='TableActionBorder'
                                        SearchEvent={() => searchElementGrid(offerPro.partNumber)}
                                        addItemEvent={() => addToCompanyCartGrid(offerPro)} />
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

            <Pagination
                hasPagination={hasPagination}
                paginationData={offerProducts}
                state={state}
                setState={setState}
                size={size}
                isLazy={isLazy}
                rowsPerPage={rowsPerPage}
                page={page}
                onSelectedPage={onSelectedPage} />
        </>
    );
}

export default SpecialOfferInfoGrid;
