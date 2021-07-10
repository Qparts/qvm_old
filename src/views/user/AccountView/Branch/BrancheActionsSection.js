import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import Button from "src/components/button/CustomButton";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AddBranch from './AddBranch';
import AddUser from './addUser/AddUser';
import {
    Box, Link, Hidden, Container,
    Typography, Alert
} from '@material-ui/core';
import AddUserVerification from './addUser/AddUserVerification';
import { useSnackbar } from 'notistack';
import { MIconButton } from 'src/theme';
import { Icon } from '@iconify/react';
import closeFill from '@iconify-icons/eva/close-fill';


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

function BrancheActionsSection() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [addBranchIsOpen, setAddBranchIsOpen] = useState(false)
    const [addUserIsOpen, setAddUserIsOpen] = useState(false)
    const { verificationMode, verifiedEmail } = useSelector((state) => state.branches);
    const { error } = useSelector((state) => state.branches);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();



    useEffect(() => {
        if (error != null) {
            enqueueSnackbar(error.status == 409 ? t('Subscriber already registered')
                : error.data ? error.data : error.status, {
                variant: 'error',
                action: (key) => (
                    <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                        <Icon icon={closeFill} />
                    </MIconButton>
                )
            });
        }
    }, [error])

    return (

        <div className="d-flex justify-content-end">
            {/* <h6 className="flex-fill ">{t("Branches")}</h6> */}
            <Button
                className="round"
                color="primary"
                className="mx-2"
                round
                simple
                onClick={() => setAddUserIsOpen(true)}
            >
                {t("Add User")}
            </Button>
            <Button
                color="primary"
                round
                className="mx-2"
                onClick={() => setAddBranchIsOpen(true)}

            >
                {t("Add Branch")}
            </Button>



            <Dialog
                onClose={() => setAddBranchIsOpen(false)}
                aria-labelledby="customized-dialog-title"
                open={addBranchIsOpen}
                className={classes.root}
            >
                <DialogTitle>
                    <Typography variant="h6" component="div">
                        {t("Add New Branch")}
                    </Typography>
                </DialogTitle>
                <DialogContent >

                    <AddBranch setAddBranchIsOpen={setAddBranchIsOpen} />
                </DialogContent>
            </Dialog>


            <Dialog
                aria-labelledby="customized-dialog-title"
                open={addUserIsOpen}
                className={classes.root}
            >
                <DialogTitle>
                    <Typography variant="h6" component="div">
                        {t("Add New User")}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {verificationMode == null || verifiedEmail == null ?
                        <AddUser setAddUserIsOpen={setAddUserIsOpen} />
                        :
                        <>
                            {
                                verificationMode == "email" ?
                                    <h7 className="mb-0 mt-3 d-block">
                                        {t("Check your email to get verification code")}
                                    </h7>
                                    :
                                    <h7 className="mb-0 mt-3 d-block">
                                        {t("Check your mobile to get verification code")}
                                    </h7>
                            }

                            <Box sx={{ mb: 3 }} />

                            <AddUserVerification setAddUserIsOpen={setAddUserIsOpen} />
                        </>

                    }
                </DialogContent>
            </Dialog>

        </div>

    );
}

export default BrancheActionsSection;
