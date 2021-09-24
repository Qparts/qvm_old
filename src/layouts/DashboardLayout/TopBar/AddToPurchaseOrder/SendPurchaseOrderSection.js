import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { deleteOrderFromCompany, updateCompaniesOrders, updateOrderItemQuantity } from 'src/redux/slices/partSearch';
import {
    createNewMessage, getCompanyUsers, getContacts,
    getSelectedConversation, setActiveConversation
} from 'src/redux/slices/chat';
import chatService from 'src/services/chatService';
import { useHistory } from 'react-router-dom';
import { Delete } from "src/icons/icons";
import TableAction from 'src/components/Ui/TableAction';
import PurchasedCompanyOrdersSection from './PurchasedCompanyOrdersSection';

// ----------------------------------------------------------------------

function SendPurchaseOrderSection(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { orders } = useSelector((state) => state.PartSearch);
    const { themeDirection } = useSelector((state) => state.settings);
    const { userConversations, messages, onlineUsers } = useSelector((state) => state.chat);
    const [openItemID, setOpenItemID] = useState(0);
    const { user, currentSocket } = useSelector((state) => state.authJwt);

    const companyiesData = JSON.parse(localStorage.getItem('COMPANYIES'));
    // const companyiesData = JSON.parse(localStorage.getItem('COMPANYIES')).filter(x => x[0] === 1).map(w => w[1].name);

    const handleClick = (itemID) => {
        if (openItemID != itemID)
            setOpenItemID(itemID);
        else
            setOpenItemID(0);
    };

    useEffect(() => {
        if (orders.length == 0)
            props.setOpenSendPO(false);
    }, [orders])

    //delte item from company order list button.
    const deleteElement = (item) => {
        return (
            <TableAction
                type='partSearch'
                onClick={() => deleteOrder(JSON.parse(item).order)}
                textIcon={<Delete width='14' height='14' fill='#CED5D8' />} />
        )
    }


    const sendOrder = async (order) => {

        // console.log(order)
        //get conversation from current user cnversation list.
        let selectedConversation = getSelectedConversation(userConversations, order.companyId);


        //if there is no a conversation between login user and company of orders create one.
        if (selectedConversation == null) {

            let users = await getCompanyUsers(order.companyId, user);

            const response = await chatService.createUserConversation({
                members: users
            })

            selectedConversation = response.data;

            dispatch(getContacts(user.subscriber.id));
        }

        let newMessage = {
            conversationId: selectedConversation._id,
            text: JSON.stringify(order),
            contentType: 'order',
            sender: user.subscriber.id,
            companyId: user.company.companyId
        };


        dispatch(createNewMessage(newMessage, messages));

        //send order to all online users.
        selectedConversation.members.filter(x => x.id != user.subscriber.id).map((member) => {
            let onlineUserIndex = onlineUsers.findIndex(x => x.userId == member.id);
            if (onlineUserIndex != -1) {
                currentSocket.current.emit("sendMessage", {
                    senderId: user.subscriber.id,
                    receiverId: member.id,
                    text: JSON.stringify(order),
                    contentType: 'order',
                    conversationId: selectedConversation._id,
                    companyId: user.company.companyId
                });
            }
        })

        dispatch(updateCompaniesOrders([]));
        dispatch(setActiveConversation(selectedConversation));
        history.push(`/app/chat/${selectedConversation._id}`);
        props.setOpenSendPO(false);
    }

    //update order item quantity.
    const updateQuantity = (newQuantity, item) => {
        dispatch(updateOrderItemQuantity({ newQuantity: newQuantity, item: item }))
    }

    //delete company orders from purchase order.
    const deleteCompanyOrders = (companyId) => {
        let newCompanyOrders = [...orders];
        dispatch(updateCompaniesOrders(newCompanyOrders.filter(x => x.companyId != companyId)))
    }

    //delete order item from company order list.
    const deleteOrder = (order) => {
        // console.log("orders", orders);
        dispatch(deleteOrderFromCompany(order));
    }

    return (
        <>
            {
                orders.map((orderItem, index) => (
                    <>
                        {/* {console.log(orderItem)} */}
                        <div key={index}>
                            <ListItem button onClick={() => {
                                handleClick(orderItem.companyId)
                            }} >
                                <ListItemIcon />
                                <ListItemText primary={
                                    themeDirection == 'ltr' ?
                                        companyiesData.filter(x => x[0] === orderItem.companyId).map(w => w[1].name) :
                                        companyiesData.filter(x => x[0] === orderItem.companyId).map(w => w[1].nameAr)} />
                                {openItemID === orderItem.companyId ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>

                            <Collapse in={openItemID === orderItem.companyId} timeout="auto" unmountOnExit>

                                <PurchasedCompanyOrdersSection
                                    orderItem={orderItem}
                                    updateQuantity={updateQuantity}
                                    deleteElement={deleteElement}
                                    deleteCompanyOrders={deleteCompanyOrders}
                                    sendOrder={sendOrder}
                                />

                            </Collapse>
                        </div >
                    </>
                ))
            }
        </>
    );
}

export default SendPurchaseOrderSection;
