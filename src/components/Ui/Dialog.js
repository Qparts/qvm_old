import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    IconButton,
    useMediaQuery,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title" className={classes.headCol}>
                {props.title}
                {props.handleClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent>
                <DialogContentText style={{ margin: 0 }}>
                    {props.children}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default UploadStockBtn