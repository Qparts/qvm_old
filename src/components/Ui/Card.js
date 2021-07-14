import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Button
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import editFill from '@iconify-icons/eva/edit-fill';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    card: {
        background: '#FFFFFF',
        boxShadow: '0px 2px 4px rgb(20 69 91 / 2%)',
        borderRadius: '10px',
        marginTop: '14px',
    },
}));

// ----------------------------------------------------------------------

const QVMCard = ({ title, action, actionTitle, children, icon }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Card className={classes.card}>
            <CardContent sx={{ padding: '15px' }}>
                <Grid container spacing={2}>
                    <Grid item md={10}>
                        <Typography variant="h5" >  {title} </Typography>
                    </Grid>
                    {action && <Grid item md={2}>
                        <Button
                            size="small"
                            type="button"
                            onClick={action}
                            startIcon={<Icon icon={icon} />}
                        >
                            {actionTitle}
                        </Button>
                    </Grid>
                    }
                </Grid>

                {children}

            </CardContent>
        </Card>
    )
}

export default QVMCard;