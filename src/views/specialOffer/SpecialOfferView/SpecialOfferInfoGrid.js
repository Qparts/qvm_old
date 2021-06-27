import React from 'react';
import { Link } from 'react-router-dom';
import {
    Grid,
    Box,
    Typography,
    Avatar,
    Card,
    CardContent
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Helper from '../../../utils/helper'
import { Orders, Search } from '../../../icons/icons';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    offerDetailsGridCont: {
        background: '#FFFFFF',
        boxShadow: '0px 2px 4px rgb(20 69 91 / 2%)',
        borderRadius: '10px',
        marginTop: '14px'
    },
    offerDetailsGridChild: {
        display: 'flex',
        marginBottom: '20px'
    },
    offerDetailsGridInfo: {
        marginLeft: theme.spacing(2)
    },
    offerDetailsGridQuantityCont: {
        margin: '2px 0 5px',
    },
    offerDetailsGridActionsIcon: {
        marginLeft: '5px'
    },
    offerDetailsGridBorder: {
        paddingRight: '10px',
        marginRight: '10px',
        borderRight: '1px solid #CED5D8',
    },
    offerDetailsGridFlex: {
        display: 'flex',
        alignItems: 'center',
    },
    hoverLink: {
        '& span': {
            color: '#CED5D8'
        },
        '&:hover': {
            '& span': {
                color: theme.palette.primary.main
            },
            '& $svg path': {
                fill: theme.palette.primary.main
            }
        },
    }
}));

// ----------------------------------------------------------------------

function SpecialOfferInfoGrid(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Grid container spacing={2}>
            {props.offerProducts.map((offerPro, index) => {
                return (
                    <Grid item xs={12} md={3} key={index}>
                        <Card className={classes.offerDetailsGridCont}>
                            <CardContent sx={{ padding: '15px' }}>
                                <Box className={classes.offerDetailsGridChild}>
                                    <Avatar width={20} height={20} />
                                    <Box className={classes.offerDetailsGridInfo}>
                                        <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main }}> {offerPro.partNumber} </Typography>
                                        <Box>
                                            <Box className={clsx(classes.offerDetailsGridQuantityCont, classes.offerDetailsGridFlex)}>
                                                <Box className={classes.offerDetailsGridBorder}>
                                                    <Typography variant="body4" sx={{ color: '#7F929C' }}>{t("Quantity")}</Typography>
                                                    <Typography variant="body3"> {offerPro.stock.length} </Typography>
                                                </Box>
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
                                <Box className={clsx(classes.offerDetailsGridFlex)}>
                                    <Link to='/dashboard' className={clsx(classes.offerDetailsGridBorder, classes.offerDetailsGridFlex, classes.hoverLink)}>
                                        <Typography variant="body4">{t("order the offer")}</Typography>
                                        <Orders width='17' height='17' fill='#CED5D8' fillArr={theme.palette.primary.main} className={classes.offerDetailsGridActionsIcon} />
                                    </Link>
                                    <Link to='/dashboard' className={classes.hoverLink}><Search width='15' height='15' fill='#CED5D8' /> </Link>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    );
}

export default SpecialOfferInfoGrid;
