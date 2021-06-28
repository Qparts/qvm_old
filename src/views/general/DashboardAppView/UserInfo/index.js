import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Typography, Box } from '@material-ui/core';
import { Edit, Company } from '../../../../icons/icons';
import UploadStockBtn from '../../../../components/Ui/UploadStockBtn';
import Basic from './Basic';
import Premium from './Premium';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        padding: theme.spacing(4, 2),
        borderRadius: '20px 0 154px 20px',
        background: 'rgb(229 234 244 / 45%)',
        boxShadow: 'none',
        // marginBottom: '50px'
    },
    companyInfo: {
        fontSize: '0.875rem',
        color: '#7E8D99',
    },
    headColor: {
        color: theme.palette.secondary.darker,
    }
}));

// ----------------------------------------------------------------------

UserInfo.propTypes = {
    className: PropTypes.string
};

function UserInfo({ className, ...other }) {
    const classes = useStyles();
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Card className={clsx(classes.root, className)} {...other}>
            <Link to='/app/dashboard' style={{ textAlign: 'left', display: 'block' }}>
                <Edit width='20' height='20' fill='#7E8D99' />
            </Link>
            <Typography variant="body1" sx={{
                textAlign: 'center',
                background: '#FFFFFF',
                boxShadow: '0px 2px 4px rgb(0 0 0 / 3%)',
                width: '69px',
                height: '69px',
                margin: '0 auto 15px',
                lineHeight: '88px',
                borderRadius: '50%',
            }}>
                <Company width='26' height='32' fill='#7E8D99' />
            </Typography>
            <Typography variant="h5" className={classes.headColor}>الحميدان</Typography>
            <Box sx={{ marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body2" className={classes.companyInfo}>50 {t("order")} - </Typography>
                <Typography variant="body2" className={classes.companyInfo}>5 {t("branch")} - </Typography>
                <Typography variant="body2" className={classes.companyInfo}>3 {t("user")}</Typography>
            </Box>
            <Basic />
            <Typography variant="subtitle2" className={classes.companyInfo} sx={{ display: 'block', marginTop: '30px' }}> {t("parts number in your stock")} </Typography>
            <Typography variant="h2" className={classes.headColor} sx={{ fontWeight: theme.typography.fontWeightRegular }}>15.030</Typography>
            <Typography variant="body1" sx={{ margin: '10px auto 45px' }}>
                <UploadStockBtn bg={theme.palette.grey[0]} color={theme.palette.primary.main} />
            </Typography>
        </Card>
    );
}

export default UserInfo;
