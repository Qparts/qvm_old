import React from 'react';
import {
    Grid,
    Box,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Info, Grid as GridIcon, ListIcon } from '../../../icons/icons';
import Input from "./../../../components/Ui/Input";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    forMoreInfoCont: {
        paddingBottom: '10px',
        borderBottom: '1px solid #E5EBF0',
    },
    forMoreInfo: {
        justifyContent: 'center',
        marginTop: '10px',
    },
    forMoreInfoChild: {
        fontWeight: 400,
        marginLeft: '8px',
        color: theme.palette.primary.main
    },
    forMoreInfoIconCont: {
        justifyContent: 'flex-end',
    },
    forMoreInfoIcon: {
        padding: '10px 15px',
        background: theme.palette.grey[0],
        lineHeight: 0,
        border: '1px solid #EEF1F5',
        cursor: 'pointer',
        '&:hover': {
            '& $svg path': {
                fill: theme.palette.secondary.main
            }
        },
        '&:first-of-type': {
            borderRadius: '10px 0 0 10px'
        },
        '&:last-of-type': {
            borderRadius: '0 10px 10px 0',
            borderLeft: 0
        }
    },
    forMoreInfoFlex: {
        display: 'flex',
        alignItems: 'center',
    },
    activeClass: {
        '& $svg path': {
            fill: theme.palette.secondary.main
        }
    }
}));

// ----------------------------------------------------------------------

function SpecialOfferInfoActions(props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Box className={classes.forMoreInfoCont}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Input
                        value={props.filter}
                        onChange={props.search}
                        type='text'
                        label={t("Search by part number")}
                        selectBg='selectBg' />
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box className={clsx(classes.forMoreInfo, classes.forMoreInfoFlex)}>
                        <Info width='24' height='24' />
                        <Typography variant="subtitle1" className={classes.forMoreInfoChild}> {t("For inquiries, you can contact us at")} 44587965</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box className={clsx(classes.forMoreInfoFlex, classes.forMoreInfoIconCont)}>
                        <Box
                            className={clsx(classes.forMoreInfoIcon, props.listView ? classes.activeClass : '')}
                            onClick={props.handleListView}>
                            <ListIcon width='22' height='22' fill='#7E8D99' />
                        </Box>
                        <Box
                            className={clsx(classes.forMoreInfoIcon, !props.listView ? classes.activeClass : '')}
                            onClick={props.handleGridView}>
                            <GridIcon width='22' height='22' fill='#7E8D99' />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SpecialOfferInfoActions;
