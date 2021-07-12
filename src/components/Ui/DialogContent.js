import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Divider } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import clsx from 'clsx';
import { Search } from '../../../icons/icons';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    productImg: {
        width: '350px',
        height: '170px'
    },
    partNumber: {
        display: 'flex',
        background: '#FFEDED',
        borderRadius: '15px',
        padding: '11px',
        width: '80%',
    },
    partNumberChild: {
        color: theme.palette.primary.main
    },
    partNumberCard: {
        padding: theme.spacing(2, 0),
        '&:last-of-type': {
            paddingBottom: 0
        },
    },
    partNumberHaed: {
        color: theme.palette.secondary.main,
    },
    displayFlex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}));

// ----------------------------------------------------------------------

function ProductDetails(props) {
    const classes = useStyles();
    const { selectedProduct } = useSelector((state) => state.PartSearch);
    const { t } = useTranslation();


    return (
        <Box sx={{ minWidth: '350px' }}>
            {selectedProduct != null &&
                <>
                    <CardMedia
                        component="img"
                        className={classes.productImg}
                        src={selectedProduct.image}
                        onError={e => {
                            e.target.src = 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg';
                        }}
                    />
                    <Box>
                        <Box className={clsx(classes.partNumberCard, classes.displayFlex)}>
                            <Box className={classes.partNumber}>
                                <Typography variant='body2' sx={{ color: '#526C78', marginRight: '8px' }}>{t("Part Number")}</Typography>
                                <Typography variant='body1' className={classes.partNumberChild}>{props.partNumber}</Typography>
                            </Box>
                            <Search width='24px' height='24' fill='#CED5D8' style={{ cursor: 'pointer' }} />
                        </Box>
                        <Divider />
                        <Box className={clsx(classes.partNumberCard, classes.displayFlex)}>
                            <Box>
                                <Typography className={classes.partNumberHaed} variant='body1'>{t("Brand")}</Typography>
                                <Typography variant='body2'>{selectedProduct.brand.name}</Typography>
                            </Box>
                            <Box>
                                <Typography className={classes.partNumberHaed} variant='body1'>{t("Average market price")}</Typography>
                                <Typography variant='body2'>{selectedProduct.salesPrice}</Typography>
                            </Box>
                        </Box>
                        <Divider />
                        <Box className={classes.partNumberCard}>
                            <Typography className={classes.partNumberHaed} variant='body1'>{t("Description")}</Typography>
                            <Typography variant='body2'>{props.desc}</Typography>
                        </Box>
                    </Box>
                </>
            }
        </Box >
    );
}

export default ProductDetails;
