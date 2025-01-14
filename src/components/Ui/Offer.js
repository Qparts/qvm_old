import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    Card,
    Box,
    Typography,
    List, 
    ListItem
} from '@material-ui/core';
import { Calender } from '../../icons/icons';
import ProgressBar from './ProgressBar';
import Avatar from './Avatar'

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    offer: {
        margin: '34px auto 0',
    },
    offerBody: {
        boxShadow: '0px 2px 4px rgba(20, 69, 91, 0.02);',
        border: '1px solid #E7F0F7',
        borderRadius: '20px',
        padding: '20px',
        position: 'relative',
        textAlign: 'left'
    },
    offerHeader: {
        color: theme.palette.secondary.darker,
        margin: '15px 0',
        minHeight: '49px',
        WebkitLineClamp: 2
    },
    companyName: {
        color: '#526C78',
        WebkitLineClamp: 1
    },
    textTruncate: {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        wordBreak: 'break-all'
    },
    offerTimeLeft: {
        display: 'flex',
        '@media (max-width: 1000px) and (min-width: 960px)': {
            alignItems: theme.direction === 'ltr' ? 'center' : 'normal'
        },
    },
    endOfDATE: {
        color: '#526C78',
        margin: '0 7px',
        '@media (max-width: 1000px) and (min-width: 960px)': {
            fontSize: theme.direction === 'ltr' ? '0.726rem' : theme.typography.body4.fontSize
        },
    },
    date: {
        '@media (max-width: 970px) and (min-width: 960px)': {
            fontSize: theme.direction === 'ltr' ? '0.8rem' : theme.typography.subtitle2.fontSize
        },
    },
    partsNum: {
        margin: '15px 0',
        borderTop: '1px solid #ECF1F5',
        borderBottom: '1px solid #ECF1F5',
        padding: '10px 0',
        color: '#526C78',
    },
    partsNumCont: {
        display: 'flex',
        alignItems: 'center'
    },
    brands: {
        display: 'flex',
        margin: '0 0 0 10px',
        paddingBottom: 0,
        '& $li': {
            padding: '0 0 0 8px',
            '&:first-of-type': {
                padding: 0
            },
            '& $img': {
                width: '18px',
                height: '18px',
                margin: 'auto',
            }
        }
    },
    partsNumber: {
        color: theme.palette.secondary.darker,
        marginTop: theme.spacing(1.25)
    },
}));

// ----------------------------------------------------------------------

const Offer = (props, { className, ...other }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const partsAvatars = props.tags;
    const partsAvatarsPlus = partsAvatars.length - 4;
    const brandTags = partsAvatars.length > 4 ? partsAvatars.slice(0, 4) : partsAvatars;

    return (
        <Card className={clsx(classes.root, classes.offerBody, className)} {...other}>
            <Typography variant="body4" className={clsx(classes.companyName, classes.textTruncate)}>
                {props.company}
            </Typography>
            <Typography
                variant="body3"
                className={clsx(classes.offerHeader, classes.textTruncate)}>
                {props.offer}
            </Typography>
            <Box className={classes.offerTimeLeft}>
                <Calender width='20' height='20' fill='#526C78' />
                <Typography variant="body4" className={classes.endOfDATE}> {t('end of offer')}</Typography>
                <Typography variant="subtitle2" className={classes.date}> {props.date} </Typography>
            </Box>
            <Box className={classes.partsNum}>
                <Typography variant="caption"> {t('Number of products')}</Typography>
                <Box className={classes.partsNumCont}>
                    <Typography variant="body3" className={classes.partsNumber}> {props.partsNum}</Typography>
                    <List className={classes.brands}>
                        {brandTags.map((tag, index) => (
                            <ListItem key={index}>
                                <Avatar avatarWidth='avatarWidth'>
                                    <img src={`/static/images/brands/${tag}.png`} alt='Brand' />
                                </Avatar>
                            </ListItem>
                        ))}
                        {partsAvatars.length > 4 ?
                            <ListItem>
                                <Avatar lastChildBg='lastChildBg'>
                                    {"+" + partsAvatarsPlus}
                                </Avatar>
                            </ListItem> : null
                        }
                    </List>
                </Box>
            </Box>
            <ProgressBar
                title={t('The offer time has passed')}
                timeLeft={props.timeLeft}
                width={props.width} />
        </Card>
    )
}

export default Offer