import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import Button from "src/components/button/CustomButton";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AddBranch from './AddBranch';
import {

    Typography
} from '@material-ui/core';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------

function BrancheActionsSection() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [addBranchIsOpen, setAddBranchIsOpen] = useState(false)
    const [addUserIsOpen, setAddUserIsOpen] = useState(false)

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
                {t("setting.addUser")}
            </Button>
            <Button
                color="primary"
                round
                className="mx-2"
                onClick={() => setAddBranchIsOpen(true)}

            >
                {t("setting.addBranch")}
            </Button>



            <Dialog
                onClose={() => setAddBranchIsOpen(false)}
                aria-labelledby="customized-dialog-title"
                open={addBranchIsOpen}
                className={classes.root}
            >
                <DialogTitle>
                    <Typography variant="h6" component="div">
                        {t("Add Branch")}
                    </Typography>
                </DialogTitle>
                <DialogContent >

                    <AddBranch setAddBranchIsOpen={setAddBranchIsOpen} />
                </DialogContent>
            </Dialog>

        </div>

    );
}

export default BrancheActionsSection;
