import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomDialog from './Dialog'
import StockUpload from '../../views/stockUpload/StockUploadView/index';

// ----------------------------------------------------------------------

const StockUploadDialog = (props) => {
    const { t } = useTranslation();
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <CustomDialog
            open={props.open}
            handleClose={props.handleClose}
            title={t("add stock")}
        >
            <StockUpload
                handleChange={handleChange}
                checked={checked} />
        </CustomDialog>
    )
}

export default StockUploadDialog