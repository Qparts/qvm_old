import React from 'react';
import { useHistory } from "react-router";
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    Card,
    Box,
    ListItem,
    Typography,
    List,
} from '@material-ui/core';
import { setSelectedOffer } from 'src/redux/slices/specialOffer';
import { Calender } from '../../icons/icons';


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
        width: '85%',
        cursor: 'pointer'
    },
    companyName: {
        color: '#526C78',
    },
    endOfDATE: {
        color: '#526C78',
        margin: '0 7px'
    },
    partsNum: {
        margin: '15px 0',
        borderTop: '1px solid #ECF1F5',
        borderBottom: '1px solid #ECF1F5',
        padding: '10px 0',
        color: '#526C78',
        textAlign: 'left'
    },
    partsNumCont: {
        display: 'flex'
    },
    brands: {
        display: 'flex',
        margin: '0 0 0 15px',
        '& $li': {
            background: '#F4F6F8',
            borderRadius: '50%',
            padding: '8px',
            '& $img': {
                width: '20px',
                height: '20px',
                margin: 'auto',
            }
        }
    },
    brandLastChild: {
        background: theme.palette.secondary.main + '!important',
        color: theme.palette.grey[0],
        width: '35px',
        height: '35px',
    },
    discount: {
        position: 'absolute',
        top: 0,
        right: 0,
        background: '#F6F8FC',
        borderRadius: '10px',
        padding: '5px',
        textAlign: 'center'
    },
    percent: {
        color: '#F20505',
        lineHeight: 1
    },
    partsNumber: {
        color: '#082C3C',
        marginTop: '17px'
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

// ----------------------------------------------------------------------

const Offer = (props, { className, ...other }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { t } = useTranslation();
    const history = useHistory();

    const partsAvatars = props.parts;
    const partsAvatarsPlus = partsAvatars.length - 4;
    const x = partsAvatars.length > 4 ? partsAvatars.slice(0, 4) : partsAvatars

    return (
        <Card className={clsx(classes.root, classes.offerBody, className)} {...other}>
            <Box className={classes.discount}>
                <Typography variant="caption"> {t('Discount')}</Typography>
                <Typography variant="h6" className={classes.percent}>{props.discount}</Typography>
            </Box>
            <Typography variant="body4" className={classes.companyName}>{props.company}</Typography>
            <Typography
                variant="body3"
                className={classes.offerHeader}
                onClick={() => {
                    history.push(`/app/special-offer/${props.specialOffer.id}`);
                    dispatch(setSelectedOffer({ selectedOffer: props.specialOffer }));
                }}>
                {props.offer}
            </Typography>
            <Box sx={{ display: 'flex' }}>
                <Calender width='20' height='20' fill='#526C78' />
                <Typography variant="body4" className={classes.endOfDATE}> {t('end of offer')}</Typography>
                <Typography variant="subtitle2"> {props.date} </Typography>
            </Box>
            <Box className={classes.partsNum}>
                <Typography variant="caption"> {t('parts number')}</Typography>
                <Box className={classes.partsNumCont}>
                    <Typography variant="body3" className={classes.partsNumber}> {props.partsNum}</Typography>
                    <List className={classes.brands}>
                        {x.map((partAva) => (
                            <ListItem key={Math.random() * 2856984.368}>
                                <img src={partAva.shortcut} alt={partAva.shortcut} />
                            </ListItem>
                        ))}
                        {partsAvatars.length > 4 ? <ListItem className={classes.brandLastChild}> {"+" + partsAvatarsPlus} </ListItem> : null}
                    </List>
                </Box>
            </Box>
            <Typography variant="caption" className={classes.timeLeft}>
                {t('The offer time has passed')}
                <Typography variant="subtitle2" className={classes.timeLeftPercent}>{props.timeLeft}</Typography>
            </Typography>
            <Box className={classes.progress}>
                <Typography variant="caption" width={props.width} className={classes.progressBody} />
            </Box>
        </Card>
    )
}

export default Offer