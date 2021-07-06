import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Upload } from '../../icons/icons';


// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    root: {},
    uploadStockBtn: {
        padding: '9px 16px',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)'
        }
    }
}));

const UploadStockBtn = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div>
            <Button variant="contained" className={classes.uploadStockBtn} style={{ background: props.bg, color: props.color }}>
                <Typography variant="body1" sx={{ marginRight: '5px' }}>{t("upload stock")}</Typography>
                <Upload width='21px' height='21px' fill={props.color} />
            </Button>
        </div>
    )
}

export default UploadStockBtn