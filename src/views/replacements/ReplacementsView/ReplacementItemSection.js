import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import ImageSlider from 'ac-react-simple-image-slider';
import Datatable from 'src/components/table/DataTable';
import constants from 'src/utils/constants';
import Accordion from '../../../components/Ui/Accordion';
import { Vector } from '../../../icons/icons';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    replacementsCard: {
        boxShadow: '0px 2px 4px rgba(20, 69, 91, 0.02);',
        border: '1px solid #E7F0F7',
        borderRadius: '20px',
        padding: '15px',
        position: 'relative',
        minHeight: '381px',
        '@media (max-width: 1120px) and (min-width: 960px)': {
            minHeight: '409px',
        },
        '@media (max-width: 765px) and (min-width: 600px)': {
            minHeight: '409px',
        },
        '@media (max-width: 599px) and (min-width: 300px)': {
            minHeight: 'auto',
        },
    },
    replacementsFlex: {
        display: 'flex',
        alignItems: 'center',
        '@media (max-width: 1120px) and (min-width: 960px)': {
            display: 'block',
        },
        '@media (max-width: 765px) and (min-width: 600px)': {
            display: 'block',
        },
        '@media (max-width: 415px) and (min-width: 300px)': {
            display: 'block',
        },
    },
    replacementsFlexSapceBet: {
        justifyContent: 'space-between'
    },
    replacementsInfo: {
        margin: theme.spacing(2, 0),
        textAlign: 'left'
    },
    replacementsValues: {
        color: theme.palette.secondary.main,
        marginLeft: theme.spacing(1),
        '@media (max-width: 1345px) and (min-width: 1280px)': {
            fontSize: theme.direction === 'ltr' ? '0.8rem' : theme.typography.body3.fontSize
        },
        '@media (max-width: 1210px) and (min-width: 1121px)': {
            fontSize: theme.direction === 'ltr' ? '0.8rem' : theme.typography.body3.fontSize
        },
        '@media (max-width: 825px) and (min-width: 766px)': {
            fontSize: theme.direction === 'ltr' ? '0.8rem' : theme.typography.body3.fontSize
        },
        '@media (max-width: 445px) and (min-width: 416px)': {
            fontSize: theme.direction === 'ltr' ? '0.8rem' : theme.typography.body3.fontSize
        },
    },
    slider: {
        border: '1px solid #a8a8a8',
        justifyContent: 'center',
        width: '202px',
        margin: 'auto',
        borderRadius: '5px',
        '& .css-olgc7d': {
            width: 'auto',
            height: 'auto'
        },
        '& img': {
            width: '160px',
            maxHeight: '190px',
            margin: 'auto'
        },
    },
    sliderIconRight: {
        transform: 'rotate(270deg)'
    },
    sliderIconLeft: {
        transform: 'rotate(90deg)'
    }
}));

// ----------------------------------------------------------------------

function ReplacementItemSection({ replacementItem }) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [page, setPage] = useState(0);
    const [imageData, setImageData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(constants.MAX);
    const { themeDirection } = useSelector((state) => state.settings);

    // useEffect(() => {
    //     let itemimageData = [];
    //     for (let image of replacementItem.images) {
    //         itemimageData.push({ src: image.imageURL200 });
    //     }
    //     setImageData(itemimageData);
    // }, []);

    return (

        <Box>
            <Card className={classes.replacementsCard}>
                {/* {imageData.length > 0 &&
                    <Box className={clsx(classes.slider, classes.replacementsFlex)}>
                        <ImageSlider
                            height='200px'
                            width='200px'
                            data={imageData}
                            autoPlay={false}
                            showArrows={imageData.length > 1}
                            showDots={false}
                            className={classes.slider}
                            leftArrowComponent={<Vector className={classes.sliderIconLeft} width='14' height='14' fill='#FFF' />}
                            rightArrowComponent={<Vector className={classes.sliderIconRight} width='14' height='14' fill='#FFF' />} />
                    </Box>
                } */}

                <Box className={classes.replacementsInfo}>
                    <Box className={classes.replacementsFlex} sx={{ marginBottom: '10px' }}>
                        <Typography variant="body4" sx={{ color: '#7F929C' }}>{t("Part Number")}:</Typography>
                        <Typography variant="body3" className={classes.replacementsValues}> {replacementItem.productNumber} </Typography>
                    </Box>

                    <Box className={classes.replacementsFlex} sx={{ marginBottom: '10px' }}>
                        <Typography variant="body4" sx={{ color: '#7F929C' }}>{t("Brand")}:</Typography>
                        <Typography variant="body3" className={classes.replacementsValues}> {themeDirection == 'ltr' ? replacementItem.brand.name : replacementItem.brand.nameAr} </Typography>
                    </Box>

                    <Box className={classes.replacementsFlex} sx={{ marginBottom: '10px' }}>
                        <Typography variant="body4" sx={{ color: '#7F929C' }}>{t("Description")}:</Typography>
                        <Typography variant="body3" className={classes.replacementsValues}>
                            {themeDirection == 'ltr' ? replacementItem.details : replacementItem.detailsAr}
                        </Typography>
                    </Box>

                </Box>

                <Accordion
                    head={t("Compatible original parts")}
                    accordionStyle="accordionStyle"
                    resetBorder="resetBorder">
                    <Datatable
                        header={[
                            {
                                name: t("Part Number"),
                                attr: 'productNumber',
                            },
                            {
                                name: t("Brand"),
                                attr:themeDirection == 'ltr' ? 'brand.name':'brand.nameAr'
                            }
                        ]}
                        datatable={replacementItem.replacementList}
                        page={page}
                        isLazy={false}
                        rowsPerPage={rowsPerPage}
                        hasPagination={true}
                        dataTablePad='dataTablePad'
                        dataTableReplacementItem='dataTableReplacementItem'
                    />
                </Accordion>
            </Card>
        </Box >
    );
}

export default ReplacementItemSection;
