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
    welcomeDialogWidth: { boxShadow: 'none' },
    welcomeCloseButton: {
        width: '30px',
        height: '30px',
        background: theme.palette.grey[0],
        borderRadius: '50%',
        position: 'absolute',
        top: '10px',
        right: '10px'
    },
    welcomeDialogContent: { padding: '0 !important' }
}));

// ----------------------------------------------------------------------

const Modal = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        props.welcomePopUp ?
            <Dialog
                fullScreen={fullScreen}
                fullWidth={props.fullWidth}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="responsive-dialog-title"
                classes={{ paper: classes.welcomeDialogWidth }}
            >
                {props.handleClose ? (
                    <IconButton aria-label="close" className={classes.welcomeCloseButton} onClick={props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
                <DialogContent className={classes.welcomeDialogContent}>
                    <DialogContentText style={{ margin: 0 }}>
                        {props.children}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
            :
            <Dialog
                fullScreen={fullScreen}
                fullWidth={props.fullWidth}
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

export default Modal