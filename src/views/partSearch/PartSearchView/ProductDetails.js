import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import DialogContent from '../../../components/Ui/DialogContent'

// ----------------------------------------------------------------------

function ProductDetails() {
    const { selectedProduct } = useSelector((state) => state.PartSearch);

    return (
        <Box>
            {selectedProduct != null &&
                <DialogContent
                    type='mainSearch'
                    image={selectedProduct.image}
                    partNumber={selectedProduct.productNumber}
                    brand={selectedProduct.brand.name}
                    average={selectedProduct.salesPrice}
                    desc={selectedProduct.desc} />
            }
        </Box >
    );
}

export default ProductDetails;
