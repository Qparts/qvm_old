import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Typography,
    ListItem,
    List
} from '@material-ui/core';
import helper from 'src/utils/helper';
import Accordion from "../../../../components/Ui/Accordion";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    subscriptionHistoryChild: {
        display: 'block',
        padding: '0 0 10px 0',
        borderBottom: '1px solid #ECF1F5',
        marginBottom: '10px',
        '&:first-of-type': {
            paddingTop: '2px'
        },
        '&:last-of-type': {
            padding: 0,
            border: 0,
            marginBottom: 0
        }
    },
}));

// ----------------------------------------------------------------------

function SubscriptionHistory() {
    const classes = useStyles();
    const theme = useTheme();
    const { t } = useTranslation();
    const { loginObject } = useSelector((state) => state.authJwt);

    return (
        <Box>
            <Accordion
                head={t("Subscription History")}
                accordionStyle="accordionStyle">
                <List>
                    {loginObject.company.subscriptions.filter(e => e.status !== 'F').map((item, index) => {
                        return (
                            <ListItem className={classes.subscriptionHistoryChild} key={index}>
                                <Typography variant="body2" sx={{ color: theme.palette.secondary.darker }}>
                                    {item.status === 'B' ?
                                        t("Basic Plan") : item.status === 'A' ? t("Premium Plan") + "(" + t("Active") + ")" : t("Premium Plan")}
                                </Typography>
                                <Typography variant="body4" sx={{ color: '#7E8D99' }}>
                                    {helper.toDate(item.startDate)} {item.endDate ? ' - ' + helper.toDate(item.endDate) : ""}
                                </Typography>
                            </ListItem>
                        )
                    })}
                </List>
            </Accordion>
        </Box>
    );
}

export default SubscriptionHistory;
