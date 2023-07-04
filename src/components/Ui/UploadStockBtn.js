import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Button,
} from '@material-ui/core';
import { Upload } from '../../icons/icons';
import StockUploadDialog from './StockUploadDialog'

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    root: {},
    uploadStockBtn: {
        padding: '9px 16px',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)'
        }
    },
}));

// ----------------------------------------------------------------------

const UploadStockBtn = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen} className={classes.uploadStockBtn} style={{ background: props.bg, color: props.color }}>
                <Upload width='21px' height='21px' fill={props.color} />
                <Typography variant="body3" sx={{ marginLeft: '5px' }}>{t("upload stock")}</Typography>
            </Button>
            <StockUploadDialog open={open} handleClose={handleClose} />
        </>
    )
}

export default UploadStockBtn