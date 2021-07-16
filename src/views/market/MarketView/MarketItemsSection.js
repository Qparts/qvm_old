import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Grid,
    Box,
    Typography,
    Card,
    CardContent,
    TablePagination
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import constants from 'src/utils/constants';
import CustomButton from 'src/components/Ui/Button';
import AddToCartSection from './AddToCart/AddToCartSection';



// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    card: {
        background: '#FFFFFF',
        boxShadow: '0px 2px 4px rgb(20 69 91 / 2%)',
        borderRadius: '10px',
        marginTop: '14px',
        '&:hover': {
            borderRight: `3px solid ${theme.palette.primary.main}`,
            '& $a span': {
                color: theme.palette.secondary.darker,
            },
            '& $svg path': {
                fill: theme.palette.secondary.darker,
            }
        }
    },
    cardDetailsGridChild: {
        display: 'flex',
        marginBottom: '20px'
    },
    cardDetailsGridInfo: {
        marginLeft: theme.spacing(2)
    },
    tablePagination: {
        borderTop: 0,
        '& .MuiTablePagination-toolbar': {
            height: '59px',
            background: theme.palette.grey[0],
            marginTop: theme.spacing(2),
            borderRadius: '20px',
        }
    }
}));

// ----------------------------------------------------------------------

function MarketItemsSection({ rowsPerPage = constants.MAX,
    onSelectedPage, isLazy = false }) {
    const classes = useStyles();
    const theme = useTheme();
    const { t } = useTranslation();
    const { themeDirection } = useSelector((state) => state.settings);
    const { products } = useSelector((state) => state.market);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(products.length);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const isRlt = themeDirection == 'rtl';

    const [state, setState] = useState({
        data: isLazy == true ? products : products.slice(rowsPerPage * page, rowsPerPage * (page + 1)),
        page: page,
        rowsPerPage,
        numberOfPages: size ? Math.ceil(size / rowsPerPage) : Math.ceil(products.length / rowsPerPage),
    });

    useEffect(() => {
        setState({
            ...state,
            page: page,
            data: isLazy == true ? products : products.slice(rowsPerPage * page, rowsPerPage * (page + 1)),

        })
    }, [products])


    const changePagehandler = (event, newPage) => {
        console.log("newPage", newPage)
        if (onSelectedPage)
            onSelectedPage(event, newPage);
        else setState({
            ...state,
            page: newPage,
            data: products != null && products.length > 0 ?
                products.slice(rowsPerPage * newPage, rowsPerPage * (newPage + 1)) : []
        });
    };

    return (
        <>
            <Grid container spacing={2}>
                {state.data.map((product, index) => {
                    return (
                        <Grid item xs={12} md={3} key={index}>
                            <Card className={classes.card}>
                                <CardContent sx={{ padding: '15px' }}>
                                    <div style={{ paddingInlineStart: 100, paddingBottom: 30 }}>
                                        <Box
                                            component="img"
                                            alt="logo"
                                            src={product.img}
                                            width={100}
                                        />
                                    </div>
                                    <Box className={classes.cardDetailsGridChild}>

                                        <Box className={classes.cardDetailsGridInfo}>
                                            <Typography variant="body" sx={{ color: theme.palette.secondary.main }}> {isRlt ? product.brandAr : product.brand} ,
                                                {isRlt ? product.nameAr : product.name} </Typography>
                                            <Box>
                                                <Box >
                                                    <Box >
                                                        <Typography variant="body"> {product.partNumber} </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="subtitle1"> {product.price}  {t("SAR")}</Typography>
                                                    </Box>
                                                </Box>
                                                <Typography variant="body" sx={{ color: theme.palette.secondary.darker }}>
                                                    {isRlt ? product.nameAr : product.name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <CustomButton
                                        onClick={() => setSelectedProduct(product)}
                                    >{t("Buy now")}</CustomButton>

                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            {<TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={size}
                rowsPerPage={constants.MAX}
                page={state.page}
                onPageChange={changePagehandler}
                className={classes.tablePagination}
                labelDisplayedRows={
                    ({ from, to, count }) => {
                        return themeDirection == 'ltr' ? '' + from + '-' + to + t("Of") + count :
                            '' + to + '-' + from + t("Of") + count
                    }
                }
            />}

            <AddToCartSection
                setSelectedProduct={setSelectedProduct}
                selectedProduct={selectedProduct} />
        </>
    );
}

export default MarketItemsSection;
