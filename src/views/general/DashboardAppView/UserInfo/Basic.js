import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ReactApexChart from 'react-apexcharts';
import { ApexChartsOption } from 'src/components/Charts/Apexcharts';
import { merge } from 'lodash';
import { fNumber } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 250;
const LEGEND_HEIGHT = 72;

const useStyles = makeStyles((theme) => ({
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
    chart: {
        height: CHART_HEIGHT,
        minHeight: CHART_HEIGHT,
        '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
        '& .apexcharts-canvas foreignObject': {
            display: 'none'
        },
        '& .apexcharts-legend': {
            height: LEGEND_HEIGHT,
            alignContent: 'center',
            position: 'relative !important',
            top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
        }
    }
}));

// ----------------------------------------------------------------------

function Basic() {
    const classes = useStyles();
    const theme = useTheme();
    const { t } = useTranslation();

    const chartData = [1, 9];
    const chartOptions = merge(ApexChartsOption(), {
        colors: [
            theme.palette.grey[0],
            theme.palette.primary.main,
        ],
        labels: [t('number of attempts left'), t('search attempts')],
        stroke: { colors: [theme.palette.background.paper] },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (seriesName) => fNumber(seriesName),
                title: {
                    formatter: function (seriesName) {
                        return '';
                    }
                }
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '90%',
                    labels: {
                        show: true,
                        value: {
                            formatter: function (val) {
                                return fNumber(val);
                            }
                        },
                        total: {
                            show: true,
                            label: t('search attempts'),
                            formatter: function (w) {
                                const sum = w.globals.seriesTotals.reduce((a, b) => {
                                    return b;
                                }, 0);
                                return fNumber(sum);
                            }
                        }
                    }
                }
            }
        },
        // plotOptions: {
        //     pie: {
        //         donut: {
        //             size: '90%',
        //             labels: {
        //                 show: true,
        //                 total: {
        //                     show: true,
        //                     label: '',
        //                     formatter: () => 'attempts search'
        //                 }
        //             }
        //         }
        //     }
        // }
    });

    return (
        <>
            <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: '8px' }}>{t("basic")}</Typography>
            <Link to='/app/dashboard' className={classes.upgrade}>
                <Typography variant="body3" sx={{ fontWeight: 500 }}>{t("upgrade to premium")}</Typography>
            </Link>
            <Typography variant="h6" sx={{ fontWeight: 500, margin: '30px auto 10px' }}>{t("use basic")}</Typography>
            <div dir="ltr">
                <ReactApexChart
                    type="donut"
                    series={chartData}
                    options={chartOptions}
                    height={250}
                    className={classes.chart}
                />
            </div>
            <Typography variant="body3" className={classes.companyInfo}>4 {t("attempts out of")} 10 </Typography>
        </>
    );
}

export default Basic;
