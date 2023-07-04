import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import AddBranch from './AddBranch';
import AddUser from './addUser/AddUser';
import AddUserVerification from './addUser/AddUserVerification';
import Button from "src/components/Ui/Button";
import Subscription from "src/views/upgradeSubscription/UpgradeSubscriptionView/PremiumPlanSubscription";
import helper from 'src/utils/helper';
import CustomDialog from '../../../../components/Ui/Dialog';
import { Branch, User } from '../../../../icons/icons';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    branchesActions: {
        padding: theme.spacing(1.25, 0, 1.25, 1.875),
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

function BrancheActionsSection({
    addUserIsOpen,
    setAddUserIsOpen,
    addBranchIsOpen,
    setAddBranchIsOpen,
    openAddUserModel,
    openAddBranchModel,
    usersNum,
    branchesNum
}) {
    const classes = useStyles();
    const { t } = useTranslation();
    const theme = useTheme();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { verificationMode, verifiedEmail } = useSelector((state) => state.branches);
    const { error } = useSelector((state) => state.branches);

    useEffect(() => {
        if (error != null) {
            helper.enqueueSnackbarMessage(
                enqueueSnackbar,
                error.status == 409 ? t('Subscriber already registered') : error.data ? error.data : error.status,
                'error',
                closeSnackbar
            )
        }
    }, [error]);

    const upgradeSubscription = (setStat) => {
        return <Subscription
            settings={true}
            close={() => setStat(false)}
            addUserCheck={usersNum > 0}
            addBranchCheck={branchesNum > 0} />
    }

    return (

        <Box className={classes.branchesActions}>
            <Box className={classes.branchesActionBtnCont}>
                <Button
                    btnBg="btnBg"
                    btnWidth="btnWidth"
                    onClick={openAddUserModel}
                >
                    <User width="18px" height="18px" fill={theme.palette.primary.main} className={classes.branchesIconMr} />
                    {t("Add User")}
                </Button>
                <Button
                    onClick={openAddBranchModel}
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
                {branchesNum > 0 ?
                    <AddBranch setAddBranchIsOpen={setAddBranchIsOpen} /> :
                    upgradeSubscription(setAddBranchIsOpen)}
            </CustomDialog>

            <CustomDialog
                open={addUserIsOpen}
                handleClose={() => setAddUserIsOpen(false)}
                title={t("Add New User")}>
                {verificationMode == null || verifiedEmail == null ?
                    usersNum > 0 ?
                        <AddUser setAddUserIsOpen={setAddUserIsOpen} /> :
                        upgradeSubscription(setAddUserIsOpen)
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
