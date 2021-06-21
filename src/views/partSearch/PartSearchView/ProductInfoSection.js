import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { setSelectedProduct } from '../../../redux/slices/partSearch';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Typography,
} from '@material-ui/core';
import Datatable from './../../../components/table/DataTable';
import constants from 'src/utils/constants';
import ProductDetails from './ProductDetails';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none',
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            textAlign: 'left',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        [theme.breakpoints.up('xl')]: {
            height: 320
        }
    }
}));

// ----------------------------------------------------------------------

function ProductInfoSection() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(constants.MAX);
    const { productInfoResult = [], error, selectedProduct } = useSelector((state) => state.PartSearch);
    const { themeDirection } = useSelector((state) => state.settings);

    const [expanded, setExpanded] = useState(true);

    const changeRowsPerPageHandler = (event) => {
        setRowsPerPage(event.target.value);
    };


    const showDetails = (item) => {
        dispatch(setSelectedProduct({ selectedProduct: JSON.parse(item) }))
    }

    return (
        <Box sx={{ width: '100%' }}>

            <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{t("Product information")}</Typography>
                </AccordionSummary>

                <AccordionDetails>


                    <Datatable
                        header={[
                            {
                                name: t("Part Number"),
                                attr: 'productNumber',
                            },
                            {
                                name: t("Brand"),
                                attr: themeDirection == 'ltr' ? 'brand.name' : 'brand.nameAr'
                            },
                            {
                                name: t("Average market price"),
                                attr: 'salesPrice'
                            }
                        ]}

                        actions={[
                            {
                                name: t("Details"),
                                action: showDetails,
                                icon: 'more-horizontal',

                            }
                        ]}
                        datatable={productInfoResult}
                        error={error}
                        onRowsPerPageChange={changeRowsPerPageHandler}
                        page={page}
                        isLazy={false}
                        rowsPerPage={rowsPerPage}
                    />


                </AccordionDetails>
            </Accordion>


            <Dialog
                onClose={() => dispatch(setSelectedProduct({ selectedProduct: null }))}
                aria-labelledby="customized-dialog-title"
                open={selectedProduct != null}
                className={classes.root}
            >
                <DialogTitle>
                    <Typography variant="h6" component="div">
                        {t("Product Details")}
                    </Typography>
                </DialogTitle>
                <DialogContent dividers sx={{ p: 2 }}>
                    <ProductDetails />
                </DialogContent>
            </Dialog>


        </Box>
    );
}

export default ProductInfoSection;
