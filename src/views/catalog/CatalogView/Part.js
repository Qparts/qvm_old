import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import ImageMapper from "react-image-mapper";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {
    Typography
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

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

function Part() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { part, partCoordinates, partImageHeight, partImageWidth } = useSelector((state) => state.catalogs);
    const { t } = useTranslation();
    const [partAreaDetails, setPartAreaDetails] = useState(null);

    const mapperAreaClickHandler = async (item) => {
        let parts = part.partGroups[0].parts;
        let selectedArea = parts.find((e) => item.name == e.positionNumber);
        setPartAreaDetails(selectedArea);
    };

    return (

        <>
            <div className="d-flex justify-content-center">
                <ImageMapper
                    heigh={(partImageHeight * 800) / partImageWidth}
                    width={800}
                    src={part.img}
                    onClick={(area) => mapperAreaClickHandler(area)}
                    map={{ name: "my-map", areas: partCoordinates }}
                />
            </div>



            <Dialog
                onClose={() => setPartAreaDetails(null)}
                aria-labelledby="customized-dialog-title"
                open={partAreaDetails != null}
                className={classes.root}
            >
                <DialogTitle>
                    <Typography variant="h6" component="div">
                        {t("catalogTab.partDetails")}
                    </Typography>
                </DialogTitle>
                <DialogContent dividers sx={{ p: 2 }}>
                    {partAreaDetails != null && (
                        <div>
                            <div className="row">
                                <div className="col-md-6">{t("catalogTab.referenceNumber")}</div>
                                <div className="col-md-6">{partAreaDetails.id}</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-6">{t("catalogTab.partNumber")}</div>

                                <div className="col-md-6">{partAreaDetails.number}</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-6">{t("catalogTab.partName")}</div>
                                <div className="col-md-6">{partAreaDetails.name}</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-6">{t("catalogTab.details")}</div>
                                <div className="col-md-6">{partAreaDetails.description}</div>
                            </div>
                        </div>
                    )}

                </DialogContent>
            </Dialog>

        </>
    );
}

export default Part;
