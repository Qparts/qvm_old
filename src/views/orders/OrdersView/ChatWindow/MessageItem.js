import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Typography, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import links from 'src/constants/links';
import Datatable from 'src/components/table/DataTable';
import { useTranslation } from 'react-i18next';
import _ from 'lodash'
import Button from "src/components/Ui/Button";
import CustomButton from 'src/components/Ui/Button';
import chatService from 'src/services/chatService';
import { createNewMessage, getConversation } from 'src/redux/slices/chat';
import helper from 'src/utils/helper';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(3)
  },
  container: {
    display: 'flex',
    '&.styleMe': { marginLeft: 'auto' }
  },
  content: {
    maxWidth: 320,
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.neutral,
    '&.styleMe': {
      color: theme.palette.grey[800],
      backgroundColor: theme.palette.primary.lighter
    }
  },
  info: {
    display: 'flex',
    marginBottom: theme.spacing(0.75),
    color: theme.palette.text.secondary,
    '&.styleMe': { justifyContent: 'flex-end' }
  }
}));

// ----------------------------------------------------------------------

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  className: PropTypes.string
};

const uploadUrl = links.upload;
var updatedMessageMap = new Map();


function MessageItem({
  message,
  currentContact = [],
  className,
  ...other
}) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, currentSocket } = useSelector((state) => state.authJwt);
  const { activeConversation, messages, onlineUsers } = useSelector((state) => state.chat);
  const isMe = parseInt(message.sender) === user.subscriber.id;
  const { t } = useTranslation();
  const friend = currentContact.filter(x => x.id == parseInt(message.sender))[0];
  const [orderDetails, setOrderDetails] = useState(null);
  const [updatedOrder, setUpdatedOrder] = useState(message.contentType == 'order' ?
    JSON.parse(message.text) : null);


  const getOrderDetails = () => {
    const orders = JSON.parse(message.text).orders;
    console.log("orders", orders);
    let orderQuantity = 0;
    let totalPrice = 0;
    for (let item of orders) {
      orderQuantity += parseInt(item.quantity);
      totalPrice += parseInt(item.quantity) * item.order.retailPrice;
    }
    return { orderQuantity: orderQuantity, totalPrice: totalPrice }
  }

  useEffect(() => {
    if (message.contentType == 'order') {
      setUpdatedOrder(JSON.parse(message.text));
      console.log("message", message);
      const details = getOrderDetails();
      setOrderDetails(details);
    }
  }, [message.text]);


  const updateQuantity = (newValue, item, attr) => {
    let newOrders = { ...updatedOrder };
    if (!updatedMessageMap.has(item.order.partNumber)) {
      updatedMessageMap.set(item.order.partNumber, {
        prevRetailPrice: item.order.retailPrice,
        prevQuantity: item.quantity, retailPrice: null, quantity: null
      });
    }
    if (attr == 'order.retailPrice') {
      newOrders.orders.find(x => x.order.id == item.order.id).order.retailPrice = newValue;
      const editedOrder = updatedMessageMap.get(item.order.partNumber);
      editedOrder.retailPrice = newValue;
      updatedMessageMap.set(item.order.partNumber, editedOrder);
    }
    else {
      newOrders.orders.find(x => x.order.id == item.order.id).quantity = newValue;
      const editedOrder = updatedMessageMap.get(item.order.partNumber);
      editedOrder.quantity = newValue;
      updatedMessageMap.set(item.order.partNumber, editedOrder);
    }
    setUpdatedOrder(newOrders);
  }

  const emitUpdateMessage = (orderMessage) => {
    activeConversation.members.filter(x => x.id != user.subscriber.id).map((member) => {
      currentSocket.current.emit("updateOrderMessage", {
        receiverId: member.id,
        order: orderMessage
      });
    })
  }

  const editOrderMessage = async (value) => {
    //create message
    dispatch(createNewMessage({
      conversationId: activeConversation._id,
      text: value,
      contentType: 'text',
      sender: user.subscriber.id,
    }, messages));

    //send the message to online users
    activeConversation.members.filter(x => x.id != user.subscriber.id).map((member) => {
      let onlineUserIndex = onlineUsers.findIndex(x => x.userId == member.id);
      if (onlineUserIndex != -1) {
        currentSocket.current.emit("sendMessage", {
          senderId: user.subscriber.id,
          receiverId: member.id,
          text: value,
          conversationId: activeConversation._id
        });
      }
    })
  }

  const editOrder = async () => {
    try {

      //edit order
      let orderValue = { ...message };
      orderValue.text = JSON.stringify(updatedOrder);
      //send updated order to oline users
      emitUpdateMessage(orderValue);
      await chatService.updateMessage(orderValue);

      //get updated message of updated order.
      if (updatedMessageMap.size > 0) {
        let newEditMessage = "";
        updatedMessageMap.forEach(function (value, key) {
          if (value.quantity) {
            newEditMessage += `Part ${key} quantity has changed from  ${value.prevQuantity} to ${value.quantity}\n`
          }
          if (value.retailPrice) {
            newEditMessage += `Part ${key} Price has changed from ${value.prevRetailPrice} to  ${value.retailPrice}\n`
          }
        })
        editOrderMessage(newEditMessage);
        updatedMessageMap = new Map();
      }

      await dispatch(getConversation(activeConversation._id));


    } catch (error) {
      console.log("error", error);
    }
  }



  const orderOperation = async (status) => {
    try {
      let orderValue = { ...message };
      orderValue.status = status;
      emitUpdateMessage(orderValue);
      await chatService.updateMessage(orderValue);
      const orderStatus = status == "A" ? "Order has been accepted" : "Order has been rejected";
      editOrderMessage(orderStatus);
      await dispatch(getConversation(orderValue.conversationId));
    } catch (error) {
      console.log("error", error);
    }
  }

  return (

    <div className={clsx(classes.root, className)} {...other}>
      <div className={clsx(classes.container, isMe && 'styleMe')}>
        {friend && !isMe && (
          <Avatar
            alt={friend.name}
            src={uploadUrl.getCompanyLogo(`logo_${friend.companyId}.png`)}
            sx={{ width: 32, height: 32 }}
          />
        )}
        <Box sx={{ ml: 2 }}>
          <Typography
            noWrap
            variant="caption"
            className={clsx(classes.info, isMe && 'styleMe')}
          >
            {!isMe && `${friend?.name},`}&nbsp;
            {formatDistanceToNowStrict(new Date(message.createdAt), {
              addSuffix: true
            })}
          </Typography>
          {message.contentType == 'text' || message.contentType == null ?
            <div className={clsx(classes.content, isMe && 'styleMe')}>
              <Typography variant="body2">{message.text}</Typography>
            </div>
            :
            <div
              // className={isMe && 'styleMe'}
              style={{ width: 500 }}
            >
              <Datatable
                header={[
                  {
                    name: t("Part Number"),
                    attr: 'order.partNumber',
                  },
                  {
                    name: t("Brand"),
                    attr: 'order.brandName',
                  },
                  {
                    name: t("Quantity"),
                    attr: 'quantity',
                    type: !isMe && (message.status === 'I' || message.status === 'S') ? 'text' : '',
                    onchange: updateQuantity
                  },
                  {
                    name: t("Average market price"),
                    attr: 'order.retailPrice',
                    type: !isMe && (message.status === 'I' || message.status === 'S') ? 'text' : '',
                    onchange: updateQuantity
                  }
                ]}

                datatable={updatedOrder.orders}
              />

              <Box sx={{ mb: 3 }} />

              <Grid container  >
                <Grid item xs={!isMe ? 3 : 4} >
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                  >
                    {t("Total Parts")}{' : '}
                    {orderDetails?.orderQuantity}
                  </Typography>
                </Grid>


                <Grid item xs={4} >
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                  >
                    {t("Total Price")}{' : '}
                    {helper.ccyFormat(orderDetails?.totalPrice)}
                  </Typography>
                </Grid>

                <Grid item xs={!isMe ? 3 : 4} >
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                  >
                    {t("Status")}{' : '}
                    {message.status === 'I' || message.status === 'S' ? t("Pending") : message.status == 'A' ?
                      t("Accepted") : t("Rejected")}
                  </Typography>
                </Grid>

                {!_.isEqual(JSON.parse(message.text).orders, updatedOrder.orders) &&
                  !isMe &&
                  <Grid item xs={2} >
                    <Box sx={{ mb: 3 }} >
                      <Button
                        onClick={editOrder}
                      >
                        {t("Save")}
                      </Button>
                    </Box>
                  </Grid>
                }

              </Grid>

              <Box sx={{ mb: 3 }} />


              {!isMe && (message.status === 'I' || message.status === 'S') &&
                <Grid container spacing={2} >
                  <Grid item xs={6} />

                  <Grid item xs={3} >
                    <Button
                      onClick={() => orderOperation("A")}
                    >
                      {t("Accept")}
                    </Button>
                  </Grid>

                  <Grid item xs={3} >
                    <CustomButton
                      btnBg="btnBg"
                      mainBorderBtn='mainBorderBtn'
                      onClick={() => orderOperation("R")}
                    >
                      {t("Reject")}
                    </CustomButton>
                  </Grid>
                </Grid>

              }

            </div>
          }
        </Box>
      </div>
    </div >
  );
}

export default MessageItem;
