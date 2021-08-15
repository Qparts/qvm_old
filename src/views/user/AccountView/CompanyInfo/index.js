import React from 'react';
import { Grid, Box } from '@material-ui/core';
import CompanyContact from './CompanyContact';
import CompanyDetails from './CompanyDetails';

// ----------------------------------------------------------------------

function CompanyInfo() {

    return (
        <Box sx={{marginBottom: '30px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <CompanyDetails />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CompanyContact />
                </Grid>
            </Grid>
        </Box>
    );
}

export default CompanyInfo;
