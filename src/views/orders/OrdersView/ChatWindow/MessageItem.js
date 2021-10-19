import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Box, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import links from 'src/constants/links';
import Datatable from 'src/components/table/DataTable';
import { useTranslation } from 'react-i18next';
import _ from 'lodash'
import Button from "src/components/Ui/Button";
import chatService from 'src/services/chatService';
import { createNewMessage, getConversation, updateOrderMessage, updateRecivedOrderMessages } from 'src/redux/slices/chat';
import helper from 'src/utils/helper';
import { Parts, Price, Correct, Times, Edit } from 'src/icons/icons';

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
    backgroundColor: '#EEF5F9',
    textAlign: 'left',
    '&.styleMe': {
      color: theme.palette.grey[800],
      backgroundColor: '#FFEDED'
    },
    '& p': {
      '@media (max-width: 350px)': {
        fontSize: '0.78rem',
      },
    }
  },
  tableWid: {
    width: 600,
    '& .MuiTableContainer-root': {
      borderRadius: '10px 10px 0 0'
    },
    '@media (max-width: 992px) and (min-width: 960px)': {
      width: '565px',
    },
    '@media (max-width: 768px) and (min-width: 737px)': {
      width: '565px',
    },
    '@media (max-width: 736px)': {
      width: 'auto',
    },
    '@media (max-width: 600px) and (min-width: 436px)': {
      width: '278px',
    },
    '@media (max-width: 435px) and (min-width: 314px)': {
      width: '170px',
    },
  },
  info: {
    display: 'flex',
    marginBottom: theme.spacing(0.75),
    color: theme.palette.text.secondary,
    '&.styleMe': { justifyContent: 'flex-end' }
  },
  orderInfo: {
    backgroundColor: '#E7F0F7',
    display: 'flex',
    marginTop: theme.spacing(0.5),
    padding: theme.spacing(1.25, 1.75),
    borderRadius: '0 0 10px 10px',
    '@media (max-width: 600px) and (min-width: 314px)': {
      display: 'block'
    },
  },
  orderInfoChild: {
    display: 'flex',
    marginRight: theme.spacing(1.5),
    '@media (max-width: 600px) and (min-width: 314px)': {
      margin: theme.spacing(0, 0, 1, 0),
      '&:last-of-type': { margin: 0 }
    },
  },
  orderInfoTitle: {
    '@media (max-width: 633px) and (min-width: 600px)': {
      fontSize: '0.75rem'
    },
    '@media (max-width: 435px) and (min-width: 314px)': {
      fontSize: '0.75rem'
    },
  },
  orderInfoChildMr: {
    marginRight: theme.spacing(0.625),
    color: '#526C78',
  },
  orderInfoValue: {
    color: theme.palette.secondary.main,
    '@media (max-width: 435px) and (min-width: 314px)': {
      fontSize: '0.85rem'
    },
  },
  dispalyFlxChat: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  orderActions: {
    textAlign: 'left',
    '& button:last-of-type': {
      '@media (max-width: 435px) and (min-width: 314px)': {
        margin: theme.spacing(1.25, 0, 0)
      },
    }
  },
  editBtnMd: {
    justifyContent: 'flex-end',
    marginTop: theme.spacing(1)
  }
}));

// ----------------------------------------------------------------------

