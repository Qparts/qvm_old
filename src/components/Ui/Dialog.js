import React from 'react';
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
    uploadStockBtn: {
        padding: '9px 16px',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: '0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)'
        }
    },
    closeButton: {
        marginLeft: theme.spacing(4),
        padding: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    headCol: {
        color: theme.palette.secondary.main,
        borderBottom: '1px solid #EEF1F5',
        padding: theme.spacing(1, 2),
        '& h2': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }
    },
    dialogContent: {
        padding: theme.spacing(2)
    },
    dialogWidth: {
        [theme.breakpoints.up('sm')]: {
            minWidth: '500px',
        },
    },
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
            classes={{ paper: classes[props.dialogWidth] }}
        >
            <DialogTitle id="responsive-dialog-title" className={classes.headCol}>
                {props.title}
                {props.handleClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText style={{ margin: 0 }}>
                    {props.children}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default UploadStockBtn