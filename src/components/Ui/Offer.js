import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Calender } from '../../icons/icons'
import {
    Card,
    Typography,
    Box
} from '@material-ui/core';


// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    offer: {
        margin: '26px auto 0',
    },
    offerBody: {
        boxShadow: '0px 2px 4px rgba(20, 69, 91, 0.02);',
        border: '1px solid #E7F0F7',
        borderRadius: '20px',
        padding: '20px',
    },
    offerHeader: {
        color: '#082C3C',
        margin: '15px 0',
        minHeight: '50px',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    companyName: {
        color: '#526C78',
    },
    endOfDATE: {
        color: '#526C78',
        margin: '0 7px'
    },
    relatedInfo: {
        margin: '15px 0',
        borderTop: '1px solid #ECF1F5',
        borderBottom: '1px solid #ECF1F5',
        padding: '10px 0',
        display: 'flex',
        color: '#526C78',
        textAlign: 'left'
    },
    partsNum: {
        width: '49%',
    },
    discount: {
        width: '49%',
        borderLeft: '1px solid #ECF1F5',
        paddingLeft: '15px',
    },
    percent: {
        color: '#F20505'
    },
    partsNumber: {
        color: '#082C3C'
    },
    timeLeft: {
        display: 'flex',
        color: '#526C78'
    },
    timeLeftPercent: {
        margin: '-2px 0 0 10px',
        color: '#082C3C'
    },
    progress: {
        background: '#ECF1F5',
        borderRadius: '10px',
        height: '5px',
    },
    progressBody: {
        display: 'block',
        height: '100%',
        background: 'linear-gradient(270deg, #F20505 0%, #F2BE05 100%)',
        borderRadius: '10px',
    }
}));

const Offer = (props, { className, ...other }) => {

    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Card className={clsx(classes.root, classes.offerBody, className)} {...other}>
            <Typography variant="body1" className={classes.companyName}>{props.company}</Typography>
            <Typography variant="h6" className={classes.offerHeader}>{props.offer}</Typography>
            <Typography variant="body2" style={{ display: 'flex' }}>
                <Calender width='20' height='20' fill='#526C78' />
                <Typography variant="body-2" className={classes.endOfDATE}> {t('end of offer')}</Typography>
                <Typography variant="subtitle2"> {props.date} </Typography>
            </Typography>
            <Box className={classes.relatedInfo}>
                <Box className={classes.partsNum}>
                    <Typography variant="caption"> {t('parts number')}</Typography>
                    <Typography variant="subtitle1" className={classes.partsNumber}> {props.partsNum}</Typography>
                </Box>
                <Box className={classes.discount}>
                    <Typography variant="caption"> {t('discount')}</Typography>
                    <Typography variant="subtitle1" className={classes.percent}>{props.discount}</Typography>
                </Box>
            </Box>
            <Typography variant="caption" className={classes.timeLeft}>
                {t('The offer time has passed')}
                <Typography variant="subtitle2" className={classes.timeLeftPercent}>{props.timeLeft}</Typography>
            </Typography>
            <Box className={classes.progress}>
                <Typography variant="caption" width={props.width} className={classes.progressBody}/>
            </Box>
        </Card>
    )
}

export default Offer