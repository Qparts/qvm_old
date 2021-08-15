import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { deleteOrderFromCompany, updateCompaniesOrders, updateOrderItemQuantity } from 'src/redux/slices/partSearch';
import {
    createNewMessage, getCompanyUsers, getContacts,
    getSelectedConversation, setActiveConversation
} from 'src/redux/slices/chat';
import chatService from 'src/services/chatService';
import { useHistory } from 'react-router-dom';
import { Delete } from "../../../icons/icons";
import TableAction from 'src/components/Ui/TableAction';
import PurchasedCompanyOrdersSection from './PurchasedCompanyOrdersSection';


// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {},
    locationFilterResult: {
        display: 'flex'
    },
    locationFilter: {
        minWidth: '300px'
    }
}));

// ----------------------------------------------------------------------

function SendPurchaseOrderSection(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { t } = useTranslation();
    const { orders, companies } = useSelector((state) => state.PartSearch);
    const { themeDirection } = useSelector((state) => state.settings);
    const { userConversations, messages } = useSelector((state) => state.chat);
    const [openItemID, setOpenItemID] = useState(0);
    const { user } = useSelector((state) => state.authJwt);


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

    const deleteElement = (item) => {
        return (
            <TableAction
                type='partSearch'
                onClick={() => deleteOrder(JSON.parse(item).order)}
                textIcon={<Delete width='14' height='14' />} />
        )
    }


    const sendOrder = async (order) => {
        console.log("order", order);
        let selectedConversation = getSelectedConversation(userConversations, order.companyId);

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
        };


        dispatch(createNewMessage(newMessage, messages));
        dispatch(updateCompaniesOrders([]));
        dispatch(setActiveConversation(selectedConversation));
        history.push(`/app/chat/${selectedConversation._id}`);

    }

    const updateQuantity = (newQuantity, item) => {
        dispatch(updateOrderItemQuantity({ newQuantity: newQuantity, item: item }))
    }

    const deleteCompanyOrders = (companyId) => {
        let newCompanyOrders = [...orders];
        dispatch(updateCompaniesOrders(newCompanyOrders.filter(x => x.companyId != companyId)))
    }

    const deleteOrder = (order) => {
        console.log("orders", orders);
        dispatch(deleteOrderFromCompany(order));
    }

    return (
        <Grid  >
            <Grid item xs={12} >
                {
                    orders.map((orderItem, index) => (
                        <div key={index}>
                            <ListItem button onClick={() => {
                                handleClick(orderItem.companyId)
                            }} >
                                <ListItemIcon />
                                <ListItemText primary={themeDirection == 'ltr' ?
                                    companies.get(orderItem.companyId).name :
                                    companies.get(orderItem.companyId).nameAr} />
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

                    ))
                }
            </Grid>
        </Grid >

    );
}

export default SendPurchaseOrderSection;
