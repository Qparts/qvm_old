import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { VectorOne, Vector } from '../../../../icons/icons';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {

    },
    userOrders: {
        background: theme.palette.grey[0],
        borderRadius: '10px',
        boxShadow: 'none',
        padding: '20px 10px',
        margin: '20px 0',
        width: '48%',
        position: 'relative'
    },
    incomingOrdersNotifi: {
        width: '23px',
        height: '23px',
        color: theme.palette.grey[0],
        borderRadius: '50%',
        lineHeight: '23px',
        display: 'block',
        background: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightRegular,
        position: 'absolute',
        top: '8px',
        right: '8px',
    },
    grey: {
        color: theme.palette.grey[1000]
    },
    marginLef: {
        marginLeft: '2%'
    },
    marginRig: {
        marginRight: '2%'
    }
}));

// ----------------------------------------------------------------------

function Premium() {
    const classes = useStyles();
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <div>
            <Typography variant="h6" sx={{ fontWeight: 500, fontWeight: theme.typography.fontWeightRegular }}>{t("premium")}</Typography>
            <div style={{ display: 'flex' }}>
                <Card className={clsx(classes.userOrders, classes.marginRig)}>
                    <Typography variant="body2" sx={{ margin: '12px auto', fontWeight: theme.typography.fontWeightMedium }}>{t("inc orders")}</Typography>
                    <Typography variant="subtitle2" className={classes.incomingOrdersNotifi}> 5 </Typography>
                    <Typography variant="h4" sx={{ color: theme.palette.secondary.darker, lineHeight: 1 }}>398</Typography>
                    <Typography variant="caption" className={classes.grey}> {t("total orders")} </Typography>
                    <div style={{ marginTop: '15px', lineHeight: 1.2 }}>
                        <Typography variant="caption" className={classes.grey} sx={{display: 'block'}}> {t("weekly report")} </Typography>
                        <Typography sx={{ color: '#00C48C' }} variant="caption"> 62% </Typography>
                        <VectorOne width='10' height='10' fill='#00C48C' />
                    </div>
                </Card>

                <Card className={clsx(classes.userOrders, classes.marginLef)}>
                    <Typography variant="body2" sx={{ margin: '12px auto', fontWeight: theme.typography.fontWeightMedium }}>{t("outgo orders")}</Typography>
                    <Typography variant="h4" sx={{ color: theme.palette.secondary.darker, lineHeight: 1 }}>500</Typography>
                    <Typography variant="caption" className={classes.grey}> {t("total orders")} </Typography>
                    <div style={{ marginTop: '15px', lineHeight: 1.2 }}>
                        <Typography variant="caption" className={classes.grey} sx={{display: 'block'}}> {t("weekly report")} </Typography>
                        <Typography sx={{ color: theme.palette.primary.main }} variant="caption"> 8% </Typography>
                        <Vector width='10' height='10' fill={theme.palette.primary.main} />
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Premium;
