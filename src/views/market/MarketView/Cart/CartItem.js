import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Table, TableContainer, TableRow, TableHead, TableBody, TableCell } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { updateCartItems, updateBillingAddress } from 'src/redux/slices/market';
import Scrollbars from 'src/components/Scrollbars';
import SecContainer from '../../../../components/Ui/SecContainer';
import { Delete } from '../../../../icons/icons';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    cartTable: {
        boxShadow: 'none',
        background: '#F6F8FC',
        borderCollapse: 'separate',
        borderSpacing: '0 10px',
    },
    cartTableHead: {
        '& $th': {
            border: 'none',
            background: 'none',
            color: '#7E8D99',
            paddingTop: 0,
            paddingBottom: 0,
            fontSize: theme.typography.body4.fontSize,
            fontWeight: theme.typography.fontWeightRegular
        },
        '& $th:first-of-type, & $th:last-of-type': {
            boxShadow: 'none',
        }
    },
    cartTableTr: {
        "& td": {
            background: theme.palette.grey[0],
        },
        '& $td:first-of-type': {
            borderRadius: '20px 0 0 20px',
        },
        '& $td:last-of-type': {
            borderRadius: '0 20px 20px 0'
        },
    },
    cartDel: {
        marginTop: '3px',
        cursor: 'pointer',
        '&:hover path': {
            fill: theme.palette.primary.main
        }
    }
}));

// ----------------------------------------------------------------------

function CartItem() {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { themeDirection } = useSelector((state) => state.settings);
    const { cartItems } = useSelector((state) => state.market);
    const isRlt = themeDirection == 'rtl';

    const removeFromCart = (product) => {
        let newItems = cartItems;
        newItems = newItems.filter(item => item.product.id != product.id);
        dispatch(updateCartItems(newItems));
        if (newItems.length == 0) {
            dispatch(updateBillingAddress(null));
        }
    }

    return (
        <SecContainer
            header={t('cart')}
            bodyP='bodyP'
            secContainerMt='secContainerMt'>
            <Scrollbars>
                <TableContainer>
                    <Table className={classes.cartTable}>
                        <TableHead className={classes.cartTableHead}>
                            <TableRow>
                                <TableCell>{t('Product')}</TableCell>
                                <TableCell>{t('Part Number')}</TableCell>
                                <TableCell>{t('Price')}</TableCell>
                                <TableCell>{t('Quantity')}</TableCell>
                                <TableCell>{t('Total Price')}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((item, index) => (
                                <TableRow key={index} className={classes.cartTableTr}>
                                    <TableCell>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <Box component="img" alt="logo" src={item.product.img} width={64} sx={{ marginRight: theme.spacing(2) }} />
                                            {isRlt ? item.product.brandAr : item.product.brand} , {isRlt ? item.product.nameAr : item.product.name}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{item.product.partNumber}</TableCell>
                                    <TableCell>{item.product.price}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.quantity * item.product.price}</TableCell>
                                    <TableCell>
                                        <Box
                                            onClick={() => removeFromCart(item.product)}>
                                            <Delete width='20' height='20' fill='#a6bcc5' className={classes.cartDel} />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbars>
        </SecContainer>
    );
}

export default CartItem;
