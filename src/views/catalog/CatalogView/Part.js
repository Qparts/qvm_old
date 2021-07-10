import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ImageMapper from "react-image-mapper";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {
    Typography,
    IconButton,
    Box,
    Divider
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Search } from '../../../icons/icons';

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
    },
    partHead: {
        color: theme.palette.secondary.main,
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: 0
    },
    partHeadChild: {
        borderBottom: '1px solid #EEF1F5',
    },
    partNumberCont: {
        marginBottom: theme.spacing(2)
    },
    partNumber: {
        display: 'flex',
        background: '#FFEDED',
        borderRadius: '15px',
        padding: '11px',
        width: '80%',
    },
    partNumberChild: {
        color: theme.palette.primary.main
    },
    partNumberCard: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    partNumberHaed: {
        color: theme.palette.secondary.main,
    },
    displayFlex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}));

// ----------------------------------------------------------------------

function Part() {
    const classes = useStyles();
    const { part, partCoordinates, partImageHeight, partImageWidth } = useSelector((state) => state.catalogs);
    const { t } = useTranslation();
    const [partAreaDetails, setPartAreaDetails] = useState(null);

    const mapperAreaClickHandler = async (item) => {
        let parts = part.partGroups[0].parts;
        let selectedArea = parts.find((e) => item.name == e.positionNumber);
        setPartAreaDetails(selectedArea);
    };

    console.log(partAreaDetails)

    return (
        <>
            <Box>
                <ImageMapper
                    heigh={(partImageHeight * 800) / partImageWidth}
                    width={800}
                    src={part.img}
                    onClick={(area) => mapperAreaClickHandler(area)}
                    map={{ name: "my-map", areas: partCoordinates }}
                />
            </Box>
            <Dialog
                onClose={() => setPartAreaDetails(null)}
                aria-labelledby="customized-dialog-title"
                open={partAreaDetails != null}
                className={classes.root}
            >
                <DialogTitle className={classes.partHead}>
                    <Box className={clsx(classes.partHeadChild, classes.displayFlex)}>
                        <Typography variant='body1'>{t("Part Details")}</Typography>
                        <IconButton aria-label="close" onClick={() => setPartAreaDetails(null)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent style={{padding: '16px'}}>
                    {partAreaDetails != null && (
                        <Box>
                            <Box className={clsx(classes.partNumberCont, classes.displayFlex)}>
                                <Box className={classes.partNumber}>
                                    <Typography variant='body2' sx={{color: '#526C78', marginRight: '8px'}}>{t("Part Number")}</Typography>
                                    <Typography variant='body1' className={classes.partNumberChild}>{partAreaDetails.number}</Typography>
                                </Box>
                                <Search width='24px' height='24' fill='#CED5D8' style={{cursor: 'pointer'}} />
                            </Box>
                            <Divider />
                            <Box className={classes.partNumberCard}>
                                <Typography className={classes.partNumberHaed} variant='body1'>{t("Part Name")}</Typography>
                                <Typography variant='body2'>{partAreaDetails.name}</Typography>
                            </Box>
                            <Divider />
                            <Box className={classes.partNumberCard}>
                                <Typography className={classes.partNumberHaed} variant='body1'>{t("Description")}</Typography>
                                <Typography variant='body2'>{partAreaDetails.description}</Typography>
                            </Box>
                        </Box>
                    )}

                </DialogContent>
            </Dialog>
        </>
    );
}

export default Part;
