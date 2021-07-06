import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import Datatable from 'src/components/table/DataTable';
import 'react-slideshow-image/dist/styles.css'
import { loadBranches } from 'src/redux/slices/branches';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from "src/components/button/CustomButton";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AddBranch from './AddBranch';
import AddUser from './addUser/AddUser';
import AddUserVerification from './addUser/AddUserVerification';
import {
    Typography
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------

function BrancheItemsSection() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { themeDirection } = useSelector((state) => state.settings);
    const { branches, verificationMode, verifiedEmail } = useSelector((state) => state.branches);
    const { countries } = useSelector(
        (state) => state.authJwt
    );
    const [page, setPage] = useState(0);
    const [addUserIsOpen, setAddUserIsOpen] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);


    useEffect(() => {
        dispatch(loadBranches(countries));
    }, []);

    // const x = branches.map(user => {
    //     user.users.map(x => {
    //         console.log(x)
    //     })
    // });

    const noChildComponent = (branch) => {
        return (
            <div className="text-center py-4">
                <PersonAddIcon fontSize="large" color="disabled" />
                <h6 className="pt-2">
                    you didn't add users to this branch yet
                </h6>


                <Button
                    className="round"
                    color="primary"
                    className="mx-2"
                    round
                    onClick={() => {
                        setAddUserIsOpen(true);
                        setSelectedBranch(branch);
                    }}
                >
                    {t("Add User")}
                </Button>
            </div>
        )
    }

    return (

        <Box sx={{ width: '100%' }}>


            <Datatable
                header={[
                    {
                        name: t("Name"),
                        attr: themeDirection == 'ltr' ? 'branchName' : 'branchNameAr',
                    },
                    {
                        name: t("Country"),
                        attr: themeDirection == 'ltr' ? 'countryName' : 'countryNameAr',
                    },
                    {
                        name: t("Region"),
                        attr: themeDirection == 'ltr' ? 'regionName' : 'regionNameAr',
                    },
                    {
                        name: t("City"),
                        attr: themeDirection == 'ltr' ? 'cityName' : 'cityNameAr',

                    }

                ]}

                // childData="users"
                // childHeader={[
                //     {
                //         name: t("Name"),
                //         attr: 'name',
                //     },
                //     {
                //         name: t("Phone"),
                //         attr: 'mobile',
                //     },
                //     {
                //         name: t("Email"),
                //         attr: 'email',

                //     }]}
                // hasChild={true}
                datatable={branches}
                showChildNumbers={true}
                noChildComponent={noChildComponent}
                childTitle={t("Users")}
                page={page}
                isLazy={false}
            />

            <Box sx={{ mb: 6 }} />

            <Datatable
                header={[
                    {
                        name: t("Name"),
                        attr: 'name',
                    },
                    {
                        name: t("Phone"),
                        attr: 'mobile',
                    },
                    {
                        name: t("Email"),
                        attr: 'email',

                    },
                    {
                        name: t("Name"),
                        attr: themeDirection == 'ltr' ? 'branchName' : 'branchNameAr',
                    },
                ]}
                datatable={branches}
                page={page}
                isLazy={false}
            />

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
                        <AddUser setAddUserIsOpen={setAddUserIsOpen}
                            selectedBranch={selectedBranch}
                            setSelectedBranch={setSelectedBranch} />
                        :
                        <>
                            {
                                verificationMode == "email" ?
                                    <h6 className="mb-0 mt-3 d-block">
                                        {t("Check your email to get verification code")}
                                    </h6>
                                    :
                                    <h6 className="mb-0 mt-3 d-block">
                                        {t("Check your mobile to get verification code")}
                                    </h6>
                            }

                            <Box sx={{ mb: 3 }} />

                            <AddUserVerification setAddUserIsOpen={setAddUserIsOpen} />
                        </>

                    }
                </DialogContent>
            </Dialog>


        </Box >

    );
}

export default BrancheItemsSection;