function EditBtn({ updatedOrder, isMe, editOrder }) {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box className={clsx(
      classes.dispalyFlxChat,
      classes.orderInfoChild,
      window.innerWidth < 725 && window.innerWidth > 600 ? classes.editBtnMd : null
    )}>
      {updatedOrder && isMe &&
        <Button
          btnWidth='btnWidth'
          btnPadd='btnPadd'
          onClick={editOrder}
        >
          <Edit width='17' height='17' className={classes.orderInfoChildMr} fill={theme.palette.grey[0]} />
          {t("Edit")}
        </Button>
      }
    </Box>
  );
}

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
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user, currentSocket } = useSelector((state) => state.authJwt);
  const { activeConversation, messages, onlineUsers } = useSelector((state) => state.chat);
  const isMe = parseInt(message.sender) === user.subscriber.id;
  const { t } = useTranslation();
  // const friend = currentContact.filter(x => x.id == parseInt(message.sender))[0];
  const friend = activeConversation?.members?.filter(x => x.id != user.subscriber.id).filter(m => m.id == parseInt(message.sender))[0];
  const [orderDetails, setOrderDetails] = useState(null);
  const [updatedOrder, setUpdatedOrder] = useState(message.contentType == 'order' ?
    JSON.parse(message.text) : null);


  //get order details (quantity and total price).
  const getOrderDetails = () => {
    const orders = JSON.parse(message.text).orders;
    let orderQuantity = 0;
    let totalPrice = 0;
    for (let item of orders) {
      orderQuantity += parseInt(item.quantity);
      if (item.order.offers.length > 0) {
        totalPrice += parseInt(item.quantity) * item.order.offers[0].offerPrice;
      } else {
        totalPrice += parseInt(item.quantity) * item.order.retailPrice;
      }
    }
    return { orderQuantity: orderQuantity, totalPrice: totalPrice }
  }


  useEffect(() => {
    if (message.contentType == 'order') {
      setUpdatedOrder(JSON.parse(message.text));
      const details = getOrderDetails();
      setOrderDetails(details);
    }
  }, [message.text]);


  //update order item field (quantity or price).
  const updateOrderField = (newValue, item, attr) => {
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


  //create new order update message and send it to online user of current conversation.
  const editOrderMessage = async (value) => {
    //create message
    dispatch(createNewMessage({
      conversationId: activeConversation._id,
      text: value,
      contentType: 'text',
      sender: user.subscriber.id,
      companyId: user.company.companyId
    }, messages));

    //send the message to online users
    activeConversation.members.filter(x => x.id != user.subscriber.id).map((member) => {
      let onlineUserIndex = onlineUsers.findIndex(x => x.userId == member.id);
      if (onlineUserIndex != -1) {
        currentSocket.current.emit("sendMessage", {
          senderId: user.subscriber.id,
          receiverId: member.id,
          text: value,
          companyId: user.company.companyId,
          conversationId: activeConversation._id
        });
      }
    })
  }

  const editOrder = async () => {
    try {
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

            newEditMessage += t("Quantity of part {{partNumber}} has changed from {{from}} to {{to}}",
              { partNumber: key, from: value.prevQuantity, to: value.quantity }) + ". ";
          }
          if (value.retailPrice) {
            newEditMessage += t("Price of part {{partNumber}} has changed from {{from}} to {{to}}",
              { partNumber: key, from: value.prevRetailPrice, to: value.retailPrice }) + ". ";
          }
        })
        editOrderMessage(newEditMessage);
        updatedMessageMap = new Map();
      }

      dispatch(getConversation(activeConversation._id, 1));

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
      const orderStatus = status == "A" ? t("Order has been accepted") : t("Order has been rejected");
      dispatch(getConversation(orderValue.conversationId, 1));
      editOrderMessage(orderStatus);
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
          {message.contentType != 'order' ?
            <div className={clsx(classes.content, isMe && 'styleMe')}>
              <Typography variant="body2">{message.text}</Typography>
            </div>
            :
            <div className={classes.tableWid}>
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
                    onchange: updateOrderField
                  },
                  {
                    name: t("Average market price"),
                    attr: 'order.retailPrice',
                    type: !isMe && (message.status === 'I' || message.status === 'S') ? 'text' : '',
                    onchange: updateOrderField,
                    po: 'po'
                  }
                ]}

                datatable={updatedOrder?.orders}
                dataTablePad='dataTablePad'
                dataTableChat='dataTableChat'
              />

              <Box className={clsx(classes.dispalyFlxChat, classes.orderInfo)}>
                <Box className={clsx(classes.dispalyFlxChat, classes.orderInfoChild)}>
                  <Parts width='17' height='18' fill={theme.palette.primary.main} />
                  <Typography variant="body2" className={classes.orderInfoTitle} sx={{ margin: '0 5px', color: '#526C78' }}>{t("Total Parts")}</Typography>
                  <Typography variant="subtitle1" className={classes.orderInfoValue}>
                    {orderDetails?.orderQuantity}
                  </Typography>
                </Box>
                <Box className={clsx(classes.dispalyFlxChat, classes.orderInfoChild)}>
                  <Price width='21' height='21' fill={theme.palette.primary.main} />
                  <Typography variant="body2" className={clsx(classes.orderInfoChildMr, classes.orderInfoTitle)}>{t("Total Price")}</Typography>
                  <Typography variant="subtitle1" className={classes.orderInfoValue}>
                    {helper.ccyFormat(orderDetails?.totalPrice)}
                  </Typography>
                </Box>
                <Box className={clsx(classes.dispalyFlxChat, classes.orderInfoChild)}>
                  <Typography variant="body2" className={clsx(classes.orderInfoChildMr, classes.orderInfoTitle)}>{t("Status")}</Typography>
                  <Typography variant="subtitle1" className={classes.orderInfoValue}>
                    {message.status === 'I' || message.status === 'S' ? t("Pending") : message.status == 'A' ?
                      t("Accepted") : t("Rejected")}
                  </Typography>
                </Box>
                {window.innerWidth < 725 && window.innerWidth > 600 ? null
                  :
                  <EditBtn
                    updatedOrder={!_.isEqual(JSON.parse(message.text).orders, updatedOrder?.orders)}
                    isMe={!isMe}
                    editOrder={editOrder}
                  />}
              </Box>
              {window.innerWidth < 725 && window.innerWidth > 600 &&
                <EditBtn
                  updatedOrder={!_.isEqual(JSON.parse(message.text).orders, updatedOrder?.orders)}
                  isMe={!isMe}
                  editOrder={editOrder}
                />}

              <Box sx={{ mb: 3 }} />

              {!isMe && (message.status === 'I' || message.status === 'S') &&
                <Box className={classes.orderActions}>
                  <Button
                    chatBtnPadd='chatBtnPadd'
                    btnWidth='btnWidth'
                    onClick={() => orderOperation("A")}
                  >
                    <Correct width='27' height='27' className={classes.orderInfoChildMr} fill={theme.palette.grey[0]} />
                    {t("Accept")}
                  </Button>

                  <Button
                    chatBtn='chatBtn'
                    chatBtnPadd='chatBtnPadd'
                    btnWidth='btnWidth'
                    onClick={() => orderOperation("R")}
                  >
                    <Times width='27' height='27' className={classes.orderInfoChildMr} fill='#7F929C' />
                    {t("Reject")}
                  </Button>
                </Box>
              }
            </div>
          }
        </Box>
      </div>
    </div >
  );
}

export default MessageItem;
