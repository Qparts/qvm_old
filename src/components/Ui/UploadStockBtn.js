import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Button,
} from '@material-ui/core';
import { Upload } from '../../icons/icons';
import CustomDialog from './Dialog'
import StockUpload from '../../views/stockUpload/StockUploadView/index';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    uploadStockBtn: {
        padding: '9px 16px',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)'
        }
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    headCol: {
        color: theme.palette.secondary.main,
        borderBottom: '1px solid #EEF1F5',
        padding: theme.spacing(2)
    }
}));

// ----------------------------------------------------------------------

const UploadStockBtn = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen} className={classes.uploadStockBtn} style={{ background: props.bg, color: props.color }}>
                <Upload width='21px' height='21px' fill={props.color} />
                <Typography variant="body3" sx={{ marginLeft: '5px' }}>{t("upload stock")}</Typography>
            </Button>

            <CustomDialog
                open={open}
                handleClose={handleClose}
                title={t("add stock")}
            >
                <StockUpload
                    handleChange={handleChange}
                    checked={checked} />
            </CustomDialog>
        </>
    )
}

export default UploadStockBtn