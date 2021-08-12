import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import { setSelectedProduct } from '../../../redux/slices/partSearch';
import Datatable from './../../../components/table/DataTable';
import constants from 'src/utils/constants';
import ProductDetails from './ProductDetails';
import TableAction from '../../../components/Ui/TableAction';
import SecContainer from '../../../components/Ui/SecContainer';
import CustomDialog from '../../../components/Ui/Dialog';
import { Plus } from "../../../icons/icons";

// ----------------------------------------------------------------------

function ProductInfoSection() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(constants.MAX);
    const { productInfoResult = [], error, selectedProduct } = useSelector((state) => state.PartSearch);
    const { themeDirection } = useSelector((state) => state.settings);

    const changeRowsPerPageHandler = (event) => {
        setRowsPerPage(event.target.value);
    };

    const showDetailsAction = (item) => {
        dispatch(setSelectedProduct({ selectedProduct: JSON.parse(item) }))
    }

    const showDetailsElement = (item) => {
        return (
            <TableAction
                type='partSearch'
                title={t("Details")}
                onClick={() => showDetailsAction(item)}
                textIcon={<Plus width='14' height='14' fill='#CED5D8' />} />
        )
    }

    return (
        <Box>
            <SecContainer
                header={t("Product information")}
                bodyP="bodyP">
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

                    actions={[{ element: showDetailsElement }]}
                    datatable={productInfoResult}
                    error={error}
                    onRowsPerPageChange={changeRowsPerPageHandler}
                    page={page}
                    isLazy={false}
                    rowsPerPage={rowsPerPage}
                    hasPagination={true}
                />
            </SecContainer>

            <CustomDialog
                open={selectedProduct != null}
                handleClose={() => dispatch(setSelectedProduct({ selectedProduct: null }))}
                title={t("Product Details")}>
                <ProductDetails />
            </CustomDialog>
        </Box>
    );
}

export default ProductInfoSection;
