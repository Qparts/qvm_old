import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardContent, Box} from '@material-ui/core';
import BranchesHead from './BranchesHead';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    userDataCard: {
        background: '#F6F8FC',
        boxShadow: '0px 4px 8px rgb(20 69 91 / 3%)',
        borderRadius: '20px',
    }
}));

// ----------------------------------------------------------------------

function BrancheView() {
    const classes = useStyles();

    return (
        <Box>
            <Card className={classes.userDataCard}>
                <BranchesHead />
            </Card>
        </Box >
    );
}

export default BrancheView;
