import React, {  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useTranslation } from 'react-i18next';
import 'react-slideshow-image/dist/styles.css'
import BrancheItemsSection from './BrancheItemsSection';
import BrancheActionsSection from './BrancheActionsSection';
import { Box } from '@material-ui/core';



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
