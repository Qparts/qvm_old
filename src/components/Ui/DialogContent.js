import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Divider, CardMedia } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Search } from '../../icons/icons';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    productImg: {
        width: '350px',
        height: '170px'
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
        '&:last-of-type': {
            paddingBottom: 0
        },
    },
    partNumberCardCatalog: {
        '&:first-of-type': {
            paddingBottom: 0
        },
    },
    partNumberCatalog: {
        paddingTop: 0
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

function DialogContent(props) {
    const classes = useStyles();
    const { t } = useTranslation();

    let dialogContent;
    let relatedBox = (
        <>
            <Box className={clsx(classes.partNumberCard, classes.displayFlex, classes[props.partNumberCatalog])}>
                <Box className={classes.partNumber}>
                    <Typography variant='body2' sx={{ color: '#526C78', marginRight: '8px' }}>{t("Part Number")}</Typography>
                    <Typography variant='body1' className={classes.partNumberChild}>{props.partNumber}</Typography>
                </Box>
                <Search width='24px' height='24' fill='#CED5D8' style={{ cursor: 'pointer' }} />
            </Box>
            <Divider />
        </>
    )

    if (props.type === 'mainSearch') {
        dialogContent = (
            <>
                <CardMedia
                    component="img"
                    className={classes.productImg}
                    src={props.image}
                    onError={e => {
                        e.target.src = 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg';
                    }}
                />
                <Box>
                    {relatedBox}
                    <Box className={clsx(classes.partNumberCard, classes.displayFlex)}>
                        <Box>
                            <Typography className={classes.partNumberHaed} variant='body1'>{t("Brand")}</Typography>
                            <Typography variant='body2'>{props.brand}</Typography>
                        </Box>
                        <Box>
                            <Typography className={classes.partNumberHaed} variant='body1'>{t("Average market price")}</Typography>
                            <Typography variant='body2'>{props.average}</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box className={classes.partNumberCard}>
                        <Typography className={classes.partNumberHaed} variant='body1'>{t("Description")}</Typography>
                        <Typography variant='body2'>{props.desc}</Typography>
                    </Box>
                </Box>
            </>
        )
    } else {
        dialogContent = (
            <Box>
                {relatedBox}
                <Box className={classes.partNumberCard}>
                    <Typography className={classes.partNumberHaed} variant='body1'>{t("Part Name")}</Typography>
                    <Typography variant='body2'>{props.name}</Typography>
                </Box>
                <Divider />
                <Box className={classes.displayFlex}>
                    {props.partAreaDetails.split("\n").map((item, index) => {
                        if (item)
                            return (
                                <>
                                    <Box className={clsx(classes.partNumberCard, classes.partNumberCardCatalog)} key={index}>
                                        <Typography className={classes.partNumberHaed} variant='body1'>{t(item.split(":")[0])}</Typography>
                                        <Typography variant='body2'>{item.split(":")[1]}</Typography>
                                    </Box>
                                </>
                            )
                    })
                    }
                </Box>
            </Box>
        )
    }

    return dialogContent;
}

export default DialogContent;
