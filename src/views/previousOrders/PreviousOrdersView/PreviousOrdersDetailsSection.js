import React, {  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Datatable from 'src/components/table/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import Button from 'src/components/Ui/Button';
import chatService from 'src/services/chatService';
import { setActiveConversation, updateRecivedMessages } from 'src/redux/slices/chat';
import { useHistory } from 'react-router-dom';
import helper from 'src/utils/helper';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    partInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #efefef',
        '&:first-of-type': {
            paddingTop: 0,
        },
        '&:last-of-type': {
            border: 0,
        },
    },
    partValue: {
        color: theme.palette.secondary.main,
        fontWeight: theme.typography.fontWeightMedium
    }
}));

// ----------------------------------------------------------------------

function PreviousOrdersDetailsSection(props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { previousOrders } = useSelector((state) => state.previousOrders);
    const {  userConversations, onlineUsers } = useSelector((state) => state.chat);
    const { themeDirection } = useSelector((state) => state.settings);
    const { user, currentSocket } = useSelector((state) => state.authJwt);
    const currentOrder = JSON.parse(props.selectedOrder);
    var companyOrders = JSON.parse(currentOrder.text).orders;

    const sendAgain = async (item) => {
        let selectedOrder = previousOrders.docs.find(x => x._id == item._id);
        const createdMessage = await createNewMessage(selectedOrder);
        const selectedConversation = userConversations.find(x => x._id == selectedOrder.conversationId);
        sendMessageToOtherMembers(createdMessage, selectedConversation);
    }

    const createNewMessage = async (selectedOrder) => {
        let newMessage = {
            conversationId: selectedOrder.conversationId,
            text: selectedOrder.text,
            contentType: 'order',
            sender: user.subscriber.id,
            companyId: selectedOrder.companyId
        };
        try {
            const response = await chatService.createMessage(newMessage);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const sendMessageToOtherMembers = (createdMessage, selectedConversation) => {

        selectedConversation.members.filter(x => x.id != user.subscriber.id).map((member) => {
            // console.log("member", member)
            let onlineUserIndex = onlineUsers.findIndex(x => x.userId == member.id);
            if (onlineUserIndex != -1) {
                currentSocket.current.emit("sendMessage",
                    {
                        senderId: user.subscriber.id,
                        receiverId: member.id,
                        text: createdMessage.text,
                        contentType: 'order',
                        conversationId: selectedConversation._id,
                        companyId: user.company.companyId,
                        _id: createdMessage._id,
                        status: createdMessage.status,
                        createdAt: createdMessage.createdAt,
                        updatedAt: createdMessage.updatedAt
                    }

                );
            }
        })

        dispatch(updateRecivedMessages(createdMessage));
        dispatch(setActiveConversation(selectedConversation));
        history.push(`/app/chat/${selectedConversation._id}`);

    }


    return (

        <>
            <List sx={{ p: 0 }}>
                <ListItem className={classes.partInfo}>
                    <Typography variant="body2">{t("Sender")}</Typography>
                    <Typography variant="body3" className={classes.partValue}>
                        {currentOrder.sender}
                    </Typography>
                </ListItem>
                <ListItem className={classes.partInfo}>
                    <Typography variant="body2">{t("Receiver Company")}</Typography>
                    <Typography variant="body3" className={classes.partValue}>
                        {currentOrder.companyName}
                    </Typography>
                </ListItem>
                <ListItem className={classes.partInfo}>
                    <Typography variant="body2">{t("Status")}</Typography>
                    <Typography variant="body3" className={classes.partValue}>
                        {t(currentOrder.status)}
                    </Typography>
                </ListItem>
                <ListItem className={classes.partInfo}>
                    <Typography variant="body2">{t("Date")}</Typography>
                    <Typography variant="body3" className={classes.partValue}>
                        {helper.toDate(currentOrder.created)}
                    </Typography>
                </ListItem>
            </List>

            <br />
            <br />

            <Datatable
                header={[
                    {
                        name: t('Part Number'),
                        attr: 'order.partNumber'
                    },
                    {
                        name: t('Brand'),
                        attr: 'order.brandName'
                    },
                    {
                        name: t('Quantity'),
                        attr: 'quantity',
                    },
                    {
                        name: t('Price'),
                        attr: 'order.retailPrice',
                        po: 'po'
                    }
                ]}
                datatable={companyOrders}
                dataTableChat="dataTableChat"
                dataTablePad="dataTablePad"
                dataTablePurchaseOrder="dataTablePurchaseOrder"
            />


            <br />
            <Grid container spacing={2}>
                <Grid item xs={9} />
                <Grid item xs={3} >
                    <Button
                        variant="contained"
                        btnWidth="btnWidth"
                        onClick={() => sendAgain(currentOrder)}
                    >
                        {t("Send Again")}
                    </Button>
                </Grid>
            </Grid>
        </>


    );
}

export default PreviousOrdersDetailsSection;
