import Page from 'src/components/Page';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LoadingScreen from 'src/components/LoadingScreen';
import LoadingOverlay from "react-loading-overlay";
import Sidebar from './Sidebar/index';
import ChatWindow from './ChatWindow/index';
import {
    setActiveConversation,
    updateRecivedOrderMessages, setActiveConversationId
} from 'src/redux/slices/chat';
import { useEffect } from 'react';

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
        height: '89.8vh',
        display: 'flex',
        borderTop: '5px solid' + theme.palette.secondary.darker,
        borderRadius: 0,
        [theme.breakpoints.up('lg')]: {
            height: '87.75vh',
        }
    }
}));

// ----------------------------------------------------------------------

function OrdersView(_props) {
    const classes = useStyles();
    const { isLoading } = useSelector((state) => state.quotationsReport);
    const { user, currentSocket } = useSelector((state) => state.authJwt);
    const { userConversations } = useSelector((state) => state.chat);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        currentSocket?.current.on("updatedOrder", order => {
            dispatch(updateRecivedOrderMessages(order));
        });

    }, [user])

    useEffect(() => {
        return () => {
            dispatch(setActiveConversationId(null));
            dispatch(setActiveConversation(null));
        }
    }, []);


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
                <Card className={classes.card}>
                    <Sidebar />
                    {userConversations.length && <ChatWindow userConversations={userConversations} />}
                </Card>
            </LoadingOverlay>

        </Page>
    );
}

export default OrdersView;
