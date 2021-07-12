import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ImageMapper from "react-image-mapper";
import {
    Typography,
    Box,
    Divider
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Search } from '../../../icons/icons';
import CustomDialog from '../../../components/Ui/Dialog'

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
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
        padding: theme.spacing(2, 0),
        '&:last-of-type, &:first-of-type': {
            paddingBottom: 0
        },
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

            <CustomDialog
                title={t("Part Details")}
                handleClose={() => setPartAreaDetails(null)}
                open={partAreaDetails != null}
                dialogWidth='dialogWidth'
            >
                {partAreaDetails != null && (
                    <Box>
                        <Box className={clsx(classes.partNumberCont, classes.displayFlex)}>
                            <Box className={classes.partNumber}>
                                <Typography variant='body2' sx={{ color: '#526C78', marginRight: '8px' }}>{t("Part Number")}</Typography>
                                <Typography variant='body1' className={classes.partNumberChild}>{partAreaDetails.number}</Typography>
                            </Box>
                            <Search width='24px' height='24' fill='#CED5D8' style={{ cursor: 'pointer' }} />
                        </Box>
                        <Divider />
                        <Box className={classes.partNumberCard}>
                            <Typography className={classes.partNumberHaed} variant='body1'>{t("Part Name")}</Typography>
                            <Typography variant='body2'>{partAreaDetails.name}</Typography>
                        </Box>
                        <Divider />
                        <Box className={classes.displayFlex}>
                            {partAreaDetails.description.split("\n").map((item, index) => {
                                if (item)
                                    return (
                                        <>
                                            <Box className={classes.partNumberCard}>
                                                <Typography className={classes.partNumberHaed} variant='body1'>{t(item.split(":")[0])}</Typography>
                                                <Typography variant='body2'>{item.split(":")[1]}</Typography>
                                            </Box>
                                        </>
                                    )
                            })
                            }
                        </Box>
                    </Box>
                )}
            </CustomDialog>
        </>
    );
}

export default Part;
