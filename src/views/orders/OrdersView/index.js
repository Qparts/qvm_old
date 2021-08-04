import Page from 'src/components/Page';
import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Typography,
    Card,
    Container
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import Sidebar from './Sidebar/index';
import ChatWindow from './ChatWindow/index';
import { getContacts, getConversations, updateRecivedMessages } from 'src/redux/slices/chat';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none',
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            textAlign: 'left',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        [theme.breakpoints.up('xl')]: {
            height: 320
        }
    },
    card: {
        height: '72vh',
        display: 'flex'
    }
}));

// ----------------------------------------------------------------------

function QuotationsReportView() {
    const classes = useStyles();
    const { isLoading } = useSelector((state) => state.quotationsReport);
    const { user, currentSocket } = useSelector((state) => state.authJwt);
    const { t } = useTranslation();
    const dispatch = useDispatch();


    useEffect(() => {
        currentSocket?.current.on("getMessage", data => {
            if (data && data.createdAt == null) {
                console.log("arrival message", data);
                data.createdAt = Date.now();
                dispatch(updateRecivedMessages(data));
            }
        });

    }, [user])

    useEffect(() => {
        dispatch(getContacts(user.subscriber.id));
    }, [dispatch]);


    return (
        <Page
            title={t("Orders")}
            className={classes.root}
        >

            <LoadingOverlay
                active={isLoading}
                styles={{
                    wrapper: {
                        width: "100%",
                        height: "100%",
                    },
                }}
                spinner={
                    <LoadingScreen />

                }
            >
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4">{t("Orders")}</Typography>
                    <hr />

                    <Box sx={{ mb: 3 }} />

                    <Container maxWidth="xl">
                        <Card className={classes.card}>
                            <Sidebar />
                            <ChatWindow />
                        </Card>
                    </Container>


                </Box>
            </LoadingOverlay>

        </Page>
    );
}

export default QuotationsReportView;
