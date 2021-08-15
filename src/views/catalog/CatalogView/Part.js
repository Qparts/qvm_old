import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ImageMapper from "react-image-mapper";
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CustomDialog from '../../../components/Ui/Dialog';
import DialogContent from '../../../components/Ui/DialogContent'

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
    partImgCont: {
        '@media (max-width: 871px)': {
            overflowX: 'scroll',
        },
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
            <Box className={classes.partImgCont}>
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
                    <DialogContent
                        partNumber={partAreaDetails.number}
                        name={partAreaDetails.name}
                        partAreaDetails={partAreaDetails.description}
                        partNumberCatalog='partNumberCatalog' />
                )}
            </CustomDialog>
        </>
    );
}

export default Part;
