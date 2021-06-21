import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'src/components/Charts/Apexcharts';
import { merge } from 'lodash';
import { Edit, Company } from '../../../icons/icons';
import UploadStockBtn from '../../../components/Ui/UploadStockBtn'

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        padding: theme.spacing(3),
        borderRadius: '20px 0 154px 20px',
        background: 'rgb(229 234 244 / 45%)',
        boxShadow: 'none',
        marginBottom: '50px'
    },
    companyInfo: {
        fontSize: '0.875rem',
        color: '#7E8D99',
    },
    upgrade: {
        display: 'inline-block',
        background: '#FDD4D4',
        padding: '10px 15px',
        borderRadius: '15px'
    },
    headColor: {
        color: theme.palette.secondary.darker,
    }
}));

// ----------------------------------------------------------------------

TotalActiveUsers.propTypes = {
    className: PropTypes.string
};

function TotalActiveUsers({ className, ...other }) {
    const classes = useStyles();
    const theme = useTheme();
    const { t } = useTranslation();

    const chartData = [40];
    const chartOptions = merge(ApexChartsOption(), {
        chart: { sparkline: { enabled: true } },
        legend: { show: false },
        plotOptions: {
            radialBar: {
                hollow: { size: '78%' },
                track: { margin: 0 },
                dataLabels: {
                    name: { show: false },
                    value: {
                        offsetY: 6,
                        color: theme.palette.common.black,
                        fontSize: theme.typography.subtitle2.fontSize
                    }
                },
                labels: ["search attempts"]
            }
        }
    });

    return (
        <Card className={clsx(classes.root, className)} {...other}>
            <Link to='/app/dashboard' style={{textAlign: 'left', display: 'block'}}>
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
            <Typography variant="body1" sx={{ marginBottom: '15px' }}>
                <Typography variant="caption" className={classes.companyInfo}>50 {t("order")} - </Typography>
                <Typography variant="caption" className={classes.companyInfo}>5 {t("branch")} - </Typography>
                <Typography variant="caption" className={classes.companyInfo}>3 {t("user")}</Typography>
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: '8px' }}>{t("basic")}</Typography>
            <Link to='/app/dashboard' className={classes.upgrade}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>{t("upgrade to premium")}</Typography>
            </Link>
            <Typography variant="h6" sx={{ fontWeight: 500, margin: '30px auto 10px' }}>{t("use basic")}</Typography>
            <ReactApexChart
                type="radialBar"
                series={chartData}
                options={chartOptions}
                width={125}
                height={125}
            />
            <Typography variant="caption" className={classes.companyInfo}>4 {t("attempts out of")} 10 </Typography>
            <Typography variant="caption" className={classes.companyInfo} sx={{ display: 'block', marginTop: '30px' }}> {t("parts number in your stock")} </Typography>
            <Typography variant="h2" className={classes.headColor} sx={{ fontWeight: theme.typography.fontWeightRegular }}>15.030</Typography>
            <Typography variant="body1" sx={{ margin: '10px auto 45px'}}>
                <UploadStockBtn bg={theme.palette.grey[0]} color={theme.palette.primary.main} />
            </Typography>
        </Card>
    );
}

export default TotalActiveUsers;
