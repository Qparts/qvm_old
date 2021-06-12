import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { CardActionArea } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------

function ProductDetails() {
    const classes = useStyles();
    const { selectedProduct, companies } = useSelector((state) => state.PartSearch);
    const { t } = useTranslation();


    return (
        <Box sx={{ width: '100%' }}>
            {selectedProduct != null &&
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            sx={{ height: 200 }}
                            src={selectedProduct.image}
                            onError={e => {
                                e.target.src = 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg';
                            }}
                        />
                        <CardContent>
                            <div className="row">
                                <div className="col-md-6">
                                    {t("Part Number")}
                                </div>

                                <div className="col-md-6">
                                    {selectedProduct.productNumber}
                                </div>

                                <div className="col-md-6">
                                    {t("Brand")}
                                </div>

                                <div className="col-md-6">
                                    {selectedProduct.brand.name}
                                </div>

                                <div className="col-md-6">
                                    {t("Description")}
                                </div>

                                <div className="col-md-6">
                                    {selectedProduct.desc}
                                </div>

                                <div className="col-md-6">
                                   { t("Average market price")}
                                </div>

                                <div className="col-md-6">
                                    {selectedProduct.salesPrice}
                                </div>


                            </div>

                        </CardContent>
                    </CardActionArea>
                </Card>
            }
        </Box >
    );
}

export default ProductDetails;
