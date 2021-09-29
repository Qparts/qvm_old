import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Divider, CardMedia } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Search } from 'src/icons/icons';
import helper from 'src/utils/helper';
import { PATH_APP } from 'src/routes/paths';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    productImg: {
        width: '250px',
        height: '159px',
        margin: 'auto'
    },
    partNumber: {
        display: 'flex',
        background: '#FFEDED',
        borderRadius: '15px',
        padding: '11px',
        width: '80%',
    },
    partNumberMainSearch: {
        width: '100%'
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
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();

    let dialogContent;
    let relatedBox = (
        <Box className={clsx(classes.partNumber, props.type === 'mainSearch' ? classes.partNumberMainSearch : null)}>
            <Typography variant='body2' sx={{ color: '#526C78', marginRight: '8px' }}>{t("Part Number")}</Typography>
            <Typography variant='body1' className={classes.partNumberChild}>{props.partNumber}</Typography>
        </Box>
    )

    if (props.type === 'mainSearch') {
        dialogContent = (
            <>
                <CardMedia
                    component="img"
                    className={classes.productImg}
                    src={props.image}
                    onError={e => {
                        e.target.src = 'https://q-product.ams3.digitaloceanspaces.com/na.png';
                    }}
                />
                <Box>
                    <Box className={classes.partNumberCard}>
                        {relatedBox}
                    </Box>
                    <Divider />
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
                <Box className={clsx(classes.partNumberCard, classes.displayFlex, classes[props.partNumberCatalog])}>
                    {relatedBox}
                    <Box onClick={() => helper.handlePartSearch(dispatch, history, PATH_APP.general.partSearch, props.partNumber)}>
                        <Search width='24px' height='24' fill='#CED5D8' style={{ cursor: 'pointer' }} />
                    </Box>
                </Box>
                <Divider />
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
