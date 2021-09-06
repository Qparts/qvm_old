import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from "src/components/Ui/Button";
import AddBranch from './AddBranch';
import AddUser from './addUser/AddUser';
import { Box, Typography } from '@material-ui/core';
import AddUserVerification from './addUser/AddUserVerification';
import { useSnackbar } from 'notistack';
import CustomDialog from '../../../../components/Ui/Dialog';
import { Branch, User } from '../../../../icons/icons';
import helper from 'src/utils/helper';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    branchesActions: {
        paddingBottom: '10px',
        borderBottom: '1px solid #CED5D8',
    },
    branchesActionBtnCont: {
        '& button': {
            '@media (max-width: 355px)': {
                width: '100%'
            },
            '&:first-of-type': {
                '@media (max-width: 355px)': {
                    margin: theme.spacing(0, 0, 1.5)
                },
            }
        }
    },
    branchesIconMr: {
        marginRight: "5px"
    }
}));

// ----------------------------------------------------------------------

function BrancheActionsSection() {
    const classes = useStyles();
    const { t } = useTranslation();
    const theme = useTheme();
    const [addBranchIsOpen, setAddBranchIsOpen] = useState(false)
    const [addUserIsOpen, setAddUserIsOpen] = useState(false)
    const { verificationMode, verifiedEmail } = useSelector((state) => state.branches);
    const { error } = useSelector((state) => state.branches);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();



    useEffect(() => {
        if (error != null) {
            helper.enqueueSnackbarMessage(
                enqueueSnackbar,
                error.status == 409 ? t('Subscriber already registered') : error.data ? error.data : error.status,
                'error',
                closeSnackbar
            )
        }
    }, [error])

    return (

        <Box className={classes.branchesActions}>
            <Box className={classes.branchesActionBtnCont}>
                <Button
                    btnBg="btnBg"
                    btnWidth="btnWidth"
                    onClick={() => setAddUserIsOpen(true)}
                >
                    <User width="18px" height="18px" fill={theme.palette.primary.main} className={classes.branchesIconMr} />
                    {t("Add User")}
                </Button>
                <Button
                    onClick={() => setAddBranchIsOpen(true)}
                    btnWidth="btnWidth"
                >
                    <Branch width="14px" height="18px" fill={theme.palette.grey[0]} className={classes.branchesIconMr} />
                    {t("Add Branch")}
                </Button>
            </Box>

            <CustomDialog
                open={addBranchIsOpen}
                handleClose={() => setAddBranchIsOpen(false)}
                title={t("Add New Branch")}
                dialogWidth='dialogWidth'
            >
                <AddBranch setAddBranchIsOpen={setAddBranchIsOpen} />
            </CustomDialog>

            <CustomDialog
                open={addUserIsOpen}
                handleClose={() => setAddUserIsOpen(false)}
                title={t("Add New User")}>
                {verificationMode == null || verifiedEmail == null ?
                    <AddUser setAddUserIsOpen={setAddUserIsOpen} />
                    :
                    <>
                        {
                            verificationMode == "email" ?
                                <Typography variant="body2" sx={{ color: theme.palette.secondary.main, textAlign: 'center' }}>
                                    {t("Check your email to get verification code")}
                                </Typography>
                                :
                                <Typography variant="body2" sx={{ color: theme.palette.secondary.main, textAlign: 'center' }}>
                                    {t("Check your mobile to get verification code")}
                                </Typography>
                        }

                        <Box sx={{ mb: 3 }} />

                        <AddUserVerification setAddUserIsOpen={setAddUserIsOpen} />
                    </>

                }
            </CustomDialog>
        </Box>
    );
}

export default BrancheActionsSection;
