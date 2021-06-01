import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useTranslation } from 'react-i18next';
import Datatable from 'src/components/table/DataTable';
import 'react-slideshow-image/dist/styles.css'
import helper from 'src/utils/helper';
import BrancheItemsSection from './BrancheItemsSection';
import BrancheActionsSection from './BrancheActionsSection';


// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {}
}));

// ----------------------------------------------------------------------

function BrancheView() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();


    return (

        <Box sx={{ width: '100%' }}>
            <Card >
                <CardContent className={classes.cardContent}>

                    <BrancheActionsSection />

                    <Box sx={{ mb: 6 }} />

                    <BrancheItemsSection />

                </CardContent >
            </Card>


        </Box >

    );
}

export default BrancheView;
