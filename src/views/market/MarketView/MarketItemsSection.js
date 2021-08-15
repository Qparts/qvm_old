import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Grid,
    Box,
    Typography,
    CardContent,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import constants from 'src/utils/constants';
import CustomButton from 'src/components/Ui/Button';
import AddToCartSection from './AddToCart/AddToCartSection';
import SecContainer from '../../../components/Ui/SecContainer';
import Card from '../../../components/Ui/Card';
import Pagination from '../../../components/Ui/Pagination';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    marketItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
}));

// ----------------------------------------------------------------------

function MarketItemsSection(props, { rowsPerPage = constants.MAX, onSelectedPage, isLazy = false }) {
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
        rowsPerPage: rowsPerPage,
        numberOfPages: size ? Math.ceil(size / rowsPerPage) : Math.ceil(products.length / rowsPerPage),
    });

    return (
        <SecContainer
            header={props.marketService ? t(props.marketService) : t("Market")}
            secContainerMt='secContainerMt'>
            <Grid container spacing={4}>
                {state.data.map((product, index) => {
                    return (
                        <Grid item xs={12} md={4} sm={6} key={index}>
                            <Card>
                                <CardContent sx={{ padding: '15px' }}>
                                    <div style={{ paddingBottom: 30 }}>
                                        <Box
                                            component="img"
                                            alt="logo"
                                            src={product.img}
                                            width={100}
                                            sx={{ margin: 'auto' }}
                                        />
                                    </div>
                                    <Box sx={{ marginBottom: theme.spacing(3) }}>
                                        <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main, fontWeight: theme.typography.fontWeightRegular }}>
                                            {isRlt ? product.brandAr : product.brand} , {isRlt ? product.nameAr : product.name}
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: '#7F929C' }}>
                                            {product.partNumber}
                                        </Typography>
                                        <Box className={classes.marketItem}>
                                            <Typography variant="h6"
                                                sx={{ color: theme.palette.secondary.main, lineHeight: 1 }}
                                            >
                                                {product.price}  {t("SAR")}
                                            </Typography>
                                            <Typography variant="body" sx={{ color: '#7F929C' }}>
                                                {isRlt ? product.nameAr : product.name}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <CustomButton
                                        btnBg="btnBg"
                                        mainBorderBtn='mainBorderBtn'
                                        onClick={() => setSelectedProduct(product)}>
                                        {t("Buy now")}
                                    </CustomButton>

                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

            <Pagination
                hasPagination={products.length > constants.MAX ? true : false}
                paginationData={products}
                state={state}
                setState={setState}
                size={size}
                isLazy={isLazy}
                rowsPerPage={rowsPerPage}
                page={page}
                onSelectedPage={onSelectedPage} />

            <AddToCartSection
                setSelectedProduct={setSelectedProduct}
                selectedProduct={selectedProduct} />
        </SecContainer>
    );
}

export default MarketItemsSection;
