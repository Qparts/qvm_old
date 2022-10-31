import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomDialog from './Dialog'
import StockUpload from '../../views/stockUpload/StockUploadView/index';

// ----------------------------------------------------------------------

const StockUploadDialog = (props) => {
    const { t } = useTranslation();

    return (
        <CustomDialog
            open={props.open}
            handleClose={props.handleClose}
            title={t("add stock")}
        >
            <StockUpload />
        </CustomDialog>
    )
}

export default StockUploadDialog